import { Hono } from 'hono';

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

blogRouter.post('/blog', (c) => {
    return c.text('hello from hono !')
});
blogRouter.get('/blog', (c) => {
    return c.text('hello from hono !')
});
blogRouter.get('/blog/bulk', (c) => {
    return c.text('hello from hono 2 !')
});
blogRouter.put('/blog', (c) => {
    return c.text('hello from hono !')
});
blogRouter.delete('/blog', (c) => {
    return c.text('hello from hono !')
});

 export default blogRouter;