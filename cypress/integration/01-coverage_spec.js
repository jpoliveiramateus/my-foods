/// <reference types="cypress" />

const { getId } = require('../utils/getId');

describe('1 - Desenvolva os testes unitários de maneira que a cobertura seja de, no mínimo, 90%', () => {
  it('Verifica a cobertura de 90% da aplicação total', () => {
    cy.task('getCoverage', getId()).its('total.branches.pct').should('be.gte', 90.00);
  });
});
