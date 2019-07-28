exports.up = function(knex, Promise) {
  // create the 'users' table with three columns
  return knex.schema.createTable("zodiac_table", t => {
    t.string("name") // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    t.string("trait")
      .unique()
      .notNullable();

    t.string("translation")
      .unique()
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("zodiac_table");
};
