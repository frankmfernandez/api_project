const knex = require("knex");

const ignoreError = () => {
  // do nothing
};

const clearTable = tableName =>
  knex(tableName)
    .del()
    .catch(ignoreError);

const tables = ["zodiac_table"];

Promise.all(tables.map(clearTable)).then(process.exit);
