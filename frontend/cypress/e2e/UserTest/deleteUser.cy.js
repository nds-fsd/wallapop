describe("delete user", () => {
  it("eliminar usuario", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[type="email"]').type("mar.badia2@gmail.com");
    cy.get('input[type="password"]').type("12345");

    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(500);

    cy.get('[data-test="perfil"]').click();
    cy.get('[type="submit"]').contains("Eliminar").click();
    cy.wait(500);
    cy.visit("http://localhost:3000/login");

    // cy.contains("Estás a punto de borrar este producto. ¿Deseas continuar?");
    // cy.get("button").contains("Aceptar").click();
    cy.contains("Inicia sesión");

  });
});
