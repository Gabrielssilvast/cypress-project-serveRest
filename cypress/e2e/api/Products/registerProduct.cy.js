import { faker } from '@faker-js/faker'

describe('API Validating the product register', () => {
  const userLoginData = {
    email: 'admin@gmail.com',
    password: '123',
  }
  const productData = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 10, max: 1000 }),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 1000 }),
  }

  it('Register Product with Unique Name', () => {
    cy.loginUserAPI(userLoginData).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('authorization')
      const token = response.body.authorization
      cy.log('Token:', token)

      cy.postProdutos(token, productData).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('_id')
      })
    })
  })

  it('Register Product with Duplicate Name', () => {
    cy.loginUserAPI(userLoginData).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('authorization')
      const token = response.body.authorization
      cy.log('Token:', token)

      cy.postProdutos(token, productData).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.eq('Já existe produto com esse nome')
      })
    })
  })
})
