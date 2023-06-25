describe("edit Product", () => {
  it("editar productos", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="login"]').click();
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(2000);

    //Aqui tendria que pasarle productos en un json y eliminar y comprobar algun producto en concreto buscando por el nombre...
    cy.visit("http://localhost:3000/user/products/published");
    cy.get(
      '[data-test="productos"] > [data-test="producto"] > div h4[class*="title"]'
    )
      .contains("producto prueba") // Selecciona el segundo elemento (índice 1)
      .parents('[data-test="producto"]')
      .find("button>span.icon-pen1")
      .click();

    cy.wait(5000);

    // Realiza las comprobaciones necesarias para verificar que el título se ha actualizado correctamente
    // Puedes utilizar cy.contains() para buscar el nuevo título en la página

    cy.get('input[data-test="product-title-else"]')
      .clear({ force: true })
      .type("hola");
    // cy.get('[data-test="product-title"]').type("ORBEA ALMA M50 (2021)");
    // cy.get('[name="price"]').clear();
    // cy.get('[name="price"]').clear().type("1290");
    // cy.get('[data-test="product-title"]').clear().type("ORBEA ALMA M50 (2021)");

    // submit the form
    cy.get('[type="submit"]').contains("Guardar cambios").click();
    cy.wait(500);

    // cy.visit("http://localhost:3000/user/products/published");
    // cy.contains("Producto guardado exitosamente").should("be.visible");
    cy.contains("ORBEA ALMA M50 (2021)");
  });
});

// // Submit the form and wait for success message
// cy.get('[type="submit"]').contains("Guardar").click();
// cy.contains("Producto guardado exitosamente").should("be.visible");

// // Verify that the edited product appears in the product list
// cy.visit("http://localhost:3000/user/products/published");
// cy.contains("ORBEA ALMA M50 (2021)").should("be.visible");
