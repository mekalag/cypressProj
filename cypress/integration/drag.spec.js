describe('My First Test', () => {

    before(() => {
        cy.visit('/')
        cy.contains('Agree and proceed').click()
        cy.get('#user').type('testuser')
        cy.get('#password').type('Test@1234')
        cy.contains('Log in').click()
    })

    it('finds the content "type"', () => {
        cy.get('.asset-alarms > .resize-handle')
            //.move({ deltaX: 700, deltaY: 700, force: true})
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', {clientX: 700, clientY: 500})
            .trigger('mouseup', {force: true})
        cy.wait(5000)
    })
})

