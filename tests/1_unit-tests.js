const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

const units = {
  gal: { full: "gallons", return: "L" },
  L: { full: "liters", return: "gal" },
  kg: { full: "kilograms", return: "lbs" },
  lbs: { full: "pounds", return: "kg" },
  mi: { full: "miles", return: "km" },
  km: { full: "kilometers", return: "mi" },
};

let input = [
  "gal",
  "l",
  "mi",
  "km",
  "lbs",
  "kg",
  "GAL",
  "L",
  "MI",
  "KM",
  "LBS",
  "KG",
];
let output = [
  "gal",
  "L",
  "mi",
  "km",
  "lbs",
  "kg",
  "gal",
  "L",
  "mi",
  "km",
  "lbs",
  "kg",
];
let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Unit tests for convertHandler.getInput(input)", () => {
    test("Whole number input", (done) => {
      assert.strictEqual(convertHandler.getNum("20L"), 20);
      done();
    });
    test("Decimal number input", (done) => {
      assert.strictEqual(convertHandler.getNum("20.5L"), 20.5);
      done();
    });
    test("Fractional number input", (done) => {
      assert.strictEqual(convertHandler.getNum("20/5L"), 4);
      done();
    });
    test("Fractional number with Decimal input", (done) => {
      assert.strictEqual(convertHandler.getNum("20.5/5L"), 4.1);
      done();
    });
    test("Fractional number with double fraction input", (done) => {
      assert.strictEqual(convertHandler.getNum("20.5/5/3L"), false);
      done();
    });
    test("No numerical input", (done) => {
      assert.strictEqual(convertHandler.getNum("L"), 1);
      done();
    });
  });

  suite("Tests for convertHandler.getUnit(input)", () => {
    test("Correct reading of valid input unit", (done) => {
      input.forEach((el, i) => {
        assert.strictEqual(convertHandler.getUnit(el), output[i]);
      });
      done();
    });

    test("Correct reading of invalid input unit", (done) => {
      assert.strictEqual(convertHandler.getUnit("20akg"), false);
      done();
    });

    test("Correct return unit of valid input unit", (done) => {
      input.forEach((el, i) => {
        assert.strictEqual(
          convertHandler.getReturnUnit(convertHandler.getUnit(el)),
          units[convertHandler.getUnit(el)].return
        );
      });
      done();
    });

    test("Correct spelled out string for each unit", (done) => {
      input.forEach((el, i) => {
        const unit = convertHandler.getUnit(el);
        assert.strictEqual(convertHandler.spellOutUnit(unit), units[unit].full);
      });
      done();
    });
  });

  suite("Convert Tests", () => {
    test("Convert kg to lbs", (done) => {
      assert.approximately(convertHandler.convert(20, "kg"), 44.09249, 0.01);
      done();
    });
    test("Convert lbs to kg", (done) => {
      assert.approximately(convertHandler.convert(20, "lbs"), 9.07184, 0.01);
      done();
    });
    test("Convert gal to L", (done) => {
      assert.approximately(convertHandler.convert(20, "gal"), 75.7082, 0.01);
      done();
    });
    test("Convert L to gal", (done) => {
      assert.approximately(convertHandler.convert(20, "L"), 5.28344, 0.01);
      done();
    });
    test("Convert mi to km", (done) => {
      assert.approximately(convertHandler.convert(20, "mi"), 32.1868, 0.01);
      done();
    });
    test("Convert km to mi", (done) => {
      assert.approximately(convertHandler.convert(20, "km"), 12.42745, 0.01);
      done();
    });
  });
});
