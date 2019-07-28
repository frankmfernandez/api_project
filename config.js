module.exports = {
  // database connection configs
  // You might want to update this
  db: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "Abufmf808",
      database: "frankfernandez2",
      port: 5433
    }
  },

  // port for server to run on
  express: {
    port: 3000
  },

  // timestamp format for our logs
  logger: {
    format: "dddd MMMM Do YYYY, h:mm:ss a"
  }
};
