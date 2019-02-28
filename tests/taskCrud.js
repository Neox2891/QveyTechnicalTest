const assert = require('assert');
const request = require('supertest');

const app = require('../server/server');

let id = '5c7233b837f09148529e047d';
let userId = '5c7228e00e15ee43a0bf4247';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwic3RhdGUiOnRydWUsInRvdGFsRHVyYXRpb24iOjI5OTQwLCJfaWQiOiI1YzcyMjhlMDBlMTVlZTQzYTBiZjQyNDciLCJuYW1lIjoiTmVzdG9yIEVzdHJhZGEiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZGF0ZSI6IlN1biBGZWIgMjQgMjAxOSAwMDoxNzoyMCBHTVQtMDUwMCAoR01ULTA1OjAwKSIsIl9fdiI6MjMsInRpbWVQZXJQcm9qZWN0IjpbeyJfaWQiOiI1Yzc2MWRmNGE1NWMyNjIxNTkxMjY1MTQiLCJwcm9qZWN0IjoiNWM3MjMwZjEwM2YzYWI0NzBlMWFiZmY2IiwiZHVyYXRpb24iOjIyMDM0fSx7Il9pZCI6IjVjNzYyMzllNjg2NDQ4MjFiZGFhYWMyYSIsInByb2plY3QiOiI1Yzc0YTg3YWJhNGFiMTQyM2JjZThlZmEiLCJkdXJhdGlvbiI6NzkwNn1dfSwiaWF0IjoxNTUxMzAxNTY5LCJleHAiOjE1NTE0NzQzNjl9.tJiXSBwJySH2S8tJgpivXcpce8VEaU9N9mTA-QVu7rQ';
let estimatedTime = '8452:45:02';

describe('GET /task', function(){
    describe('.status(code) / Content-Type', function(){
      it('obtener todas las tareas', function(done){ 
        request(app)
        .get(`/task?token=${token}`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
    })
});

describe('GET /task/recent-to-old/:id', function(){
    describe('.status(code) / Content-Type / ID', function(){
      it('obtener una tarea por ID', function(done){ 
        request(app)
        .get(`/task/recent-to-old/${id}?token=${token}`, (req, res) => {
            assert(res.body.taskDb._id, id)
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
    })
});

describe('POST /task-create', function(){
    describe('.status(code) / Content-Type / Accept', function(){
      it('crear una tarea', function(done){ 
        request(app)
        .post(`/task-create?estimatedTime=${estimatedTime}&token=${token}`)
        .send({
            name: 'tarea dos',
            projectId: id,
            userId 
        })
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201, done);
      })
    })
});

describe('PUT /task/:id', function(){
    describe('.status(code) / Content-Type / Accept / ID', function(){
      it('actualizar una tarea', function(done){ 
        request(app)
        .put(`/task/${id}?token=${token}`, (req, res) => {
            assert(res.body.taskDb._id, id)
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

describe('DELETE /task/:id', function(){
    describe('.status(code) / Content-Type / Accept / ID', function(){
      it('eleminar una tarea', function(done){ 
        request(app)
        .delete(`/task/${id}?token=${token}`, (req, res) => {
            assert(res.body.taskDb._id, id)
        })
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('X-Powered-By', 'Express')
        .expect(200, done);
      })
    })
});

describe('POST /task-start/:id', function(){
    describe('.status(code) / Content-Type / Accept', function(){
      it('inicia una tarea', function(done){ 
        request(app)
        .post(`/task-start/${id}?token=${token}`)
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
    })
});

describe('POST /task-pause/:id', function(){
    describe('.status(code) / Content-Type / Accept', function(){
      it('pausa una tarea', function(done){ 
        request(app)
        .post(`/task-pause/${id}?token=${token}`)
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
    })
});

describe('POST /task-restart/:id', function(){
    describe('.status(code) / Content-Type / Accept', function(){
      it('pausa una tarea', function(done){ 
        request(app)
        .post(`/task-restart/${id}?token=${token}`)
        .set('Accept', 'application/json')
        .set('Accept', 'application/x-www-form-urlencoded')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
      })
    })
});
