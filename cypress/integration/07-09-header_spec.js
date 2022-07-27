/// <reference types="cypress" />

const { getId } = require('../utils/getId');


describe('7 - Implemente o header de acordo com a necessidade de cada tela', () => {
  const hasNoHeader = () => {
    cy.get('[data-testid="profile-top-btn"]').should('not.exist');
    cy.get('[data-testid="page-title"]').should('not.exist');
    cy.get('[data-testid="search-top-btn"]').should('not.exist');
  };

  const hasHeader = (title, withSearchButton = true) => {
    cy.get('[data-testid="profile-top-btn"]')
      .should('have.attr', 'src')
      .should('include', 'profileIcon');

    cy.get('[data-testid="page-title"]').contains(title);

    if (withSearchButton){
      cy.get('[data-testid="search-top-btn"]')
        .should('have.attr', 'src')
        .should('include', 'searchIcon');
    } else {
      cy.get('[data-testid="search-top-btn"]').should('not.exist');
    }
  };

  it('Rota "/": não possui header', () => {
    cy.visit('http://localhost:3000/');

    hasNoHeader();
  });

  it('Rota "/foods": possui o header com o título "Foods" e os ícones de perfil e pesquisa', () => {
    cy.visit('http://localhost:3000/foods');

    hasHeader('Foods');
  });

  it('Rota "/drinks": possui o header com o título "Drinks" e os ícones de perfil e pesquisa', () => {
    cy.visit('http://localhost:3000/drinks');

    hasHeader('Drinks');
  });

  it('Rota "foods/{id-da-receita}": não possui header', () => {
    cy.visit('http://localhost:3000/foods/52771');

    hasNoHeader();
  });

  it('Rota "drinks/{id-da-receita}": não possui header', () => {
    cy.visit('http://localhost:3000/drinks/178319');

    hasNoHeader();
  });

  it('Rota "/foods/{id-da-receita}/in-progress": não possui header', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress');

    hasNoHeader();
  });

  it('Rota "/drinks/{id-da-receita}/in-progress": não possui header', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress');

    hasNoHeader();
  });

  it('Rota "/profile": possui o header com o título "Profile" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    cy.visit('http://localhost:3000/profile');

    hasHeader('Profile', false);
  });

  it('Rota "/done-recipes": possui o header com o título "Done Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    cy.visit('http://localhost:3000/done-recipes');

    hasHeader('Done Recipes', false);
  });

  it('Rota "/favorite-recipes": possui o header com o título "Favorite Recipes" e o ícone de perfil, mas sem o ícone de pesquisa', () => {
    cy.visit('http://localhost:3000/favorite-recipes');

    hasHeader('Favorite Recipes', false);
  });

});

describe('8 - Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', () => {
  it('A mudança de tela ocorre corretamente', () => {
    cy.visit('http://localhost:3000/foods');

    cy.get('[data-testid="page-title"]').contains('Foods');

    cy.get('[data-testid="profile-top-btn"]').click();

    cy.get('[data-testid="page-title"]').contains('Profile');

    cy.location().should((loc) => expect(loc.pathname).to.eq('/profile'));

  });

  it('Verifica a cobertura de 45% do Componente Header', () => {
    cy.task('getCoverage', getId()).its('Header.functions.pct').should('be.gte', 45.00);
    cy.task('getCoverage', getId()).its('Header.lines.pct').should('be.gte', 45.00);
    cy.task('getCoverage', getId()).its('Header.branches.pct').should('be.gte', 45.00);
  });

});

describe('9 - Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la', () => {
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    cy.visit('http://localhost:3000/foods');

    cy.get('[data-testid="search-input"]').should('not.exist');

    cy.get('[data-testid="search-top-btn"]').click();

    cy.get('[data-testid="search-input"]');
  });

  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    cy.visit('http://localhost:3000/foods');

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="search-input"]');

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="search-input"]').should('not.exist');
  });

  it('Verifica a cobertura de 90% do Componente Header', () => {
    cy.task('getCoverage', getId()).its('Header.functions.pct').should('be.gte', 90.00);
    cy.task('getCoverage', getId()).its('Header.lines.pct').should('be.gte', 90.00);
    cy.task('getCoverage', getId()).its('Header.branches.pct').should('be.gte', 90.00);
  });
});
