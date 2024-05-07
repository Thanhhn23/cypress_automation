// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => { 
    cy.visit('https://cdp.antsomi.com');

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password').type(password)
    cy.xpath('//*[@id="ants-tech-login-iam"]/div/form/div/div[3]/button').click();
    cy.xpath('//*[@id="ants-tech-login-iam"]/div/div[1]/div/div[5]').click();
    cy.get('div._1Iesb3B2FbgmyVKWVV038f')
    .contains('ANTSOMI Shopping')
    .click({ timeout: 2000 });
    cy.wait(10000);


 })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })