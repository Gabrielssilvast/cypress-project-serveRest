describe('Login ServeRest', () => {
  it('Login successfully with valid credentials', () => {
    cy.loginSuccess()
  })

  it('Invalid login', () => {
    cy.loginInvalid()
  })
})
