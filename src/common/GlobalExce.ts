import Koa, { Context } from 'koa'
import { fail } from './ResResult';
import logger from './LogUtil';

const globalException = async (ctx: Context, next: Koa.Next) => {
  logger.info('进入异常处理');
  try {
    await next();
  }
  catch(err: any) {
    const errResult = err as { message: string }
    ctx.body = fail(`服务器错误：${errResult.message}`)
  }
}

export default globalException
