/**
 * Manejador de rutas
 * @param {*} param0
 * @param {Object} param0.User - modelo de usuarios DB
 * @param {Object} param0.Task modelo de tareas 
 * @param {Object} param0.Project - modelo de proyectos DB
 */
const handlers = ({ User, Project, Task }) => ({
    /**
     * Obtener todos los usuarios, tareas y proyectos.
     * 
     * @param {Object} req Request.
     * @returns {Object} Objeto que representa todos los usuarios, tareas y proyectos.
     */
    get: (req, res) => {

        User.find({}, (err, userDb) => {
            
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            Project.find({}, (err, projectDb) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                
                Task.find({}, (err, TaskDb) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }
                    
                    res.status(200).json({
                        userDb,
                        projectDb,
                        TaskDb
                    })
                });
            });
        });
    }
})

module.exports = handlers;