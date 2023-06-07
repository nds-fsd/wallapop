describe("Delete Product", () => {
  it("eliminar nuevos productos", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="login"]').click();
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(300);

    //Aqui tendria que pasarle productos en un json y eliminar y comprobar algun producto en concreto buscando por el nombre...
    cy.visit("http://localhost:3000/user/products/published");
    cy.get("button > .icon-bin").click();

    cy.visit("http://localhost:3000/user/products/published");
    cy.get('[data-test="productos"] > [data-test="producto"]').should(
      ($lis) => {
        console.log($lis);
        expect($lis).to.have.length(0);
      }
    );
  });
});
