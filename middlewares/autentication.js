const jwt = require('jsonwebtoken');
/**
 * Verificar token usuario
 * 
 * @param {Object} req Request
 * 
 */
let checkToken = (req, res, next) => {
    
    let urlToken = req.query.token;
    
    jwt.verify(urlToken, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token invalido!'
                }
            });
        }
        
        req.user = decoded.user;
        next();
    })

};
/**
 * Verificar role usuario
 * 
 * @param {Object} req
 * 
 */
let checkAdminRole = (req, res, next) => {

    let user = req.user;

    if (user.role !== 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }

    next();
};

module.exports = {
    checkToken,
    checkAdminRole
};