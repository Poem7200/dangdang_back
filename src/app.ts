import Koa from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'
import allRouterLoader from './common/AllRouterLoader'
// import { userRouter } from './router/user'

const app = new Koa()
const router = new Router()
// 所有的路由访问添加一级路由dang
router.prefix('/dang')
router.use(json())
router.use(body())

// router.use(userRouter.routes(), userRouter.allowedMethods())

// 路由加载到全局路由上面
app.use(router.routes())
app.listen(3002)
console.log('server is running on port 3002')
console.log(allRouterLoader.init(app))
