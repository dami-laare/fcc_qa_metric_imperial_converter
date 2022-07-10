"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res, next) => {
    const { input } = req.query;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const speltUnit = convertHandler.spellOutUnit(initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    if (!initUnit && !initNum) {
      return res.status(200).send("invalid number and unit");
    }

    if (!initNum || !initUnit) {
      return res.status(200).send(`invalid ${!number ? "number" : "unit"}`);
    }

    res.status(200).json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};
