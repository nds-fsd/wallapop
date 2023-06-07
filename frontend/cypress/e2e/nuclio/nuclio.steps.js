import { Given, When } from "cypress-cucumber-preprocessor/steps";

//   SI CONSEGUEIXO FER FUNCINAR CUCUMBER
//   AQUEST TEST SERIA PER COMPROBAR ES LOGIN

Given(/^I go to Nuclio$/, function () {
  cy.visit("http://localhost:3000/login");
});

let scenarioElement;

When(
  /^I type "([^"]*)" in the text input of the (first|second|fourth) example$/,
  //text coge primero match y test depende del segundo
  function (text, test) {
    const translator = {
      //dependiendo de donde haya entrado en test coge una clase o otra
      // first: ".form-group.my-0",
      // second: ".form-group.my-1",
      // fourth: ".alert.alert-danger",
      first: '[type="email"]',
      second: '[type="password"]',
      fourth: ".alert.alert-danger",
    };
    scenarioElement = translator[test];
    cy.get(scenarioElement).type(text);
  }
);

// When(
//   /^I click in the (first|second|next to last) component of the (sixth|ninth) example$/,
//   function (example) {
//     switch (example) {
//       case "first":
//         cy.get('[type="submit"]').click();
//         break;
//     }
//   }
// );

Then(
  /^I click in the (first|second|next to last) component of the (sixth|ninth) example$/,
  function (example) {
    switch (example) {
      case "first":
        cy.get('[data-test="boton"]').click();
        break;
    }
  }
);

Then(/^It contains the "([^"]*)" text$/, function (text) {
  cy.get(".alert").contains(text);
});
