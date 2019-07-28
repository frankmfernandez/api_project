//const config = require("../config");

module.exports = {
  client: "pg",
  connection: {
    host: "localhost",
    user: process.env.DB_USER || "postgres",
    password: "Abufmf808",
    database: "frankfernandez",
    port: 5433
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations"
  }
};
