// Les variables ci-dessous peuvent être utilisées pour vous aider
// dans l'écriture de vos tests
const tomato = "rgb(255, 99, 71)",
  green = "rgb(0, 128, 0)";

describe("test-signup", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8090/");
  });

  it('TF1 : "John Doe" is a valid name', () => {
    cy.get('input[id="first-name-field"]').type("John");
    cy.get('input[id="last-name-field"]').type("Doe");
    cy.get('p[id="validation-name"]').should("have.text", "Welcome John Doe!");
  });

  it('TF2 : "00ab" is an invalid first name', () => {
    cy.get("first-name-field").type("a");
    cy.get("validation-name").should(
      "have.text",
      "At least two characters needed, only letters, spaces, and dashes"
    );
    cy.get("validation-name").should("have.css", "color").and("match", tomato);
  });

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  it('TF2 : "00ab" is an invalid first name', () => {
    cy.get('input[id="first-name-field"]').type("00ab");
    cy.get('p[id="validation-name"]').should("class", "validation invalid");
  });

  it('TF3: "abc@provider." is an invalid e-mail address', () => {
    cy.get('input[id="email-field"]').type("abc@provider.");
    cy.get('p[id="validation-email"]').should("class", "validation invalid");
  });

  it("TF4: a valid field has a green border color and the validation message is green", () => {
    cy.get('input[id="first-name-field"]').type("John");
    cy.get('input[id="last-name-field"]').type("Doe");
    cy.get('input[id="first-name-field"]').should(
      "have.css",
      "border-color",
      green
    );
    cy.get('input[id="last-name-field"]').should(
      "have.css",
      "border-color",
      green
    );
    cy.get('p[id="validation-name"]').should("have.css", "color", green);
  });

  it("TF5: an invalid field has a tomato border color and the validation message is tomato", () => {
    cy.get('input[id="first-name-field"]').type("00ab");
    cy.get('input[id="first-name-field"]').should(
      "have.css",
      "border-color",
      tomato
    );
    cy.get('p[id="validation-name"]').should("have.css", "color", tomato);
  });

  it("TF6 : an email that has not already been used displays a success message", () => {
    cy.get('input[id="email-field"]').type("abc@provider.com");
    cy.get('input[id="email-field"]').blur();
    cy.get('input[id="email-field"]').should("have.css", "border-color", green);
    cy.get('p[id="validation-email"]').should("have.css", "color", green);
    cy.get('p[id="validation-email"]').should(
      "have.text",
      "This email has not already been used"
    );
  });

  it("TF7 : an email that has already been used displays an error message", () => {
    cy.intercept("GET", "/email?email=*", (req) => {
      req.reply({
        presentInDatabase: true,
        msg: "This email has already been used",
      });
    });
    cy.get('input[id="email-field"]').type("abc@provider.com");
    cy.get('input[id="email-field"]').blur();
    cy.get('input[id="email-field"]').should(
      "have.css",
      "border-color",
      tomato
    );
    cy.get('p[id="validation-email"]').should("have.css", "color", tomato);
    cy.get('p[id="validation-email"]').should(
      "have.text",
      "This email has already been used"
    );
  });

  it("TF8 : entering a wrong Captcha displays an error message", () => {
    let op;

    cy.intercept("GET", "http://localhost:8090/capcha", (req) => {
      req.reply((res) => {
        op = res.body.op1 + res.body.op2;
      });
    }).as("getCapcha");

    cy.get('a[id="reload-btn"]').click();

    cy.wait("@getCapcha").then(() => {
      cy.get('input[id="capcha-field"]').type(op + 1);
      cy.get('input[id="capcha-field"]').should(
        "have.css",
        "border-color",
        tomato
      );
      cy.get('p[id="validation-capcha"]').should("have.css", "color", tomato);
      cy.get('p[id="validation-capcha"]').should(
        "have.text",
        "The result is incorrect. Are you a robot?"
      );
    });
  });

  it("TF9 : entering a correct Capcha displays a success message", () => {
    let op;

    cy.intercept("GET", "http://localhost:8090/capcha", (req) => {
      req.reply((res) => {
        op = res.body.op1 + res.body.op2;
      });
    }).as("getCapcha");

    cy.get('a[id="reload-btn"]').click();

    cy.wait("@getCapcha").then(() => {
      cy.get('input[id="capcha-field"]').type(op);
      cy.get('input[id="capcha-field"]').should(
        "have.css",
        "border-color",
        green
      );
      cy.get('p[id="validation-capcha"]').should("have.css", "color", green);
      cy.get('p[id="validation-capcha"]').should("have.text", "Nice work!");
    });
  });

  it("TF10 : adding a programming language creates a new badge", () => {
    cy.get('ul[id="language-list" li[contenteditable="true]').type(
      "JavaScript"
    );
    cy.get('ul[id="language-list" li[contenteditable="true]').type("{tab}");
    cy.get('ul[id="language-list"] li').should("have.text", "JavaScript");
  });

  it("TF11 : entering less than three programming languages displays an error message", () => {});

  it("TF12 : entering three or more programming languages is valid", () => {});

  it("TF13 : the signup form can be validated upon completing all fields", () => {});
});
