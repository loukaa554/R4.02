describe("test-login", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("http://localhost:8090/");
  });

  it("TF1 : it is possible to log in", () => {
    cy.get('input[id="email-field"]').type("louka@louka.com");
    cy.get('input[id="password-field"]').type("louka");
    cy.get('button[id="login-btn"]').should("not.be.disabled");
    cy.get('button[id="login-btn"]').click();
    cy.wait(500).then(() => {
      cy.get("#welcome-modal").should("exist").and("not.have.class", "hide");
    });
  });

  it("TF2 : a confirmation code is required", () => {
    const email = "louka@louka.com";
    cy.get('input[id="email-field"]').type(email);
    cy.get('input[id="password-field"]').type("louka");
    cy.intercept("GET", "http://localhost:8090/verification", (req) => {
      req.reply((res) => {
        res.body = { trusted: false, ip: "192.0.0.0", email, name: "Louka" };
      });
    });
    cy.get('button[id="login-btn"]').click();
    cy.get("#confirm-modal").should("exist").and("not.have.class", "hide");
  });

  it("TF3 : a confirmation code is incorrectly entered", () => {
    const email = "louka@louka.com";
    cy.get('input[id="email-field"]').type(email);
    cy.get('input[id="password-field"]').type("louka");
    cy.intercept("GET", "http://localhost:8090/verification", (req) => {
      req.reply((res) => {
        res.body = { trusted: false, ip: "192.0.0.0", email, name: "Louka" };
      });
    });
    cy.get('button[id="login-btn"]').click();
    cy.get("#confirm-modal").should("exist").and("not.have.class", "hide");
    cy.get("#code-group input").each((input, index) => {
      cy.wrap(input).type("abc").should("have.value", "");
    });
  });

  it("TF4 : a confirmation code is correctly entered", () => {
    const email = "louka@louka.com";
    cy.get('input[id="email-field"]').type(email);
    cy.get('input[id="password-field"]').type("louka");
    cy.intercept("GET", "http://localhost:8090/verification", (req) => {
      req.reply((res) => {
        res.body = { trusted: false, ip: "192.0.0.0", email, name: "Louka" };
      });
    });
    cy.get('button[id="login-btn"]').click();
    cy.get("#confirm-modal").should("exist").and("not.have.class", "hide");
    cy.get("#code-group input").first().type("1").should("have.value", "1");
    cy.get("#code-group input").eq(1).should("have.focus");
    cy.get("#code-group input").each((input, index) => {
      if (index !== 0) {
        cy.wrap(input).type("1").should("have.value", "1");
      }
    });
    cy.get('button[id="confirm-btn"]').should("not.be.disabled");
  });

  it("TF5 : no confirmation e-mail has been received", () => {
    const email = "louka@louka.com";
    cy.get('input[id="email-field"]').type(email);
    cy.get('input[id="password-field"]').type("louka");
    cy.intercept("GET", "http://localhost:8090/verification", (req) => {
      req.reply((res) => {
        res.body = { trusted: false, ip: "192.0.0.0", email, name: "Louka" };
      });
    });
    cy.get('button[id="login-btn"]').click();
    cy.get("#confirm-modal").should("exist").and("not.have.class", "hide");
    cy.tick(51000);
    cy.get('button[id="send-again-btn"]').should("not.be.disabled");
    cy.get('button[id="send-again-btn"]').click();
  });

  it.only("TF6 : a confirmation code has been sent again", () => {
    const email = "louka@louka.com";
    cy.get('input[id="email-field"]').type(email);
    cy.get('input[id="password-field"]').type("louka");
    cy.intercept("GET", "http://localhost:8090/verification", (req) => {
      req.reply((res) => {
        res.body = { trusted: false, ip: "192.0.0.0", email, name: "Louka" };
      });
    });
    cy.get('button[id="login-btn"]').click();
    cy.get("#confirm-modal").should("exist").and("not.have.class", "hide");
    cy.get("#code-group input").first().type("1").should("have.value", "1");
    cy.tick(51000);
    cy.get('button[id="send-again-btn"]').should("not.be.disabled");
    cy.get('button[id="send-again-btn"]').click();
    cy.get("#code-group input").each((input, index) => {
      cy.wrap(input).should("have.value", "");
    });
    cy.get("#remaining-seconds-output").should("have.text", "50");
  });
});
