'use strict';

describe('Tests for device events', () => {
  const deviceObj = {
    name: 'e2eDeviceToTestEvents',
    c8y_IsDevice: {}
  };

  beforeEach(() => {
    cy.login(Cypress.env('username'), Cypress.env('password'));
    cy.visit('/');
    cy.get('.c8y-ui-title > .text-truncate', { timeout: 10000 }).should('be.visible');
    cy.request('/inventory/managedObjects', 'POST', deviceObj);
  });

  it('"No events to display" message should be displayed when there are no events', () => {
    cy.getDeviceIdByName(deviceObj.name)
      .then((deviceId) => {
        cy.visit(`/apps/devicemanagement/index.html#/device/${deviceId}/events`);
        cy.get('.page-tabs-vertical', { timeout: 10000 }).should('be.visible');
        cy.contains('No events to display.').should('be.visible');
      });
  });

})
