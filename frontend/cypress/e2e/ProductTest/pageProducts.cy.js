describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="login"]').click();
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();

    cy.wait(300);

    cy.get('[class*="cardsContainer"] > [class*="card"]> div p[class*="title"]')
      .contains("jmhngbfc")
      .find('[data-test="card_prod"]>span.icon-eye1')
      .click();

    cy.wait(2000);
    cy.contains("Columna jbl");
  });
});

// Comprobar al apretar un product et dirigeix a la pagina des producte
// amb totes ses dades cargades
