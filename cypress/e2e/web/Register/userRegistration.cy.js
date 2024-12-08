describe('User registration screen ServeRest', () => {
  it('Validating the registration form fields', () => {
    cy.registerFormValidating()
  })

  it('Register a new user', () => {
    cy.registerUser()

    cy.userLogout()
  })
})
