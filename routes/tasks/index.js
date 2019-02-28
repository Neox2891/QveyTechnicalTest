
/**
 * Manejador de rutas
 * @param {*} param0
 * @param {Object} param0.Task modelo de tareas.
 * @param {Object} param0.Project - modelo de proyectos DB.
 * @param {Object} param0.User - modelo de usuarios DB.
 * @module _ modulo underscore.
 */
const handlers = ({ Task, Project, User, _ }) => ({
    /**
     * Obtener tareas por ID.
     * 
     * @param {Object} req Request.
     * @returns {Object} Objeto que representa una tarea.
     */
    getById: async (req, res) => {

        let { userId } = req.params;
        
        let queryDb = Task.find({ user: userId }).exec();
            
        let tasksDb = await queryDb.then((doc) => doc).catch((err) => err)
        
        if (tasksDb.message) {
            
            return res.status(404).json({
                ok: false,
                err: tasksDb.message,
            });
        }
        
        res.status(200).json({
            ok: true,
            tasks: tasksDb.reverse(),
        });
    
    },
    /**
     * Obtener todas las tareas.
     * 
     * @param {Object} req Request.
     * @returns {Object} Objeto que representa todas las tareas.
     */
    getAll: (req, res) => {

        Task.find({}, (err, taskDb) => {
            
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                taskDb
            });
        });

    },
    /**
    * Crea una tarea en especifico. 
    * 
    * @param {Object} req Request.
    * @returns {Object} Objeto que representa la tarea creada.
    */
    postCreate: (req, res) => {

        let body = req.body;
        let time = req.query.estimatedTime; // ej: {14:45:20} - 24h
        let splitTime;
        let timeInt = [];
        
        if (time) {
    
            splitTime = time.split(':');
            
            timeInt = splitTime.map((element) => parseInt(element));
    
        }
        
        let newTask = new Task ({
            name: body.name || null,
            user: body.userId,
            project: body.projectId,
            estimatedTime: {
                hours: timeInt[0] || 0,
                minutes: timeInt[1] || 0,
                seconds: timeInt[2] || 0
            },
            date: Date()
        });
    
        newTask.save((err, taskDb) => {
    
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
    
            res.status(201).json({
                ok: true,
                taskDb
            });
    
        });
    
    },
    /**
    * Inicia una tarea en especifico por su ID.
    * 
    * @param {Object} req Request
    * @returns {Object} Objeto que representa la tarea iniciada.
    */
    postStart: (req, res) => {

        let { id } = req.params;
        
        Task.findById(id, (err, taskDb) => {
    
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
    
            if (!taskDb) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Id invalido'
                    }
                });
            }   
    
            taskDb.timeTraking.start = new Date().getTime();
    
            taskDb.save((err, taskStart) => {
                
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
    
                res.status(200).json({
                    ok: true,
                    taskStart
                });
            })
    
        });
    },
    /**
    * Pausa una tarea en especifico por su ID.
    * 
    * @param {Object} req Request
    * @returns {Object} Objeto que representa la tarea pausada.
    */
    postPause: (req, res) => {

        let { id } = req.params;
        
        Task.findById(id, (err, taskDb) => {
    
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
    
            if (!taskDb) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Id invalido'
                    }
                });
            }   
    
            taskDb.timeTraking.pause = new Date().getTime();

            let diffTask = taskDb.timeTraking.pause - taskDb.timeTraking.start;
    
            taskDb.timeTraking.duration = taskDb.timeTraking.duration + diffTask;
            
            Project.findById(taskDb.project, (err, projectDb) => {
                
                projectDb.duration = projectDb.duration + diffTask;
               
                projectDb.save((err, saveProjectTime) => {
                    
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    
                });

                User.findById(taskDb.user, (err, userDb) => {

                    let idProject = taskDb.project.toString();

                    let searchProject = userDb.timePerProject.find(element => {
                        return element.project.toString() === idProject;
                    });
                
                    if (searchProject === undefined) {
    
                        userDb.timePerProject.push({
                            project: taskDb.project,
                            duration: taskDb.timeTraking.duration
                        });
    
                    } else {
                        
                        userDb.timePerProject.forEach((element) => {
                                
                            if (element.project.toString() === idProject) {
                                element.duration = element.duration + diffTask;
                            }
                        })
    
                    }
    
                    userDb.totalDuration = userDb.totalDuration + diffTask;
    
                    userDb.save((err, saveUserTime) => {
                        
                        if (err) {
                            return res.status(400).json({
                                ok: false,
                                err
                            });
                        }
                        
                    });
    
                });

            });
            
            taskDb.save((err, taskPause) => {
                
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
    
                res.status(200).json({
                    ok: true,
                    taskPause
                });
            })
    
        });
        
    },
    /**
    * Reinicia una tarea en especifico por su ID.
    * 
    * @param {Object} req Request
    * @returns {Object} Objeto que representa la tarea reiniciada.
    */
    postRestart: (req, res) => {

        let { id } = req.params;
    
        Task.findById(id, (err, taskDb) => {
    
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
    
            if (!taskDb) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Id invalido'
                    }
                });
            }   
    
            taskDb.timeTraking.start = 0;
            taskDb.timeTraking.pause = 0;
            taskDb.timeTraking.duration = 0;
    
            taskDb.save((err, taskRestart) => {
                
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
    
    
                res.status(200).json({
                    ok: true,
                    taskRestart
                });
            })
    
        });
    
    },
    /**
    * Actualiza una tarea por su ID.
    * 
    * @param {Object} req Request.
    * @returns {Object} Objeto que representa la tarea Actualizada.
    */
    put: (req, res) => {

        let { id } = req.params;
    
        let body = _.pick(req.body, 'name');
    
        Task.findByIdAndUpdate(id, body, { new: true }, (err, taskDb) => {
            
            if (err) {
    
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!taskDb) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'Tarea no encontrada',
                    }
                });
            }
    
            res.status(200).json({
                ok: true,
                task: taskDb
            });
        });
    
    },
    /**
    * Elimina una tarea por su ID.
    * 
    * @param {Object} req Request.
    * @returns {Object} Objeto que representa la tarea Eliminada.
    */
    delete: (req, res) => {

        let { id } = req.params;
        
        let stateChange = {
            state: false
        };
        
        Task.findByIdAndUpdate(id, stateChange, { new: true }, (err, removeTask) => {
            if (err) {
    
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (!removeTask) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'Tarea no encontrada',
                    }
                });
            }
    
            res.status(200).json({
                ok: true,
                task: removeTask
            });
        });
    }
})

module.exports = handlers;