process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const request = require('supertest')


const app = require('../../server')
const connectDB = require('../../config/db')
const close  = require('../../config/dbs')


describe('USER AUTH', () => {
    before((done) => {
        connectDB()
        done()
    })
    after((done) => {
        close()
        done()
    })
    it('OK, creating a new user',(done) => {
        request(app).post('/auth/v1')
            .send({username:"manulangat1",email:"el@gmail.com",password:'3050manu'})
            .then((res) => {
                const body = res.body 
                // expect(body).to.contain('object')
                console.log('body')
                console.log('done')
                done()
            })
    })
})