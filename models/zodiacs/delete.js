module.exports = (knex, Zodiac) => {
  return params => {
    const name = params.name;

    return knex("zodiac_table")
      .where({ name: name })
      .del()
      .then(zodiacs => {
        if (zodiacs === 1) return "It is deleted";
      });
  };
};
