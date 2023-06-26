describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="login"]').click();
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();

    cy.wait(3000);
    cy.visit("http://localhost:3000/category/Consolas%20y%20Videojuegos");
    cy.get('[data-test="product"]').first().click();

    cy.wait(5000);
    cy.contains("NHL 95");
  });
});
