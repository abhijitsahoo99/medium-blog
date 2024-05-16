import { Hono } from 'hono';

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();

userRouter.post('/signup', (c) => {
   return c.text('hello from hono !')
});
userRouter.post('/signin', (c) => {
    return c.text('hello from hono !')
 });

export default userRouter;