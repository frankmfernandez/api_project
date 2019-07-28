const { expect, assert } = require("chai");
//const config = require("../config");
const knex = require("knex");
const models = require("../models")(knex);

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("#create", () => {
  let params = { name: "" };

  context("when bad params are given", () => {
    before(() => {
      params = { name: " " };
    });

    it("politely refuses", () =>
      models
        .create(params)
        .then(forcePromiseReject)
        .catch(err =>
          expect(err.message).to.equal(
            "Name must be provided, and be at least two characters"
          )
        ));
  });

  context("when good params are given", () => {
    before(() => {
      params.name = "aries-2";
    });

    afterEach(() => knex("zodiacs").del()); // delete all users after each spec

    it("creates a zodiac", () =>
      models.create(params).then(zodiac => {
        expect(zodiac).to.include({ name: params.name });
        expect(zodiac.name).to.be.a("string");
      }));

    context("when a duplicate zodiac is provided", () => {
      beforeEach(() => models.create(params));

      it("generates a sanitized error message", () =>
        models
          .create(params)
          .then(forcePromiseReject)
          .catch(err =>
            expect(err.message).to.equal("That name already exists")
          ));
    });
  });
});
