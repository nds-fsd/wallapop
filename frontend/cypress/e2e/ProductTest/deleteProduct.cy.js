describe("Delete Product", () => {
  it("eliminar nuevos productos", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="login"]').click();
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(300);

    //vamos a la ventana de donde esta la lista de productos del user
    cy.visit("http://localhost:3000/user/products/published");
    // Entonces buscmaos el producto por el titulo
    cy.get(
      '[data-test="productos"] > [data-test="producto"] > div h4[class*="title"]'
    )
      .contains("producto prueba") // titulo del producto
      .parents('[data-test="producto"]')
      .find("button>span.icon-bin")
      .click();
  });
});
