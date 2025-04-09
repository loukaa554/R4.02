import assert from "node:assert";
import levenshtein from "../src/levenshtein.js";
import { expect } from "chai";

describe("#levenshtein()", function () {
  it("La distance de levenshtein entre 'niche' et 'chiens' est de 5", function () {
    assert.equal(levenshtein("niche", "chiens").distance, 5);
  });

  it("La distance de levenshtein entre 'chiens' et 'niche' est de 5", function () {
    assert.equal(levenshtein("chiens", "niche").distance, 5);
  });

  it("La distance de levenshtein entre 'niche' et '' est de 5", function () {
    assert.equal(levenshtein("niche", "").distance, 5);
  });

  it("La distance de levenshtein entre 'niche' et 'chiens' est identique", function () {
    assert.equal(
      levenshtein("niche", "chien").distance,
      levenshtein("chien", "niche").distance
    );
  });

  it("La distance de levenshtein entre une chaine vide et une chaine non vide", function () {
    assert.equal(levenshtein("", "chien").distance, 5);
  });

  it("Vérification que des entrées invalides lèvent des exceptions", function () {
    expect(() => levenshtein(1, "chien")).to.throw();
    expect(() => levenshtein("chien", 1)).to.throw();
  });
});
