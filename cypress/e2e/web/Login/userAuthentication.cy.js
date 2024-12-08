describe('Login ServeRest', () => {
  it('Login successfully with valid credentials', () => {
    cy.loginSuccess()

    cy.userLogout()
  })

  it('Login without valid credentials', () => {
    cy.loginInvalid()
  })

  it('Login without filling any credentials', () => {
    cy.loginEmptyCredentials()
  })
})
