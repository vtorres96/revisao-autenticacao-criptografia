const { query } = require('../bancodedados/conexao')
const bcrypt = require('bcrypt')

const cadastrar = async (req, res) => {
    try {
        let { nome, email, senha } = req.body
        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: 'Valide se está informando as proprieadades obrigatórias: nome, email e senha'
            })
        }

        let data = await query(
            'select * from usuarios where email = $1',
            [email]
        )

        if (data.rowCount > 0) {
            return res.status(400).json({
                mensagem: 'Este e-mail já foi cadastrado'
            })
        }

        let senhaCriptografada = await bcrypt.hash(senha, 10)

        let dataInsert = await query(
            'insert into usuarios (nome, email, senha) values ($1, $2, $3) RETURNING id, nome, email',
            [nome, email, senhaCriptografada]
        )

        if (dataInsert.rowCount == 0) {
            return res.status(400).json({
                mensagem: 'Não possível cadastrar o usuário'
            })
        }

        return res.status(201).json(dataInsert.rows[0])
    } catch (error) {
        return res.status(500).json({
            mensagem: error.message
        })
    }
    
}

const listar = async (req, res) => {
    try {
        let data = await query('select * from usuarios')

        if (data.rowCount == 0) {
            return res.status(400).json({
                mensagem: 'Não existe usuários cadastrados'
            })
        }

        return res.status(200).json(data.rows)
    } catch (error) {
        return res.status(500).json({
            mensagem: error.message
        })
    }
}

module.exports = {
    cadastrar,
    listar
}