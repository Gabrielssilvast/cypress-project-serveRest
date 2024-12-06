Cypress.Commands.add('loginSuccess', () => {
  cy.getUserData().then((data) => {
    cy.get('[data-testid="email"]').type(data.user01.username)
  })
})
