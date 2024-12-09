import { faker } from '@faker-js/faker'

describe('API - User Registration', () => {
  const userLoginData = {
    email: 'admin@gmail.com',
    password: '123',
  }

  const userData = {
    nome: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 5 }),
    administrador: 'true',
  }

  it('Register a user successfully', () => {
    cy.loginUserAPI(userLoginData).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('authorization')
      const token = response.body.authorization

      cy.postUsuarios(token, userData).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        expect(response.body).to.have.property('_id')
      })
    })
  })

  it('User registration with previously used e-mail', () => {
    cy.loginUserAPI(userLoginData).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('authorization')
      const token = response.body.authorization

      cy.postUsuarios(token, userData).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.eq('Este email já está sendo usado')
      })
    })
  })
})
