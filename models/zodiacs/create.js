const validateZodiacName = zName =>
  typeof zName === "string" && zName.replace(" ", "").length > 3;

module.exports = (knex, Zodiac) => {
  return params => {
    const name = params.name;

    if (!validateZodiacName(name)) {
      return Promise.reject(
        new Error("Name must be provided, and be at least two characters")
      );
    }
    return knex("zodiac_table")
      .insert({ name: name })
      .then(() => {
        return knex("zodiac_table")
          .where({ name: name })
          .select();
      })
      .then(zodiacs => new Zodiac(zodiacs.pop())) // create a user model out of the plain database response
      .catch(err => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That zodiac already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
