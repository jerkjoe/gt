const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


// app.prepare().then(() => {
const server = new Koa();
const router = new Router();


router.get('/test', (ctx) => {
    ctx.body = '<h1>Hello</h1>'
})
server.use(router.routes())



// server.use(async (ctx, next) => {
//     const path = ctx.path;
//     const method = ctx.method;
//     ctx.body = `<span>KOA Rendered - path ${path} - method ${method}</span>`;
// });
// server.use(async (ctx, next) => {
//     await handle(ctx.req, ctx.res)
//     ctx.respond = false
// })
server.listen(3000, () => {
    console.log('KOA server listening on port 3000');
});
// })
