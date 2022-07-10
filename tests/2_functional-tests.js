const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Convert Valid Input", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "10L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });

  test("convert invalid input { input: '30g' }", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "30g" })
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.initNum, undefined);
        done();
      });
  });

  test("convert invalid number { input: '31a/12/2kg' }", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "31a/12/2kg" })
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.initNum, undefined);
        done();
      });
  });

  test("convert invalid number and unit { input: '31a/12/2kilos' }", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "31a/12/2kilos" })
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.text, "invalid number and unit");
        done();
      });
  });

  test("Convert input with no number { input: 'L' }", (done) => {
    chai
      .request(server)
      .get("/api/convert")
      .query({ input: "L" })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 0.26417, 0.01);
        assert.equal(res.body.returnUnit, "gal");
        done();
      });
  });
});
