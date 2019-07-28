module.exports = (knex, Zodiac) => {
  return params => {
    const name = params.name;

    return knex("zodiac_table")
      .where({ name: name })
      .select()
      .then(zodiacs => {
        if (zodiacs.length) return new Zodiac(zodiacs.pop());

        throw new Error(`Error finding zodiac ${name}`);
      });
  };
};
