import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
const assert = require('assert');

let api_key;

let requestBody;

let updateBody;


Given('the API endpoint for a petstore is available', function () {
    cy.fixture("apidata").then((data) => {
        this.apiEndpoint = data.endpoint; 
    });
});

When('I send a request to create a pet with the given details {string} {string} {string} {string} {string} {string} {string}', function (petid,petcatid,petcatname,petname,pettagid,pettagname,petstatus) {
    requestBody = {
        id: petid,
        category: {
            id: petcatid,
            name: petcatname,
        },
        name: petname,
        photoUrls: [""],
        tags: [
            {
                id: pettagid,
                name: pettagname,
            },
        ],
        status: petstatus,
    };

    cy.request({
        method: 'POST',
        url: this.apiEndpoint,
        body: requestBody,
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        this.apiResponse = response; 
    });
});

Then('the response status code should be {int}', function (expectedStatusCode) {
    expect(this.apiResponse.status).to.eq(expectedStatusCode);
});

Then('the response should contain the pet ID and details {string} {string} {string} {string} {string} {string} {string}',
     function (petid,petcatid,petcatname,petname,pettagid,pettagname,petstatus) {
    expect(this.apiResponse.body.id.toString()).to.eq(petid);
    expect(this.apiResponse.body.name.toString()).to.eq(petname);
    expect(this.apiResponse.body.category.id.toString()).to.eq(petcatid);
    expect(this.apiResponse.body.category.name.toString()).to.eq(petcatname);
    expect(this.apiResponse.body.tags[0].id.toString()).to.eq(pettagid);
    expect(this.apiResponse.body.tags[0].name.toString()).to.eq(pettagname);
    expect(this.apiResponse.body.status.toString()).to.eq(petstatus);
});

When('I send a request to update the newly created pet with new details {string} {string} {string} {string} {string} {string} {string}', function (petid,petcatid,petcatname,petname,pettagid,pettagname,petstatus) {
    updateBody = {
        id: petid,
        category: {
            id: petcatid,
            name: petcatname,
        },
        name: petname,
        photoUrls: [""],
        tags: [
            {
                id: pettagid,
                name: pettagname, 
            },
        ],
        status: petstatus,
    };


    cy.request({
        method: 'PUT',
        url: this.apiEndpoint,
        body: updateBody,
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        this.updateResponse = response; 
    });
});

Then('the update response status code should be {int}', function (expectedStatusCode) {
    expect(this.updateResponse.status).to.eq(expectedStatusCode);
});

Then('the response should contain the updated pet ID and updated details {string} {string} {string} {string} {string} {string} {string}',
     function (petid,petcatid,petcatname,petname,pettagid,pettagname,petstatus) {
    expect(this.updateResponse.body.id.toString()).to.eq(petid);
    expect(this.updateResponse.body.name.toString()).to.eq(petname);
    expect(this.updateResponse.body.category.id.toString()).to.eq(petcatid);
    expect(this.updateResponse.body.category.name.toString()).to.eq(petcatname);
    expect(this.updateResponse.body.tags[0].id.toString()).to.eq(pettagid);
    expect(this.updateResponse.body.tags[0].name.toString()).to.eq(pettagname);
    expect(this.updateResponse.body.status.toString()).to.eq(petstatus);
});



When('I send a request to read the pet by its ID {string}', function (petid) {
    cy.request({
        method: 'GET',
        url: `${this.apiEndpoint}/${petid}`, 
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        this.readResponse = response; 
    });
});

Then('the response status code for fetch by petid should be {int}', function (expectedStatusCode) {
    expect(this.readResponse.status).to.eq(expectedStatusCode);
});

Then('the response should contain the correct pet details', function () {
    expect(this.readResponse.body).to.have.property('id'); 
    expect(this.readResponse.body).to.have.property('category');
    expect(this.readResponse.body.category).to.have.property('id'); 
    expect(this.readResponse.body.category).to.have.property('name'); 
    expect(this.readResponse.body).to.have.property('name'); 
    expect(this.readResponse.body).to.have.property('photoUrls');
    expect(this.readResponse.body).to.have.property('tags');
    if (this.readResponse.body.tags.length > 0) {
        expect(this.readResponse.body.tags[0]).to.have.property('id'); 
        expect(this.readResponse.body.tags[0]).to.have.property('name'); 
    }
    expect(this.readResponse.body).to.have.property('status'); 
});


Given('I have the API key for authorization', function () {
    cy.fixture("apidata").then((data) => {
        api_key = data.api_key;
    });
});

  When('I send a DELETE request by petid {string}', function (petid) {
    cy.request({
      method: 'DELETE',
      url: `${this.apiEndpoint}/${petid}`, 
      headers: {
        api_key: api_key, 
      },
      failOnStatusCode: false, 
    }).then((response) => {
        this.api_response_delete = response;
    });
  });
  
  Then('the response status code for delete should be {int}', function (statusCode) {
    expect(this.api_response_delete.status).to.eq(statusCode);
  });