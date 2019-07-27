const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'Abufmf808',
        database: 'frankfernandez',
        port: 5433
    }
})

app.use(require('./routes/api'))

app.listen(port,()=> console.log(`Listening on ${port}`))
module.exports = {knex}