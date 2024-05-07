import 'cypress-xpath';

const email = 'thanhhn@antsomi.com';
const pwd = 'Thanhcong2204!@#'

describe('test segment', () => {

  // before(() => {
  //   cy.login(email, pwd)

  // })

  it('create segment', () => {
    cy.visit('https://cdp.antsomi.com');

    cy.get('input[name=email]').type(email);
    cy.get('input[name=password').type(pwd);

    // Click Sign in
    cy.xpath('//*[@id="ants-tech-login-iam"]/div/form/div/div[3]/button').click();
    cy.wait(5000);

    // Click skip
    cy.xpath('//*[@id="ants-tech-login-iam"]/div/div[1]/div/div[5]').click();
    cy.wait(5000);

    // Select portal sandbox
    cy.xpath('//*[@id="ants-tech-login-iam"]/div/div[1]/div[3]/div/div[1]',{timeout: 2000}).click();
    cy.wait(20000);

    // Click button menu
    cy.xpath('//*[@id="app"]/div/div/div/div[1]/ants-tech-side-navigation/div/button', {timeout: 5000}).should('be.visible').click();

    // Click menu Personas and select Segments
    cy.xpath('//*[@id="app"]/div/div/div/div[1]/ants-tech-side-navigation/div/aside/div[1]/section[2]/div/div/span[1]')
      .contains('Personas')
      .click();
    cy.xpath('//*[@id="app"]/div/div/div/div[1]/ants-tech-side-navigation/div/aside/div[1]/section[2]/div/ul/li[3]/a/div]')
      .contains('Segments')
      .click();

    // Create segment  
    cy.xpath('//*[@id="main-content"]/div[2]/div/div/div/div/div[1]/div/div/div/div/div/div[1]/div[1]/span/div/span').click();
    cy.get('[role="menuitem"][title="Customer Segment"]').click();
    cy.get('[data-testid="account-item"]')
      .contains('160-008-3946')
      .click();
    cy.contains('button', 'Add condition').click();
    cy.get('li[role="menuitem"]').contains('Have attribute').click();
    cy.get('#button-drop-down-lvw3vr5k').click();
    cy.xpath('//*[@id="-1003"]/span').click();
    cy.xpath('//*[@id="lvw3vr5l-customer_id--1003"]/span/span').click();
    cy.xpath('//*[@id="button-drop-down-lvw40rp6"]').click();
    cy.xpath('//*[@id="lvw3vr5n-contains"]/span/span').click();
    cy.get('input[name=text-search]').type('123456789');
    cy.get('//*[@id="scroll-bar"]/div[1]/div/div/div/div[2]/div[8]/button[3]').click();

  })
})  