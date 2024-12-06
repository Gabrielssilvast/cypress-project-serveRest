import { faker } from '@faker-js/faker'
import './commands'

let userData

before(() => {
  cy.fixture('userData').then((data) => {
    userData = data
  })
})

beforeEach(() => {
  cy.clearCookies()
    .clearLocalStorage()
    .viewport(1366, 768)
    .visit(Cypress.env('baseUrl'), { timeout: 10000 })
})

Cypress.Commands.add('getUserData', () => {
  return userData
})
