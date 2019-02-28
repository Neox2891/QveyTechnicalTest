const assert = require('assert');
const request = require('supertest');

const app = require('../server/server');

let id = '5c7228e00e15ee43a0bf4247';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwic3RhdGUiOnRydWUsInRvdGFsRHVyYXRpb24iOjI5OTQwLCJfaWQiOiI1YzcyMjhlMDBlMTVlZTQzYTBiZjQyNDciLCJuYW1lIjoiTmVzdG9yIEVzdHJhZGEiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZGF0ZSI6IlN1biBGZWIgMjQgMjAxOSAwMDoxNzoyMCBHTVQtMDUwMCAoR01ULTA1OjAwKSIsIl9fdiI6MjMsInRpbWVQZXJQcm9qZWN0IjpbeyJfaWQiOiI1Yzc2MWRmNGE1NWMyNjIxNTkxMjY1MTQiLCJwcm9qZWN0IjoiNWM3MjMwZjEwM2YzYWI0NzBlMWFiZmY2IiwiZHVyYXRpb24iOjIyMDM0fSx7Il9pZCI6IjVjNzYyMzllNjg2NDQ4MjFiZGFhYWMyYSIsInByb2plY3QiOiI1Yzc0YTg3YWJhNGFiMTQyM2JjZThlZmEiLCJkdXJhdGlvbiI6NzkwNn1dfSwiaWF0IjoxNTUxMjQ4NDc0LCJleHAiOjE1NTE0MjEyNzR9.rzCSgqnt-2cNaSElS1b6EUgPK6z6WG2RuIPJfKPvo3Y';

describe('GET /users', function(){
    describe('.status(code) / Content-Type', function(){
      it('obtener todos los usuarios', function(done){ 
        request(app)
        .get(`/users?token=${token}`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
    })
});

describe('GET /users/:id', function(){
    describe('.status(code) / Content-Type', function(){
      it('obtener un usuario por ID', function(done){ 
        request(app)
        .get(`/users/${id}?token=${token}`, (req, res) => {
            assert(res.body.userDb._id, id)
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
    })
});

describe('POST /users', function(){
    describe('.status(code) / Content-Type / Accept', function(){
      it('crear un usuario', function(done){ 
        request(app)
        .post(`/users?token=${token}`)
        .send({
            name: 'pepe',
            email: 'pepe@gmail.com',
            password: '123456'
        })
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201, done);
      })
    })
});

describe('PUT /users/:id', function(){
    describe('.status(code) / Content-Type / Accept', function(){
      it('actualizar un usuario', function(done){ 
        request(app)
        .put(`/users/${id}?token=${token}`)
        .send({
            name: 'Nestor Estrada',
            email: 'test@gmail.com',
        })
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('X-Powered-By', 'Express')
        .expect(200, done);
      })
    })
});

describe('DELETE /users/:id', function(){
    describe('.status(code) / Content-Type / Accept', function(){
      it('eleminar un usuario', function(done){ 
        request(app)
        .delete(`/users/${id}?token=${token}`)
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('X-Powered-By', 'Express')
        .expect(200, done);
      })
    })
});
