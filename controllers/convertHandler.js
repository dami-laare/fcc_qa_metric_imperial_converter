const units = {
  gal: { full: "gallon", return: "L" },
  L: { full: "liter", return: "gal" },
  kg: { full: "kilogram", return: "lbs" },
  lbs: { full: "pound", return: "kg" },
  mi: { full: "mile", return: "km" },
  km: { full: "kilometer", return: "mi" },
};

function ConvertHandler() {
  this.getNum = function (input) {
    let result;

    if (/[a-zA-Z]/.test(input[0])) {
      return false;
    }

    result = input.slice(0, input.search(/[a-zA-Z]/));

    if (/[0-9]/.test(input.slice(input.search(/[a-zA-Z]/), input.length))) {
      return false;
    }
    if (result.indexOf("/") > 0) {
      const arr = result.split("/");
      if (!/\d/.test(arr[1])) {
        return false;
      }

      if (!Number(arr[0])) {
        return false;
      }

      if (!Number(arr[1])) {
        return false;
      }

      const resultStandard = Number(arr[0]) / Number(arr[1]);

      if (resultStandard) {
        result = resultStandard;
      } else {
        return false;
      }
    }

    return Number(result);
  };

  this.getUnit = function (input) {
    let result;

    result = input.slice(input.search(/[a-zA-Z]/), input.length);

    if (/[0-9_\W]/.test(result)) {
      let iteration = 0;
      iteration++;
      while (/[0-9_\W]/.test(result)) {
        let firstDigitIndex = result.search(/[0-9_\W]/);

        result = result
          .split("")
          .slice(firstDigitIndex + 1, result.length)
          .join("");

        iteration++;
      }

      if (Object.keys(units).indexOf(result) < 0) {
        return false;
      }
      return true;
    }
    if (Object.keys(units).indexOf(result) < 0) {
      return false;
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    result = units[initUnit].return;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    result = units[unit].full;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "kg":
        result = initNum / lbsToKg;
        return Number(result.toFixed(5));
      case "lbs":
        result = initNum * lbsToKg;
        return Number(result.toFixed(5));
      case "gal":
        result = initNum * galToL;
        return Number(result.toFixed(5));
      case "L":
        result = initNum / galToL;
        return Number(result.toFixed(5));
      case "mi":
        result = initNum * miToKm;
        return Number(result.toFixed(5));
      case "km":
        result = initNum / miToKm;
        return Number(result.toFixed(5));
      default:
        return initUnit;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${
      initNum !== 1 ? `${units[initUnit].full}s` : units[initUnit].full
    } converts to ${returnNum} ${
      returnNum !== 1
        ? `${units[units[initUnit].return].full}s`
        : units[units[initUnit].return].full
    } `;
    return result;
  };
}

module.exports = ConvertHandler;
