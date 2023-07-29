const { Pool } = require('pg')

const pool = new Pool({
    host: 'silly.db.elephantsql.com',
    port: 5432,
    user: 'bzndwiea',
    password: '4txlSFTZ_3gYHeac9ASGYCckCecZIktO',
    database: 'bzndwiea'
})

const query = (text, param) => {
    return pool.query(text, param)
}

module.exports = {
    query
}