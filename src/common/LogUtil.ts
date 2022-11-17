import log4js from 'log4js';

enum LevelInfo {
  'trace' = 'trace',
  'debug' = 'debug',
  'info' = 'info',
  'warn' = 'warn',
  'error' = 'error',
  'fatal' = 'fatal'
}

class LogUtil {
  static logUtil: LogUtil = new LogUtil()
  logInstance!: log4js.Logger // log实例

  private constructor() {
    this.config();
  }
  
  config() {
    log4js.configure({
      // 日志添加的目录
      appenders: {
        console: { type: 'console' },
        debug_file: { type: 'file', filename: 'mylog/debug.log' }
      },
      categories: {
        // debug的输出以及级别
        default: {
          appenders: ['console', 'debug_file'],
          level: LevelInfo.debug
        },
        info: {
          appenders: ['console'],
          level: LevelInfo.info
        },
        warn: {
          appenders: ['console'],
          level: LevelInfo.warn
        },
      }
    })
  }

  getCategories(level: LevelInfo) {
    // 需要上方的配置，才知道对应的日志实例存放的位置以及对应的级别
    this.logInstance = log4js.getLogger(level)
  }

  debug(input: string) {
    // 生成对应级别的实例，然后将错误信息给输出
    this.getCategories(LevelInfo.debug)
    this.logInstance.debug(input)
  }

  info(input: string) {
    // 生成对应级别的实例，然后将错误信息给输出
    this.getCategories(LevelInfo.info)
    this.logInstance.info(input)
  }

  warn(input: string) {
    // 生成对应级别的实例，然后将错误信息给输出
    this.getCategories(LevelInfo.warn)
    this.logInstance.warn(input)
  }
  
}

export default LogUtil.logUtil
