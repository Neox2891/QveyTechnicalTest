const assert = require('assert');
const request = require('supertest');

const app = require('../server/server');

let id = '5c7230f103f3ab470e1abff6';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwic3RhdGUiOnRydWUsInRvdGFsRHVyYXRpb24iOjI5OTQwLCJfaWQiOiI1YzcyMjhlMDBlMTVlZTQzYTBiZjQyNDciLCJuYW1lIjoiTmVzdG9yIEVzdHJhZGEiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZGF0ZSI6IlN1biBGZWIgMjQgMjAxOSAwMDoxNzoyMCBHTVQtMDUwMCAoR01ULTA1OjAwKSIsIl9fdiI6MjMsInRpbWVQZXJQcm9qZWN0IjpbeyJfaWQiOiI1Yzc2MWRmNGE1NWMyNjIxNTkxMjY1MTQiLCJwcm9qZWN0IjoiNWM3MjMwZjEwM2YzYWI0NzBlMWFiZmY2IiwiZHVyYXRpb24iOjIyMDM0fSx7Il9pZCI6IjVjNzYyMzllNjg2NDQ4MjFiZGFhYWMyYSIsInByb2plY3QiOiI1Yzc0YTg3YWJhNGFiMTQyM2JjZThlZmEiLCJkdXJhdGlvbiI6NzkwNn1dfSwiaWF0IjoxNTUxMjQ4NDc0LCJleHAiOjE1NTE0MjEyNzR9.rzCSgqnt-2cNaSElS1b6EUgPK6z6WG2RuIPJfKPvo3Y';

describe('GET /project', function(){
    describe('.status(code) / Content-Type', function(){
      it('obtener todos los proyectos', function(done){ 
        request(app)
        .get(`/project?token=${token}`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
    })
});

describe('GET /project/:id', function(){
    describe('.status(code) / Content-Type / ID', function(){
      it('obtener un proyecto por ID', function(done){ 
        request(app)
        .get(`/project/${id}?token=${token}`, (req, res) => {
            assert(res.body.projectDb._id, id)
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
    })
});

describe('POST /project', function(){
    describe('.status(code) / Content-Type / Accept', function(){
      it('crear un proyecto', function(done){ 
        request(app)
        .post(`/project?token=${token}`)
        .send({
            name: 'proyecto uno',
        })
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201, done);
      })
    })
});

describe('PUT /project/:id', function(){
    describe('.status(code) / Content-Type / Accept / ID', function(){
      it('actualizar un proyecto', function(done){ 
        request(app)
        .put(`/project/${id}?token=${token}`, (req, res) => {
            assert(res.body.projectDb._id, id)
        })
        .send({
            name: 'nombre actualizado',
        })
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('X-Powered-By', 'Express')
        .expect(200, done);
      })
    })
});

describe('DELETE /project/:id', function(){
    describe('.status(code) / Content-Type / Accept / ID', function(){
      it('eleminar un proyecto', function(done){ 
        request(app)
        .delete(`/project/${id}?token=${token}`, (req, res) => {
            assert(res.body.projectDb._id, id)
        })
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('X-Powered-By', 'Express')
        .expect(200, done);
      })
    })
});
