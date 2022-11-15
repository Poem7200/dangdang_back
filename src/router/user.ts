import { Context } from "koa";
import Router from 'koa-router';
import { success } from "../common/ResResult";

const router = new Router()

router.prefix('/userModule')

// TODO: 如何将成功的返回全局统一处理？
router.get('/findUserInfo/:username', async (ctx: Context) => {
  const { username } = ctx.params
  ctx.body = success(`欢迎${username}`)
})

router.post('/addUser', async (ctx: Context) => {
  const user = ctx.request.body
  ctx.body = success(`欢迎${user.username}`)
})

module.exports = router