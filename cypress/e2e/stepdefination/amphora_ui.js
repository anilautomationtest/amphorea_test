import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import 'cypress-real-events/support';

Given('I open the Amphora website', () => {
  cy.viewport(1440, 900); // Desktop viewport
  cy.fixture("uitest").then((data) => {
    cy.visit(data.url);
  });
});

When('I hover over the {string} dropdown', (menuName) => {
  cy.get('nav').contains('a', menuName).first().trigger('mouseover');
  cy.wait(500);
});

Then('I click on each product and validate the page loads correctly', () => {

  cy.get('#menu-item-32 > a').realHover(); 
  

    cy.fixture("uitest").then((data) => {
     
    cy.get('#menu-item-32 > .sub-menu')
      .should('be.visible')
      .find('a')
      .then(($links) => {
        const urls = [];
  
        $links.each((_, el) => {
          const href = el.getAttribute('href');
          if (href && href.startsWith(data.url)) {
            urls.push(href);
          }
        });
  
        cy.wrap(urls).each((url) => {
          cy.visit(url);
          cy.get('h1, h2').first().should('be.visible');
          cy.go('back');
          cy.wait(500);
  
          cy.get('#menu-item-32 > a').realHover();
        });
      })

    
    });

  });
  

When('I hover over the "Resources" dropdown', () => {
  cy.get('nav').contains('a', 'Resources').first().trigger('mouseover');
  cy.wait(500);
});

When('I click on "Newsletter"', () => {
    cy.get('#menu-item-456').invoke('show'); 
    cy.get('#menu-item-511 > a').click({ force: true });
  });
  

  When('I enter valid email, required info and submit the newsletter form', () => {
    const randomEmail = `testuser_${Date.now()}@example.com`;
  
    cy.fixture("uitest").then((data) => {

    cy.get('input[name="contact[email]"]').type(randomEmail);
  
    cy.get('input[name="contact[first_name]"]').type(data.fname);
  
    cy.get('input[name="contact[last_name]"]').type(data.lname);
  });
    cy.get('button.fserv-button-submit').click();
  });
  

Then('I should see the confirmation message {string}', (message) => {
  cy.contains(message).should('be.visible');
});
