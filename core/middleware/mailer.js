import { resolve } from 'path'
import Promise from 'bluebird'
import nodemailer from 'nodemailer'
import { htmlToText } from 'nodemailer-html-to-text'
import { defaultsDeep, isFunction } from 'lodash'
import cons from 'co-views'
import services from 'core/mailer-services'

const $createTransport = (options) => {
  const transport = services[options.service]
  const opts = options.services[options.service]

  if (isFunction(transport)) {
    return nodemailer.createTransport(transport(opts))
  }
  return nodemailer.createTransport(defaultsDeep({}, transport, { auth: opts }))
}

export class Mailer {
  constructor (options, views) {
    this.$from = options.from
    this.$transport = $createTransport(options)
    this.$render = cons(resolve('app/views'), defaultsDeep({}, views, { ext: views.extension }))
  }

  use (...args) {
    this.$transport.use(...args)
    return this
  }

  send (view, options) {
    return new Promise((resolve, reject) => {
      const locals = options.locals || {}
      delete options.locals
      this.$render(view, defaultsDeep({}, options, locals)).then((html) => {
        this.$transport.sendMail(defaultsDeep({}, options, { from: this.$from, html, xMailer: false }), (err, info) => {
          if (err) {
            return reject(err)
          }
          return resolve(info)
        })
      })
    })
  }
}

export default (options, views) => function * (next) {
  this.mailer = new Mailer(options, views).use('compile', htmlToText())
  yield next
}
