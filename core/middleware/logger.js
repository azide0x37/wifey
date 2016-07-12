import Promise from 'bluebird'
import morgan from 'morgan'

export default (format, options) => {
  const logger = Promise.promisify(morgan(format, options))

  return function * (next) {
    yield logger(this.req, this.res)
    next && (yield next)
  }
}
