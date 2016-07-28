/* eslint-env mocha */
import { expect } from 'chai'
import request from 'supertest'
import cheerio from 'cheerio'
import { db } from '@vulcan/core'
import app from 'app'

const server = app.listen()

describe('Vulcan Application', () => {
  before(() => db.migrate.latest().then(() => db.seed.run()))

  describe('GET /', () => {
    it('should return Hello World', (done) => {
      request(server).get('/')
        .expect('content-type', /text\/html/)
        .expect(200)
        .end((err, res) => {
          const $ = cheerio.load(res.text)
          expect(err).to.be.null
          expect($('h1').text()).to.equal('Hello World')
          done()
        })
    })
  })
  describe('GET /users', () => {
    it('should return users', (done) => {
      request(server).get('/users')
        .set('accept', 'text/html')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.error).to.be.undefined
          expect(res.body.data.users).to.not.be.empty
          expect(res.body.data.users).to.have.length.above(0)
          done()
        })
    })
  })

  describe('POST /users', () => {
    it('should create a user', () => {
      request(server).post('/users')
        .set('accept', 'application/json')
        .send({ name: 'John Doe', email: 'test@test.com', password: 'test' })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.data.user).to.not.be.empty
          expect(res.data.user.email).to.equal('test@test.com')
        })
    })

    it('should return bad request for invalid data', () => {
      request(server).post('/users')
        .set('accept', 'application/json')
        .send({ email: 'noop' })
        .expect(400)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.data.error).to.not.be.empty
          expect(res.data.error.statusCode).to.equal(400)
        })
    })
  })

  describe('GET /users/1', () => {
    it('should return the user with id #1', () => {
      request(server).get('/users/1')
        .set('accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.error).to.be.undefined
          expect(res.body.data.user).to.be.an('object')
          expect(res.bodoy.data.users.email).to.not.be.empty
        })
    })
  })

  describe('PUT /users/3', () => {
    it('should update user #3', () => {
      request(server).put('/users/3')
        .set('accept', 'application/json')
        .send({ email: 'test@example.com' })
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.error).to.be.undefined
          expect(res.body.data.user).to.be.an('object')
          expect(res.body.data.user.email).to.equal('test@example.com')
        })
    })
  })

  describe('DELETE /users/3', () => {
    it('should delete user #3', () => {
      request(server).delete('/users/3')
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res.body.data).to.be.empty()
        })
    })
  })

  describe('GET /users/5', () => {
    it('should return 404 error', () => {
      request(server).get('/users/5')
        .set('accept', 'application/json')
        .expect(404)
        .end()
    })
  })
})
