import Promise from 'bluebird'
import faker from 'faker'
import User from 'app/models/user'

export const seed = (db) => Promise.all([
  User.create([{
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  }, {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password()
  }])
])
