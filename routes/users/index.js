
/**
 * Manejador de rutas
 * @param {*} param0
 * @param {Object} param0.User - modelo de usuarios DB
 * @param {Object} param0.Task modelo de tareas 
 * @module _ modulo underscore
 * @module bcrypt modulo bcrypt
 */
const handlers = ({ bcrypt, User, Task, _ }) => ({
    /**
     * Obtener todos los usuarios.
     * 
     * @param {Object} req Request.
     * @returns {Object} Objeto que representa todos los usuarios.
     */
    get: (req, res) => {

        User.find({}, '_id name email role date', (err, userDb) => {
            
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                userDb
            });

        });
    },
    /**
     * Obtener usuario por su ID.
     * 
     * @param {Object} req Request.
     * @returns {Object} Objeto que representa el usuario solicitado.
     */
    getById: (req, res) => {

        let { id } = req.params;
        
        User.findById(id, 'name email role totalDuration timePerProject date').exec((err, userDb) => {
            
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!userDb) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: 'id invalido'
                    }
                });
            }
                
            res.status(200).json({
                ok: true,
                userDb,
            });

        });

    },
    /**
     * Crear usuario.
     *  
     * @param {Object} req Request.
     * @returns {Object} Objeto que representa el usuario creado.
     */
    post: (req, res) => {

        let { body } = req;
    
        let newUser = new User ({
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            date: Date()
        });
    
        newUser.save((err, userDb) => {
    
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
    
            res.status(201).json({
                ok: true,
                userDb
            });
    
        });
    },
    /**
     * Actualizar usuario por su ID.
     * 
     * @param {Object} req Request.
     * @returns {Object} Objeto que representa el usuario actualizado.
     */
    put: (req, res) => {

        let { id } = req.params;
    
        let body = _.pick(req.body, 'name', 'email', 'role', 'state');
    
        User.findByIdAndUpdate(id, body, { new: true }, (err, userDb) => {
            
            if (err) {
    
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!userDb) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado',
                    }
                });
            }
    
            res.status(200).json({
                ok: true,
                user: userDb
            });
        });
    
    },
    /**
     * Eliminar usuario por su ID.
     * 
     * @param {Object} req Request.
     * @returns {Object} Objeto que representa el usuario eliminado.
     */
    delete: (req, res) => {

        let { id } = req.params;
        
        let stateChange = {
            state: false
        };
        
        User.findByIdAndUpdate(id, stateChange, { new: true }, (err, removeUser) => {
            if (err) {
    
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (!removeUser) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado',
                    }
                });
            }
    
            res.status(200).json({
                ok: true,
                user: removeUser
            });
        });
    
    }
})


module.exports = handlers;