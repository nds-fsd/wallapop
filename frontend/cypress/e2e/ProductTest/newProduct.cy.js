describe("new Product", () => {
  it("crear nuevos productos", () => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="login"]').click();
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get('[data-test="boton"]').contains("Inicia sesión").click();

    cy.visit("http://localhost:3000/products/newproduct/algo-que-no-utilizo");
    cy.get('[name="title"]').type("producto prueba");
    cy.get('[name="price"]').type("21");
    cy.get('[name="keywords"]').type("keywords");
    cy.get('select[name="category"]').select("Bicicletas");
    cy.get("[name=status]").select("Como nuevo");
    cy.get("[name=description]").type("Aqui va la descripcion del producto");

    // submit the form
    cy.get('[type="submit"]').contains("Subir").click();
    cy.wait(600);

    cy.visit("http://localhost:3000/user/products/published");
    cy.contains("producto prueba");
  });
});
