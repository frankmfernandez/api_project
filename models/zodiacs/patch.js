module.exports = (knex, Zodiac) => {
  return params => {
    const name = params.name;
    const update = params.update.name;

    return knex("zodiac_table")
      .where({ name: name })
      .update({ name: update })
      .then(() => {
        return "this has been changed";
      });
  };
};
