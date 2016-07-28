import Promise from 'bluebird'
import { hash } from 'bcrypt'
import joi from 'joi'
import { Model } from '@vulcan/core'

export default Model.extend({
  tableName: 'users',
  hidden: ['password'],
  validate: {
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
  },
  initialize () {
    this.on('creating', (...args) => this.hashPassword(...args))
  },
  hashPassword (model, attrs, opts) {
    return new Promise((resolve, reject) => {
      hash(model.get('password'), 10, (err, hash) => {
        if (err) {
          return reject(err)
        }
        model.set('password', hash)
        return resolve(model)
      })
    })
  }
})
