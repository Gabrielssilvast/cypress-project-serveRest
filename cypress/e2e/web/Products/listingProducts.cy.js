describe('Checking product field list', () => {
  it('Validation on product list', () => {
    cy.registerUser()

    cy.checkingProductList()

    cy.userLogout()
  })

  it('Validation Navbar Menu', () => {
    cy.registerUser()

    cy.checkingNavbar()

    cy.userLogout()
  })
})
