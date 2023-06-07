describe("Categories", () => {
  it("Carga bien las categorias", () => {
    cy.visit("http://localhost:3000/");

    // open the login modal
    cy.get('[data-test="category"]').contains("Motos").click();
    cy.wait(300);
    cy.contains("HONDA CBR 600F");
  });
});

describe("Product detail", () => {
  it("Carga producto desde lista de categorias", () => {
    cy.visit("http://localhost:3000/");

    // open the login modal
    cy.get('[data-test="category"]').contains("Motos").click();
    cy.wait(300);
    cy.get('[data-test="product"]').contains("HONDA CBR 600F").click();
    cy.wait(300);
    cy.contains("COMPRAR");
  });
});
