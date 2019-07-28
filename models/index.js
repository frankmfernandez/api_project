//const moment = require("moment");

const Zodiac = function(dbZodiac) {
  this.name = dbZodiac.name;
  this.lead_month = dbZodiac.lead_month;
  this.symbol = dbZodiac.symbol;
  this.trait = dbZodiac.trait;
  this.translation = dbZodiac.translation;
  this.longitude = dbZodiac.longitude;
};

Zodiac.prototype.serialize = function() {
  return {
    name: this.name,
    leadMonth: this.lead_month,
    symbol: this.symbol,
    trait: this.trait,
    translation: this.translation,
    longitude: this.longitude
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Zodiac)
    // list: require("./list")(knex, Zodiac),
  };
};
