describe("Categories", () => {
  it("Carga bien las categorias", () => {
    cy.visit("http://localhost:3000/");

    // open the login modal
    cy.get('[data-test="category"]').contains("Motos").click();
    cy.wait(500);
    cy.contains('[data-test="product"]');
  });
});
