describe('API User listing validation', () => {
  const userLoginData = {
    email: 'admin@gmail.com',
    password: '123',
  }

  it('Listing of all users and validation of fields', () => {
    cy.loginUserAPI(userLoginData).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('authorization')
      const token = response.body.authorization

      cy.getUsuarios(token).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('usuarios')
        expect(response.body.usuarios).to.be.an('array')
        cy.log('Lista de usuários:', response.body.usuarios)
      })
    })
  })
})
