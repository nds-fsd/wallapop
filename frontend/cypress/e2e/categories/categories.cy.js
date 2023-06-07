describe("Categories", () => {
  it("Carga bien las categorias", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-test="category"]').contains("Motos");
  });
});
