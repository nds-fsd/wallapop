describe("edit Product", () => {
  it("editar productos", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="login"]').click();
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(300);

    //Aqui tendria que pasarle productos en un json y eliminar y comprobar algun producto en concreto buscando por el nombre...
    cy.visit("http://localhost:3000/user/products/published");
    cy.get("button > .icon-pen1").click();

    cy.get('[name="title"]').clear();
    cy.get('[name="title"]').type("ORBEA ALMA M50 (2021)");
    cy.get('[name="price"]').clear();
    cy.get('[name="price"]').type("1290");

    // submit the form
    cy.get('[type="submit"]').contains("Guardar").click();
    cy.wait(500);

    cy.visit("http://localhost:3000/user/products/published");
    cy.contains("ORBEA ALMA M50 (2021)");
  });
});