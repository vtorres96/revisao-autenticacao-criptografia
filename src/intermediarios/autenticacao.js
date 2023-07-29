const jwt = require('jsonwebtoken')
const senhaJwt = require('../jwtSecret')

const validarAutenticacao = (req, res, next) => {

    try {
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(401).json({
                mensagem: 'O usuário não está autenticado'
            })
        }

        // estamos trabalhando com formato Bearer token = Bearer ksdaksdoaskdaeogj392pqj223/9r412854219823
        const token = authorization.split(' ')[1]
        const assinaturaToken = jwt.verify(token, senhaJwt)
        req.usuarioId = assinaturaToken.id
        
        next()
    } catch (error) {
        return res.status(500).json({
            mensagem: error.message
        })
    }

}

module.exports = {
    validarAutenticacao
}