describe('Checking product details', () => {
  it('Validation of product fields', () => {
    cy.registerUser()

    cy.checkingProductDetails()

    cy.userLogout()
  })
})
