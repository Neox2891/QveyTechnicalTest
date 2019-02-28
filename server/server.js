require('../config/config');
const express = require ('express');
const app = express();
const mongoose =  require('mongoose');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

// models DB
const User = require('../models/users');
const Project = require('../models/projects');
const Task = require('../models/tasks');

const { users, projects, tasks, login, getAll } = require('../routes');

const { checkToken, checkAdminRole } = require('../middlewares/autentication');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// handlers
const usersHandler = users({ bcrypt, User, Task, _ });
const projectsHandler = projects({ Project, Task, _ });
const tasksHandler = tasks({ Task, Project, User, _ });
const loginHandler = login({ jwt, bcrypt, User });
const getAllHandler = getAll({ User, Project, Task });

// Login
app.post('/login', loginHandler.post);

// Get all
app.get('/getAll', getAllHandler.get);

// Users
app.get('/users/:id', checkToken, usersHandler.getById);
app.put('/users/:id', [checkToken, checkAdminRole], usersHandler.put);
app.delete('/users/:id', [checkToken, checkAdminRole], usersHandler.delete);
app.get('/users', checkToken, usersHandler.get);
app.post('/users', usersHandler.post);

// Projects
app.get('/project/:id', checkToken, projectsHandler.getById);
app.put('/project/:id', [checkToken, checkAdminRole], projectsHandler.put);
app.delete('/project/:id', [checkToken, checkAdminRole], projectsHandler.delete);
app.get('/project', checkToken, projectsHandler.get);
app.post('/project', [checkToken, checkAdminRole], projectsHandler.post);

// Tasks
app.get('/task/recent-to-old/:userId', checkToken, tasksHandler.getById);
app.post('/task-start/:id', checkToken, tasksHandler.postStart);
app.post('/task-pause/:id', checkToken, tasksHandler.postPause);
app.post('/task-restart/:id', checkToken, tasksHandler.postRestart);
app.put('/task/:id', checkToken, tasksHandler.put);
app.delete('/task/:id', checkToken, tasksHandler.delete);
app.post('/task-create', checkToken, tasksHandler.postCreate);
app.get('/task', checkToken, tasksHandler.getAll);

mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('conectado con la base de datos');
})

mongoose.set('useCreateIndex', true);

app.listen(process.env.PORT, () => {
    console.log(`conectador en el puerto ${process.env.PORT}`);
});

module.exports = app;