module.exports = (knex, Zodiac) => {
  return () => {
    //   return Promise.resolve(
    return knex("zodiac_table")
      .select()
      .then(zodiacs => {
        return zodiacs.map(zodiac => new Zodiac(zodiac));
        //return users;
      });
    //   ); // fix me!
  };
};
