import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from "hono/jwt"
import {createPostInput, updatePostInput } from "@abhijitsahoo99/medium-common"

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        SECRET_KEY : string;
    },
    Variables: {
      userId : string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('authorization') || "";
  try {
    const user  = await verify(authHeader, c.env.SECRET_KEY);
    if (user) {
      c.set("userId", user.userId as string); 
      await next();
    }else{
      c.status(403);
      return c.json ({
        message : 'you are not logged in'
      })
    }
  }catch(e){
    c.status(403);
      return c.json ({
        message : 'you are not logged in'
      })
  }
})



blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

    const body = await c.req.json();
    const authorId = c.get("userId")
    const { success } = createPostInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }

    try {
    const blog = await prisma.blog.create({
      data: {
        topic: body.topic,
        title: body.title,
        content: body.content,
        authorId: Number(authorId)
      }
    });
    return c.json({
      id: blog.id,
      msg: 'Blog post created successfully'
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return c.json({
      message: 'Error creating blog post'
    }, 500);
  } 
});

blogRouter.put('/', async (c) => {
    const authorId = c.get('userId');
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        },
      },
    }).$extends(withAccelerate());
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ error: "invalid input" });
    }
    const blog = await prisma.blog.update({
        where: {
            id: body.id,
            authorId : Number(authorId)
        },
        data : {
            topic: body.topic,
            title : body.title,
            content : body.content,
        }
    });
    return c.json({
        id : blog.id,
        msg : 'blog post updated successfully'
    })
});

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


blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
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
                id : Number(id)
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


blogRouter.delete('/:id', async (c) => {
    const body = await c.req.json();
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        },
      },
    }).$extends(withAccelerate());
    try{
        const userCheck = c.get('userId');
        if (body.userId !== userCheck){
          c.status(403);
          return c.json({msg : 'unauthorized access'});
        }

        const blog = await prisma.blog.delete({
            where: {
              id : Number(id)
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
blogRouter.post('/comment', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

    const body = await c.req.json();
    const userId = c.get("userId")

    try {
    const comment = await prisma.comment.create({
      data: {
        comment: body.comment,
        userId: Number(userId),
        blogId: Number(body.blogId)
      }
    });
    return c.json({
      comment,
    });
  } catch (error) {
    console.error('Error while posting comment', error);
    return c.json({
      message: 'Error while posting comment'
    }, 500);
  } 
});

blogRouter.delete('/comment/:id', async (c) => {
  const body = await c.req.json();
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());
  try{
      const userCheck = c.get('userId');
      if (body.userId !== userCheck){
        c.status(403);
        return c.json({msg : 'unauthorized access'});
      }

      const comment = await prisma.comment.delete({
          where: {
            id : Number(id)
          }
      });
      return c.json({
          id : comment.id,
          msg : 'comment deleted successfully'
      })
  } catch(e){
      c.status(500)
      return c.json({ msg: 'Internal server error' });
  }

});
blogRouter.post('/bookmark/:id', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

    const userId = c.get("userId")
    const id = c.req.param("id");
    try {
    const bookmark = await prisma.bookmark.create({
      data: {
        userId: Number(userId),
        blogId: Number(id)
      }
    });
    return c.json({
      bookmark,
    });
  } catch (error) {
    console.error('Error while saving the blog', error);
    return c.json({
      message: 'Error while saving the blog'
    }, 500);
  } 
});

blogRouter.delete('/bookmark/:id', async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());
  try{
      const bookmark = await prisma.bookmark.delete({
          where: {
            id : Number(id)
          }
      });
      return c.json({
          id : bookmark.id,
          msg : 'blog unsaved'
      })
  } catch(e){
      c.status(500)
      return c.json({ msg: 'Internal server error' });
  }

});

export default blogRouter;