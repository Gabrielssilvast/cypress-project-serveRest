describe('API - List shopping carts', () => {
  it('List all registered carts', () => {
    cy.getCarrinhos().then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('quantidade')
      expect(response.body).to.have.property('carrinhos')
      expect(response.body.carrinhos).to.be.an('array')

      if (response.body.quantidade > 0) {
        response.body.carrinhos.forEach((carrinho) => {
          expect(carrinho).to.have.property('_id')
          expect(carrinho).to.have.property('precoTotal')
          expect(carrinho).to.have.property('quantidadeTotal')
          expect(carrinho).to.have.property('idUsuario')
          expect(carrinho).to.have.property('produtos')
        })
      }
    })
  })
})
