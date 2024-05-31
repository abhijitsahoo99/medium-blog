import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import bcrypt from 'bcryptjs';
import { sign } from 'hono/jwt';
import { signinInput, signupInput} from "@abhijitsahoo99/medium-common"

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    // Create the user
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: hashedPassword,
        name: body.name,
      },
    });

    // Sign a JWT token
    const jwtToken = await sign({userId: user.id,},c.env.SECRET_KEY);
    return c.json({jwtToken, user: user})

  } catch (e) {
    console.error(e);  // Log the error for debugging
    c.status(500);
    return c.text('Invalid / internal server error');
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { username, password } = body;

  const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}

  try {
    // Find the user
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "Username doesn't exist" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      c.status(401);
      return c.json({ message: 'Password is invalid' });
    }

    // Sign a JWT token
    const jwtToken = await sign({userId: user.id,},c.env.SECRET_KEY);
    return c.json({jwtToken, user: user})
  } catch (e) {
    console.error(e);  // Log the error for debugging
    c.status(500);
    return c.text('Invalid / internal server error');
  }
});

export default userRouter;