# cypressProj

1. Clone this project
2. Install cypress.io 
3. test.js file has the sample test I am trying to run 

Problem : in `Cypress.Commands.overwrite('request', (originalFn, ...args) => {` setting 'X-XSRF-TOKEN': cookie.value, does not work. 

Throws `Error:       TypeError: cookie is null` in console

Whereas if I first set `'X-XSRF-TOKEN': cookie,` and run once it throws valid 401 error. Later I change it to `'X-XSRF-TOKEN': cookie.value,` it works fine.

But if I close and reopen browser, then back to same issue.
