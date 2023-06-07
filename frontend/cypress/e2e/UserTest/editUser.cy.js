describe("Edit user", () => {
  it("editar el usuario", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");

    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(500);

    cy.get('[data-test="perfil"]').click();
    cy.get('[name="name"]').clear();
    cy.get('[name="name"]').type("name test");
    cy.get('[type="submit"]').contains("Guardar").click();
    cy.wait(300);
    cy.contains("name test");
  });

  it("error campo NAME vacio", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");

    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(500);

    cy.get('[data-test="perfil"]').click();
    cy.get('[name="name"]').clear();
    cy.get('[type="submit"]').contains("Guardar").click();
    cy.wait(300);
    cy.contains("El nombre es obligatorio");
  });

  it("error campo APELLIDO vacio", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");

    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(500);

    cy.get('[data-test="perfil"]').click();
    cy.get('[name="surname"]').clear();
    cy.get('[type="submit"]').contains("Guardar").click();
    cy.wait(300);
    cy.contains("Surname is required");
  });

  it("error campo TELEFONO vacio", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[type="email"]').type("proba@gmail.com");
    cy.get('input[type="password"]').type("12345");

    cy.get('[data-test="boton"]').contains("Inicia sesión").click();
    cy.wait(500);

    cy.get('[data-test="perfil"]').click();
    cy.get('[name="phone"]').clear();
    cy.get('[type="submit"]').contains("Guardar").click();
    cy.wait(300);
    cy.contains("Phone is required");
  });
});
