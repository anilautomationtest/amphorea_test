// cypress/support/actions/AmphoraActions.js

import 'cypress-real-events/support';

export class AmphoraActions {
 
  clickElement(selector, forceClick = false) {
    if (forceClick) {
      cy.get(selector).click({ force: true });
    } else {
      cy.get(selector).click();
    }
  }


  enterText(selector, text) {
    cy.get(selector).clear().type(text);
  }

  
  hoverElement(selector) {
    cy.get(selector).realHover();
  }
}
