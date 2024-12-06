describe('User registration ServeRest', () => {
  it('Validating the registration form', () => {
    cy.registerFormValidation()
  })

  it('Register a new user', () => {
    cy.registerUser()
  })
})
