import { resolve, join } from 'path'
import { createWriteStream } from 'fs'
import { defaultsDeep } from 'lodash'

export class FileTransport {
  constructor (options = {}) {
    this.$options = defaultsDeep({}, options, { path: resolve('storage') })
    this.name = 'file'
    this.version = '1.0.0'
  }

  send (mail, callback) {
    let callbackSent = false
    const log = createWriteStream(join('storage', 'emails.log'), { flags: 'a' })
    const message = mail.message.createReadStream()
    const onError = (err) => {
      if (callbackSent) {
        return
      }

      callbackSent = true
      callback(err)
    }
    message.on('error', onError)
    log.on('error', onError)

    log.on('finish', () => {
      if (callbackSent) {
        return
      }

      callbackSent = true
      callback(null, {
        envelope: mail.data.envelope || mail.message.getEnvelope(),
        messageId: mail.message.getHeader('message-id')
      })
    })

    message.pipe(log)
  }
}

export default (opts) => new FileTransport(opts)
