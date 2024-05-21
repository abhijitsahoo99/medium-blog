import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';


const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY : string;
    },
    Variables: {
      userId : string;
    }
}>();


blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        },
      },
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data: {
            title : body.title,
            content : body.content,
            authorId : 1
        }
    });
    return c.json({
        id : blog.id,
        msg: 'blog post created successfully'
    })
});

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        },
      },
    }).$extends(withAccelerate());
    const blog = await prisma.blog.update({
        where: {
            id: body.id,
        },
        data : {
            title : body.title,
            content : body.content,
        }
    });
    return c.json({
        id : blog.id,
        msg : 'blog post updated successfully'
    })
});


blogRouter.get('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        },
      },
    }).$extends(withAccelerate());

    try{

        const blog = await prisma.blog.findFirst({
            where: {
                id : body.id
            }
        })
        return c.json({
            blog
        })
    } catch(e) {
        c.status(411);
        return c.json({
            msg : 'error while fetching blog post'
        })
    }
  
});

// later - add pagination 
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasources: {
          db: {
            url: c.env.DATABASE_URL,
          },
        },
      }).$extends(withAccelerate());

      const blogs = await prisma.blog.findMany();
      return c.json({
        blogs
      })
});

blogRouter.delete('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        },
      },
    }).$extends(withAccelerate());
    try{
        const blog = await prisma.blog.delete({
            where: {
                id: body.id,
            }
        });
        return c.json({
            id : blog.id,
            msg : 'blog post deleted successfully'
        })
    } catch(e){
        c.status(500)
        return c.json({ msg: 'Internal server error' });
    }

});

 export default blogRouter;