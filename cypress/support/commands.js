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
// Cypress.Commands.add('login', (email, password) => { ... })
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

Cypress.Commands.add('getTenantId', (username, password) => {
  cy.request({
    method: 'GET',
    url: '/tenant/currentTenant',
    auth: {
      username,
      password,
    },
  }).then((response) => response.body.name);
});

Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => cy.getTenantId(username, password)
    .then((tenantId) => {
      cy.request({
        method: 'POST',
        url: `/tenant/oauth?tenant_id=${tenantId}`,
        body: { grant_type: 'PASSWORD', username, password, tfa_code: undefined },
        form: true
      });
    }));
});

Cypress.Commands.overwrite('request', (originalFn, ...args) => {
  cy.getCookie('XSRF-TOKEN')
    .then((cookie) => {
      const defaults = {
        headers: {
          'X-XSRF-TOKEN': cookie.value,
          'Content-Type': 'application/json'
        }
      };
      let options = {};
      if (Cypress._.isObject(args[0])) {
        options = Object.assign({}, args[0]);
      } else if (args.length === 1) {
        [options.url] = args;
      } else if (args.length === 2) {
        [options.url, options.method] = args;
      } else if (args.length === 3) {
        [options.url, options.method, options.body] = args;
      }
      return originalFn(Object.assign({}, defaults, options));
    });
})
