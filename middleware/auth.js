const jwt = require('jsonwebtoken')

// Verificar token

let verrify_token = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, result) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    msg: "Invalid token!"
                }
            })
        }
        req.user = result.user
        next();
    })
}


module.exports = verrify_token