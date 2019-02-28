/**
 * Manejador de rutas
 * @param {*} param0
 * @param {Object} param0.User - modelo de usuarios DB
 * @module jwt modulo jwt
 * @module bcrypt modulo bcrypt
 */
const handlers = ({ jwt, bcrypt, User }) => ({ 
    /**
     * Login usuario.
     *  
     * @param {Object} req Request.
     * @returns {Object} Objeto que representa el login de usuario.
     */
    post: (req, res) => {

        let { body } = req;
      
        User.findOne({ email: body.email }, (err, userDb) => {
          
            if (err) {
      
              return res.status(500).json({
                  ok: false,
                  err
              });
          }
      
          if (!userDb) {
      
              return res.status(400).json({
                  ok: false,
                  err: {
                      message: 'Usuario o contraseña incorrectos'
                  }
              });
          }
      
          if (!bcrypt.compareSync(body.password, userDb.password)) {
              return res.status(400).json({
                  ok: false,
                  err: {
                      message: 'Usuario o contraseña incorrectos'
                  }
              });
          }
      
          let token = jwt.sign({
              user: userDb
          }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
      
          res.json({
              ok: true,
              user: userDb,
              token
          });
        });
      }
      
})


module.exports = handlers;