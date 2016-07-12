import User from 'app/models/user'

export function * list () {
  const users = yield User.all()
  return yield this.send({ users })
}

export function * create () {
  const user = yield User.create(this.request.body)
  yield this.mailer.send('emails/welcome', {
    to: user.get('email'),
    subject: 'Welcome!',
    locals: {
      name: user.get('name')
    }
  })

  return yield this.send({ user }, 201)
}

export function * show () {
  const user = yield User.find(this.params.id)

  return yield this.send({ user })
}

export function * update () {
  const user = yield User.find(this.params.id)
  yield user.save(this.request.body, { patch: true })

  return yield this.send({ user })
}

export function * destroy () {
  const user = yield User.find(this.params.id)
  yield user.destroy()

  return yield this.send({}, 204)
}
