import { convertFileToString, game } from "../../support/e2e.js";

describe("Move a piece on the chessboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8090/web/");
  });

  game
    .filter((move) => move.from && move.to)
    .forEach((move, index) => {
      it(`move ${move.color} piece from ${convertFileToString(move.from.file)}${
        move.from.rank
      } to ${convertFileToString(move.to.file)}${move.to.rank}`, function () {
        cy.get(
          `#chessboard .rank:nth-child(${move.from.rank}) div:nth-child(${move.from.file})`
        ).click();

        cy.get(
          `#chessboard .rank:nth-child(${move.from.rank}) div:nth-child(${move.from.file})`
        ).should("have.class", "active");

        cy.get(
          `#chessboard .rank:nth-child(${move.to.rank}) div:nth-child(${move.to.file})`
        ).click();

        cy.get(
          `#chessboard .rank:nth-child(${move.from.rank}) div:nth-child(${move.from.file})`
        ).should("not.have.class", "active");
      });
    });
});
