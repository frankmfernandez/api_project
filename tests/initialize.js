const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "Abufmf808",
    database: "frankfernandez",
    port: 5433
  },
  useNullAsDefault: true
});

const ignoreError = () => {
  // do nothing
};

const clearTable = tableName =>
  knex(tableName)
    .del()
    .catch(ignoreError);

const tables = ["zodiac_table"];

Promise.all(tables.map(clearTable)).then(process.exit);
