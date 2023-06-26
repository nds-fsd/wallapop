describe("Categories", () => {
  it("Carga bien las categorias", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="category"]').contains("Consolas y Videojuegos").click();
    cy.wait(300);
    cy.contains("NHL 95 - Snes");
  });
});

// describe("Product detail", () => {
//   it("Carga producto desde lista de categorias", () => {
//     cy.visit("http://localhost:3000/");

//     // open the login modal
//     cy.get('[data-test="category"]').contains("Motos").click();
//     cy.wait(300);
//     cy.get('[data-test="product"]').contains("HONDA CBR 600F").click();
//     cy.wait(300);
//     cy.contains("COMPRAR");
//   });
// });
