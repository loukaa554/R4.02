// import assert from "node:assert";
import Money from "../src/money.js";
import { assert, expect, should } from "chai";

should();

describe("Money", function () {
  describe("#add()", function () {
    let m1;

    beforeEach(function () {
      m1 = new Money(10.0, "EUR");
    });
    it("should correctly add two moneys with the same currency", function () {
      // Given: two instances of money with the EUR currency
      let m2 = new Money(20.0, "EUR");

      // When: we add the amount of m2 to m1
      m1.add(m2);

      // Then: the new amount of m1 should be 30
      m1.amount.should.equal(30.0);
    });
    it("should correctly add two moneys with the same currency", function () {
      let m2 = new Money(20.0, "EUR");

      m1.add(m2); // Add the amount of m2 up to the amount of m1. m1 est updated.

      let newAmount = m1.amount, // Retrieve the new amount
        oracle = 30.0; // Comparison to the expected result

      // assert.equal(newAmount, oracle);
      expect(newAmount).to.equal(oracle);
      assert.equal(
        newAmount,
        oracle,
        `m1 vaut ${newAmount}€ alors qu'il devrait valoir ${oracle}€`
      );
    });

    it("should correctly add two moneys with different currencies", function () {
      let m2 = new Money(20.0, "USD");

      m1.add(m2); // Add the amount of m2 up to the amount of m1. m1 est updated.

      let newAmount = m1.amount, // Retrieve the new amount
        oracle = 20.0; // Comparison to the expected result

      // assert.equal(newAmount, oracle);
      expect(newAmount).to.equal(oracle);
    });

    it("should throw an exception when the currency is neither EUR nor USD", function () {
      let m2 = new Money(20.0, "BRL"); // BZR : Brazilian real

      // assert.throws(function () {
      //   // On capture l'exception
      //   m1.add(m2);
      // });
      expect(() => m1.add(m2)).to.throw();
    });
  });
});
