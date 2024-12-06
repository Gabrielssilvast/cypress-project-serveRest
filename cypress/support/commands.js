import { faker } from '@faker-js/faker'

Cypress.Commands.add('loginSuccess', () => {
  cy.getUserData().then((data) => {
    cy.get('[data-testid="email"]').type(data.user01.username)
    cy.get('[data-testid="senha"]').type(data.user01.password)
    cy.get('[data-testid="entrar"]').click()

    cy.get('[data-testid="logout"]', { timeout: 10000 }).should('be.visible')
    cy.get('#navbarTogglerDemo01', { timeout: 10000 }).should('be.visible')
  })
})

Cypress.Commands.add('loginInvalid', () => {
  cy.getUserData().then((data) => {
    cy.get('[data-testid="email"]').type(data.user02.username)
    cy.get('[data-testid="senha"]').type(data.user02.password)
    cy.get('[data-testid="entrar"]').click()

    cy.get('.alert', { timeout: 10000 }).should('be.visible')
    cy.get('.alert').contains('Email e/ou senha inválidos')
  })
})

Cypress.Commands.add('registerUser', () => {
  cy.getUserData().then((data) => {
    const user = {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    cy.get('[data-testid="cadastrar"]').click()
    cy.get('[data-testid="nome"]', { timeout: 10000 }).should('be.visible')

    cy.get('[data-testid="nome"]').type(user.name)
    cy.get('[data-testid="email"]').type(user.email)
    cy.get('[data-testid="password"]').type(user.password)

    cy.get('[data-testid="cadastrar"]').click()

    cy.get('[data-testid="logout"]', { timeout: 10000 }).should('be.visible')
    cy.get('#navbarTogglerDemo01', { timeout: 10000 }).should('be.visible')
  })
})

Cypress.Commands.add('registerFormValidation', () => {
  cy.getUserData().then((data) => {
    cy.get('[data-testid="cadastrar"]', { timeout: 10000 })
      .should('be.visible')
      .click()
    cy.get('[data-testid="cadastrar"]', { timeout: 10000 })
      .should('be.visible')
      .click()

    cy.contains('Nome é obrigatório').should('be.visible')
    cy.contains('Email é obrigatório').should('be.visible')
    cy.contains('Password é obrigatório').should('be.visible')
  })
})
