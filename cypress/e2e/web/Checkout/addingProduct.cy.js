describe('Testing the users purchase flow', () => {
  it('Add product to shopping cart', () => {
    cy.registerUser()

    cy.addingProduct1()

    cy.addingProduct2()

    cy.checkingEmptyCart()

    cy.userLogout()
  })
})
