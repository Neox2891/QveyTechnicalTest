
/**
 * Manejador de rutas
 * @param {*} param0
 * @param {Object} param0.Task modelo de tareas 
 * @param {Object} param0.Project - modelo de proyectos DB
 * @module _ modulo underscore
 */
const handlers = ({ Project, Task, _ }) => ({
    /**
     * Obtener todos los proyectos
     * 
     * @param {Object} req Request
     * @returns {Object} Objeto que representa todos los proyectos
     */
    get: (req, res) => {
        
        Project.find({})
                .populate('user', 'name email')
                .exec((err, projectDb) => {
    
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
    
            if (!projectDb) {
    
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'No hay proyectos disponibles'
                    }
                });
    
            }

            res.status(200).json({
                ok: true,
                projectDb
            });
    
        });
    
    },
    /**
     * Obtener proyectos por ID.
     * 
     * @param {Object} req Request
     * @returns {Object} Objeto que representa el proyecto 
     */
    getById: (req, res) => {

        let { id } = req.params;
        
        Project.findById(id)
                .populate('user', 'name email')
                .exec((err, projectDb) => {
    
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
    
            if (!projectDb) {
    
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'Id invalido'
                    }
                });
    
            }
    
            Task.find({ project: id }).populate('user', '_id name email').exec((err, taskDb) => {
                
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
    
                res.status(200).json({
                    ok: true,
                    projectDb,
                    taskProject: taskDb,
                });
    
            });

        });
    
    },
    /**
     * Crear proyectos
     * 
     * @param {Object} req Request
     * @returns {Object} Objeto que representa el proyecto creado
     */
    post: (req, res) => {

        let { body } = req;
        let { _id } = req.user;
    
        let newProject = new Project ({
            name: body.name,
            user: _id,
            time: {
                hours: body.hours,
                minutes: body.minutes,
                seconds: body.seconds,
            }
        });
    
        newProject.save((err, projectDb) => {
    
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
    
            res.status(201).json({
                ok: true,
                projectDb
            });
    
        });
    
    },
    /**
     * Actualizar proyectos por ID.
     * 
     * @param {Object} req Request
     * @returns {Object} Objeto que representa el proyecto actualizado
     */
    put: (req, res) => {

        let { id } = req.params;
    
        let body = _.pick(req.body, 'name');
    
        Project.findByIdAndUpdate(id, body, { new: true }, (err, projectDb) => {
            
            if (err) {
    
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!projectDb) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'proyecto no encontrado',
                    }
                });
            }
    
            res.json({
                ok: true,
                project: projectDb
            });
        });
    
    },
    /**
     * Eliminar proyectos por ID.
     * 
     * @param {Object} req Request
     * @returns {Object} Objeto que representa el proyecto eliminado
     */
    delete: (req, res) => {

        let { id } = req.params;
        
        let stateChange = {
            state: false
        };
        
        Project.findByIdAndUpdate(id, stateChange, { new: true }, (err, removeProject) => {
            if (err) {
    
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (!removeProject) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'proyecto no encontrado',
                    }
                });
            }
    
            res.json({
                ok: true,
                project: removeProject
            });
        });
    
    }
})

module.exports = handlers;

