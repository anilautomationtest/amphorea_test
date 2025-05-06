import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import 'cypress-real-events/support';
import { AmphoraSelectors } from '../selectors/selectors';
import { AmphoraActions } from '../AmphoraActions';
import 'cypress-wait-until';

const _selector = new AmphoraSelectors();
const actions = new AmphoraActions();

Given('I open the Amphora website', () => {
  cy.fixture("uitest").then((data) => {
    cy.visit(data.url);
  });
});

When('I hover over the {string} dropdown', (menuName) => {
  if (menuName === "Resources") {
    actions.hoverElement(_selector.resources_menu_name_selector);
  }
  if (menuName === "Products") {
    actions.hoverElement(_selector.product_menu_name_selector);
  }
});

Then('I click on each product and validate the page loads correctly', () => {
  cy.fixture('uitest').then((fixtureData) => {
    const expectedUrls = Object.values(fixtureData.product_urls);
    const homepage = fixtureData.url;

    cy.visit(homepage);

    cy.get(_selector.product_links_selectors).then(($lis) => {
      const totalLinks = $lis.length;

      for (let i = 0; i < totalLinks; i++) {
        actions.hoverElement(_selector.product_menu_name_selector);

        cy.waitUntil(() =>
          cy
            .get(_selector.product_links_selectors)
            .eq(i)
            .find('a')
            .should('be.visible')
        );

        cy.get(_selector.product_links_selectors)
          .eq(i)
          .find('a')
          .then(($a) => {
            const href = $a.attr('href');
            expect(expectedUrls).to.include(href);

            cy.wrap($a)
              .invoke('removeAttr', 'target')
              .then(() => {
                actions.clickElement($a);
              });

            cy.url().should('eq', href);
            cy.visit(homepage);
          });
      }
    });
  });
});

When('I click on "Newsletter"', () => {
  actions.clickElement(_selector.news_letter_selector);
});

When('I enter valid email, required info and submit the newsletter form', () => {
  const randomEmail = `testuser_${Date.now()}@example.com`;

  cy.fixture("uitest").then((data) => {
    actions.enterText(_selector.email_selector, randomEmail);
    actions.enterText(_selector.fname_selector, data.fname);
    actions.enterText(_selector.lname_selector, data.lname);
  });

  actions.clickElement(_selector.submitbtn_selector);
});

Then('I should see the confirmation message {string}', (message) => {
  cy.contains(message).should('be.visible');
});
