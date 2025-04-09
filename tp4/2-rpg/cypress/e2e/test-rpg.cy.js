describe("test-rpg", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8090/");
  });

  it("TF1 : le personnage doit se trouver sur la tuile (2, 1)", function () {
    cy.get("#character").then((character) => {
      // On introduit manuellement un délai
      cy.wait(200);

      // On récupère la tuile positionnée à la rangée 2 et colonne 1, puis
      cy.get("#map .row:nth-child(2) .tile:nth-child(1)").then((tile) => {
        // On vérifie que la position du personnage correspond exactement
        // à la position de la tuile
        expect(character[0].getBoundingClientRect()).deep.equal(
          tile[0].getBoundingClientRect()
        );
      });
    });
  });

  it("TF2 : Édition du nom du personnage", function () {
    cy.get("button[id='edit-btn']").click();
    cy.get("#edit-modal").should("be.visible");
    cy.get("input[id='name-input'").type("Test");
    cy.get("button[id='save-btn']").click({ waitForAnimations: false });
    cy.get("#edit-modal a").click({ waitForAnimations: false });
    cy.get("#edit-modal").should("have.class", "hide");
    cy.get("#name-output").should("contain", "Test");
  });

  it("TF3 : (Dés-)attribution de points", function () {
    cy.get("#attack button[id='edit-character-btn']").last().click();
    cy.get("#attack #attack-output").should("contain", "1");
    cy.get("#points-output").should("contain", "4");
    cy.get("#attack button[id='edit-character-btn']").first().click();
    cy.get("#attack #attack-output").should("contain", "0");
    cy.get("#points-output").should("contain", "5");
  });

  it("TF4 : Attribution de points au delà de la limite", function () {
    cy.get("#attack button[id='edit-character-btn']").last().click();
    cy.get("#attack button[id='edit-character-btn']").last().click();
    cy.get("#attack button[id='edit-character-btn']").last().click();
    cy.get("#attack button[id='edit-character-btn']").last().click();
    cy.get("#attack button[id='edit-character-btn']").last().click();
    cy.get("#attack button[id='edit-character-btn']")
      .last()
      .should("be.disabled");
  });

  it("TF5 : Déplacement du personnage", function () {
    cy.get('.tile[data-row="2"][data-col="5"]').then((tile) => {
      const left = tile[0].getBoundingClientRect().left;
      const top = tile[0].getBoundingClientRect().top;
      cy.wrap(tile).click();
      cy.wait(1000);
      cy.get("#character").then((character) => {
        expect(character[0].getBoundingClientRect().left).to.equal(left);
        expect(character[0].getBoundingClientRect().top).to.equal(top);
      });
    });
  });

  it("TF6 : (non-)déplacement du personnage dans l'océan", function () {
    cy.get('.tile[data-row="9"][data-col="5"]').then((tile) => {
      const left = tile[0].getBoundingClientRect().left;
      const top = tile[0].getBoundingClientRect().top;
      cy.wrap(tile).click();
      cy.wait(1000);
      cy.get("#character").then((character) => {
        expect(character[0].getBoundingClientRect().left).not.to.equal(left);
        expect(character[0].getBoundingClientRect().top).not.to.equal(top);
      });
    });
  });

  it.only("TF7 : (non-)déplacement du personnage sur une tuile prairie non accessible", function () {
    cy.get('.tile[data-row="8"][data-col="2"]').then((tile) => {
      const left = tile[0].getBoundingClientRect().left;
      const top = tile[0].getBoundingClientRect().top;
      cy.wrap(tile).click();
      cy.wait(1000);
      cy.get("#character").then((character) => {
        expect(character[0].getBoundingClientRect().left).not.to.equal(left);
        expect(character[0].getBoundingClientRect().top).not.to.equal(top);
      });
    });
  });
});
