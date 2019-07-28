module.exports = function(knex) {
  return {
    zodiacs: require("./zodiacs")(knex)
  };
};
