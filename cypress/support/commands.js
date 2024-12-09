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

Cypress.Commands.add('loginEmptyCredentials', () => {
  cy.get('[data-testid="email"]', { timeout: 10000 }).should('be.visible')
  cy.get('[data-testid="senha"]', { timeout: 10000 }).should('be.visible')

  cy.get('[data-testid="entrar"]').click()

  cy.contains('Email é obrigatório', { timeout: 10000 }).should('be.visible')
  cy.contains('Password é obrigatório', { timeout: 10000 }).should('be.visible')
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
  const user = {
    name: faker.internet.username(),
    email: faker.internet.email().replace(/@.+$/, '@meu-dominio.com'),
    password: faker.internet.password(),
  }

  cy.get('[data-testid="cadastrar"]', { timeout: 10000 })
    .should('be.visible')
    .click()

  cy.contains('Cadastro', { timeout: 10000 }).should('be.visible')

  cy.get('[data-testid="nome"]').type(user.name)
  cy.get('[data-testid="email"]').type(user.email)
  cy.get('[data-testid="password"]').type(user.password)

  cy.get('[data-testid="cadastrar"]').click()

  cy.get('[data-testid="logout"]', { timeout: 10000 }).should('be.visible')
  cy.get('#navbarTogglerDemo01', { timeout: 10000 }).should('be.visible')
})

Cypress.Commands.add('registerFormValidating', () => {
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

Cypress.Commands.add('userLogout', () => {
  cy.get('#navbarTogglerDemo01', { timeout: 10000 }).should('be.visible')
  cy.get('[data-testid="logout"]', { timeout: 10000 })
    .should('be.visible')
    .click()
})

Cypress.Commands.add('checkingProductDetails', () => {
  cy.get('[data-testid="product-detail-link"]', { timeout: 10000 })
    .eq(0)
    .should('be.visible')
    .click()

  cy.contains('Detalhes do produto', { timeout: 10000 }).should('be.visible')

  cy.get('.especificacoes > :nth-child(2)').should('not.be.empty')
  cy.get('.especificacoes > :nth-child(3)').should('not.be.empty')
  cy.get('.especificacoes > :nth-child(4)').should('not.be.empty')

  cy.get('[data-testid="adicionarNaLista"]').should('exist')
  cy.get('[data-testid="voltarHome"]').should('exist').click()
})

Cypress.Commands.add('checkingProductList', () => {
  cy.get('[data-testid="pesquisar"]', { timeout: 10000 }).should('exist')
  cy.get('[data-testid="botaoPesquisar"]', { timeout: 10000 }).should('exist')

  cy.get(':nth-child(1) > .card-body > :nth-child(1) > .imagem').should('exist')
  cy.get(':nth-child(1) > .card-body > .card-subtitle.negrito').should('exist')
  cy.get(':nth-child(1) > .card-body > :nth-child(5)').should('not.be.empty')
})

Cypress.Commands.add('checkingNavbar', () => {
  cy.get('#navbarTogglerDemo01', { timeout: 10000 }).should('be.visible')

  cy.get('[data-testid="home"]').should('be.visible')

  cy.get('[data-testid="lista-de-compras"]').click()
  cy.get('h1').contains('Lista de Compras')

  cy.get('[data-testid="carrinho"]').click()
  cy.get('h1').contains('Em construção aguarde')
})

Cypress.Commands.add('addingProduct1', () => {
  cy.get('[data-testid="product-detail-link"]', { timeout: 10000 })
    .eq(0)
    .should('be.visible')
    .click()

  cy.get('[data-testid="adicionarNaLista"]').click()

  cy.get('[data-testid="adicionar carrinho"]', { timeout: 10000 }).should(
    'be.visible'
  )

  cy.get('.card-body > :nth-child(2) > :nth-child(1)')
    .invoke('text')
    .then((text) => {
      const value = parseInt(text.trim(), 10)
      expect(value).to.not.equal(0)
    })

  cy.get('[data-testid="shopping-cart-product-quantity"] > p')
    .invoke('text')
    .then((text) => {
      const value = parseInt(text.trim(), 10)
      expect(value).to.not.equal(0)
    })

  for (let i = 0; i < 4; i++) {
    cy.get('[data-testid="product-increase-quantity"]').click()
  }
  cy.get('[data-testid="product-decrease-quantity"]').click()

  cy.get('[data-testid="limparLista"]').click()

  cy.get('[data-testid="paginaInicial"]').click()
})

Cypress.Commands.add('addingProduct2', () => {
  cy.get('[data-testid="product-detail-link"]', { timeout: 10000 })
    .eq(4)
    .should('be.visible')
    .click()

  cy.get('[data-testid="adicionarNaLista"]').click()

  cy.get('[data-testid="adicionar carrinho"]', { timeout: 10000 }).should(
    'be.visible'
  )

  cy.get('.card-body > :nth-child(2) > :nth-child(1)')
    .invoke('text')
    .then((text) => {
      const value = parseInt(text.trim(), 10)
      expect(value).to.not.equal(0)
    })

  cy.get('[data-testid="shopping-cart-product-quantity"] > p')
    .invoke('text')
    .then((text) => {
      const value = parseInt(text.trim(), 10)
      expect(value).to.not.equal(0)
    })

  for (let i = 0; i < 4; i++) {
    cy.get('[data-testid="product-increase-quantity"]').click()
  }
  cy.get('[data-testid="product-decrease-quantity"]').click()

  cy.get('[data-testid="limparLista"]').click()

  cy.get('[data-testid="paginaInicial"]').click()
})

Cypress.Commands.add('checkingEmptyCart', () => {
  cy.get('[data-testid="lista-de-compras"]', { timeout: 10000 }).click()

  cy.get('[data-testid="shopping-cart-empty-message"]', {
    timeout: 10000,
  }).should('be.visible')

  cy.get('[data-testid="shopping-cart-empty-message"]').contains(
    'Seu carrinho está vazio'
  )
})

Cypress.Commands.add('loginUserAPI', (userLoginData) => {
  cy.api({
    url: 'https://serverest.dev/login',
    method: 'POST',
    body: userLoginData,
    failOnStatusCode: false,
  }).then((response) => {
    return response
  })
})

Cypress.Commands.add('postProdutos', (token, productData) => {
  cy.api({
    url: 'https://serverest.dev/produtos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: productData,
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('getProdutos', (token) => {
  cy.api({
    url: 'https://serverest.dev/produtos',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('postUsuarios', (token, userData) => {
  cy.api({
    url: 'https://serverest.dev/usuarios',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: userData,
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('getUsuarios', (token) => {
  cy.api({
    url: 'https://serverest.dev/usuarios',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    failOnStatusCode: false,
  })
})

Cypress.Commands.add('getCarrinhos', () => {
  cy.api({
    url: 'https://serverest.dev/carrinhos',
    method: 'GET',
    failOnStatusCode: false,
  })
})
