describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="login"]').click();
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();

    cy.wait(3000);
    cy.get("button .icon-heart1").first().click();

    cy.wait(3000);
    cy.visit("http://localhost:3000/user/favorites");
    cy.contains("jmhngbfc");
  });
});
