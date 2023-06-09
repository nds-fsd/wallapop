describe("register", () => {
  it("prueba para registrarse", () => {
    cy.visit("http://localhost:3000/register");

    cy.get('[name="name"]').type("mar");
    cy.get('[name="surname"]').type("badia");
    cy.get('input[type="email"]').type("mar.badia2@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get("[name=phone]").type("00000000");
    cy.get("[name=address]").type("Gran via 15");
    cy.get('input[type="date"]').type("1997-01-21");
    cy.get("[name=gender]").select("Femenino");

    cy.get('[value="Regístrate"]').click();
    cy.wait(600);
    cy.contains("FAVORITOS");
  });

  it("Error name", () => {
    cy.visit("http://localhost:3000/register");

    // cy.get('[name="surname"]').type("");
    cy.get('[name="surname"]').type("badia");
    cy.get('input[type="email"]').type("mar.badia@gmail.com");
    cy.get('input[type="password"]').type("12345");
    cy.get("[name=phone]").type("67943540");
    cy.get("[name=address]").type("Gran via 15");
    cy.get('input[type="date"]').type("1997-01-21");
    cy.get("[name=gender]").select("Femenino");

    // submit the form
    cy.get('[value="Regístrate"]').click();
    cy.wait(500);
    cy.contains("El nombre es obligatorio");
  });
});
