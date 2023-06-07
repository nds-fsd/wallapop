describe("login", () => {
  it("user should be able to log in", () => {
    cy.visit("http://localhost:3000/");

    // open the login modal
    cy.get('[data-test="login"]').click();

    // fill in the form
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");

    // submit the form
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(500);
    cy.contains("FAVORITOS");
  });

  it("user should be able to log in", () => {
    cy.visit("http://localhost:3000/");

    // open the login modal
    cy.get('[data-test="login"]').click();

    // fill in the form
    cy.get('input[type="email"]').type("probaproba@gmail.com");
    cy.get('input[type="password"]').type("12345");

    // submit the form
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(500);
    cy.contains("Inicia sesión");
  });
});
