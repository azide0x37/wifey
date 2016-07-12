import { defaultsDeep } from 'lodash'

export class ConsoleTransport {
  constructor (options = {}) {
    this.$options = defaultsDeep({}, options)
    this.name = 'console'
    this.version = '1.0.0'
  }

  send (mail, callback) {
    const message = mail.message.createReadStream()
    const chunks = []

    message.on('data', (chunk) => {
      chunks.push(chunk.toString())
    })

    message.on('end', () => {
      callback(null, {
        envelope: mail.data.envelope || mail.message.getEnvelope(),
        messageId: mail.message.getHeader('message-id'),
        message: chunks.join('')
      })
    })
  }
}

export default (opts) => new ConsoleTransport(opts)
