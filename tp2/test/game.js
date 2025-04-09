import game from "../games/game.js";
import assert from "assert";
import Chessboard from "../src/chessboard.js";
import Pawn from "../src/pawn.js";

/**
 * From a file number, get the corresponding letter.
 * Rank are 1-indexed.
 * Letters are 97-indexed to get lower-alpha characters.
 * @param {number} file - the file in its number representation.
 * @return {string} returns the file in its string representation.
 */
const convertFileToString = function (file) {
  return String.fromCharCode(97 - 1 + file);
};

describe("Game", function () {
  let chessboard;

  before(function () {
    chessboard = new Chessboard();
    chessboard.init();
  });

  describe("#move and #capture", function () {
    game.forEach((action) => {
      if (action.type === "move") {
        it("Déroulement de la partie", function () {
          const piece = chessboard.getPiece(action.from.rank, action.from.file),
            oracle = {
              correctInstance: true,
              correctColor: action.color,
            };

          assert.equal(piece.color, oracle.correctColor);
          assert.equal(piece instanceof Pawn, oracle.correctInstance);

          const output = piece.canMove(action.to.rank, action.to.file),
            moveOracle = true;

          assert.equal(output, moveOracle);
        });
      } else {
        it("Déroulement de la partie", function () {
          const piece = chessboard.getPiece(action.from.rank, action.from.file),
            oracle = {
              correctInstance: true,
              correctColor: action.color,
            };

          assert.equal(piece.color, oracle.correctColor);
          assert.equal(piece instanceof Pawn, oracle.correctInstance);

          const output = piece.canCapture(action.to.rank, action.to.file),
            captureOracle = true;

          assert.equal(output, captureOracle);
        });
      }
    });
  });
});
