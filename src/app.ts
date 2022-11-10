import Koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()
// 所有的路由访问添加一级路由dang
router.prefix('/dang')

router.get('/test', async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.body = 'first test page'
})
router.use(json())
router.use(body())

// 路由加载到全局路由上面
app.use(router.routes())
app.listen(3002)
console.log('server is running on port 3002')
