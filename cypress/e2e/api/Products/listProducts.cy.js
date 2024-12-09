describe('API Validating the product listing', () => {
  const userLoginData = {
    email: 'admin@gmail.com',
    password: '123',
  }

  it('List products and validate the expected fields', () => {
    cy.loginUserAPI(userLoginData).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('authorization')
      const token = response.body.authorization
      cy.log('Token:', token)

      cy.getProdutos(token).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('quantidade')
        expect(response.body.produtos).to.be.an('array')
        expect(response.body.produtos.length).to.be.greaterThan(0)

        response.body.produtos.forEach((produto) => {
          expect(produto).to.have.property('_id')
          expect(produto).to.have.property('nome')
          expect(produto).to.have.property('preco')
          expect(produto).to.have.property('descricao')
          expect(produto).to.have.property('quantidade')

          expect(produto.nome).to.be.a('string')
          expect(produto.preco).to.be.a('number')
          expect(produto.descricao).to.be.a('string')
          expect(produto.quantidade).to.be.a('number')
        })
      })
    })
  })
})
