describe('My First Test', () => {

    before(() => {
        cy.visit(Cypress.env('baseUrl'))
        cy.contains('Agree and proceed').click()
        //cy.wait(10000)
        //cy.clearCookies()
        cy.get('#user').type('testuser')
        cy.get('#password').type('Test@1234')
        cy.contains('Log in').click()
    })
    

    it('finds the content "type"', () => {
        cy.get('#page-toolbar').contains('Add widget').click()
        cy.contains('li', 'Add widget').click()
        cy.wait(2000)
        cy.get('[placeholder="Search…"]').type('Applications')
        cy.contains('Applications').click()
        cy.contains('Save').click({force: true})
        //y = cy.get('#cdk-drop-list-1').getYcoordinate();
        cy.get('.applications > .cdk-drag')
            //.move({ deltaX: 700, deltaY: 700, force: true})
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', {clientX: 700, clientY: 500})
            .trigger('mouseup', {force: true})
        cy.wait(10000)
        cy.get('.applications .btnIcon').click()
        cy.get('[title="Remove widget"]').click()

    })
})

