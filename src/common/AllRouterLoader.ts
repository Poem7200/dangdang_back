import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa from 'koa'
import json from 'koa-json'
import body from 'koa-body'

class AllRouterLoader {
  app!: Koa
  static allRouterLoader: AllRouterLoader = new AllRouterLoader()
  // 初始化方法
  init(app: Koa) {
    this.app = app;
    const rootRouter = this.loadAllRouterWrapper()
    this.app.use(rootRouter.routes())
    this.listen()
  }

  // 加载所有路由文件数组
  getFiles(dir: string) {
    // process.cwd是执行环境路径，__dirname是被执行文件所在路径
    return fs.readdirSync(dir)
  }
  // 加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), '/src/router')
    const allFiles = this.getFiles(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      const fullFilePath = dir + '/' + allFiles
      allFullFilePaths.push(fullFilePath)
    }
    return allFullFilePaths
  }
  // 加载所有二级路由到一级路由
  loadAllRouterWrapper() {
    // 先获取一级路由
    const rootRouter = this.getRootRouter()
    // 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    // 调用加载所有二级路由到一级路由方法
    this.loadAllRouter(allFullFilePaths, rootRouter)
    return rootRouter;
  }

  isRouter(data: any): data is Router {
    return data instanceof Router
  }

  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang')
    this.app.use(json())
    this.app.use(body())
    return rootRouter
  }
  
  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for(let fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath)
      if(this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }

  listen() {
    this.app.listen(3002)
  }
}

export default AllRouterLoader.allRouterLoader
