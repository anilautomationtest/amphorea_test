Feature: Amphora Website UI Validations

  Scenario: Verify all Products pages and signup for the newsletter
    Given I open the Amphora website
    When I hover over the "Products" dropdown
    Then I click on each product and validate the page loads correctly

    When I hover over the "Resources" dropdown
    And I click on "Newsletter"
    And I enter valid email, required info and submit the newsletter form
    Then I should see the confirmation message "Thank you for signing up for our newsletter"
