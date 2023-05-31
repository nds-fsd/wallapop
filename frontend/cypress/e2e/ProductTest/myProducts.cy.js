describe("Product", () => {
  it("comprobar que tenemos mas de un producto", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="login"]').click();
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();

    cy.wait(300);

    cy.visit("http://localhost:3000/user/products/published");
    // cy.get('[data-test="producto"]').to.have.length(1);

    cy.get('[data-test="productos"] > [data-test="producto"]').should(
      ($lis) => {
        console.log($lis);
        expect($lis).to.have.length(1);
      }
    );
  });
});
