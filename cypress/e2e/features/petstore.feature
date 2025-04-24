Feature: API Testing with Cypress

Scenario Outline: Successfully create a new pet
    Given the API endpoint for a petstore is available
    When I send a request to create a pet with the given details "<petid>" "<petcatid>" "<petcatname>" "<petname>" "<pettagid>" "<pettagname>" "<petstatus>"
    Then the response status code should be 200
    And the response should contain the pet ID and details "<petid>" "<petcatid>" "<petcatname>" "<petname>" "<pettagid>" "<pettagname>" "<petstatus>"
      Examples:
      | petid   | petcatid | petcatname    | petname | pettagid  | pettagname | petstatus |
      | 10122024| 101220241| Test Category | Rockey  | 1012202411|  Test Tag  | available |
      
    

Scenario Outline: Successfully update an existing pet
    Given the API endpoint for a petstore is available
    When I send a request to update the newly created pet with new details "<petid>" "<petcatid>" "<petcatname>" "<petname>" "<pettagid>" "<pettagname>" "<petstatus>"
    Then the update response status code should be 200
    And the response should contain the updated pet ID and updated details "<petid>" "<petcatid>" "<petcatname>" "<petname>" "<pettagid>" "<pettagname>" "<petstatus>"
     Examples:
      | petid   | petcatid | petcatname           | petname | pettagid  | pettagname       | petstatus |
      | 10122024| 101220241| Test Category update | Rockey  | 1012202411|  Test Tag update | available |


Scenario Outline: Successfully read a newly created pet
    Given the API endpoint for a petstore is available
    When I send a request to read the pet by its ID "<petid>"
    Then the response status code for fetch by petid should be 200
    And the response should contain the correct pet details
    Examples:
      | petid   |
      | 10122024| 


Scenario Outline: Successfully delete the newly created pet
    Given the API endpoint for a petstore is available
    And I have the API key for authorization
    When I send a DELETE request by petid "<petid>"
    Then the response status code for delete should be 200
     Examples:
      | petid   |
      | 10122024| 