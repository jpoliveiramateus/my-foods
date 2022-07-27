/// <reference types="cypress" />

const { getId } = require('../utils/getId');

describe('16 - Implemente o menu inferior posicionando-o de forma fixa e contendo 2 ícones: um para comidas e outro para bebidas', () => {
  it('O menu inferior existe e contém os ícones corretos', () => {
    cy.visit('http://localhost:3000/foods');

    cy.get('[data-testid="footer"]');

    cy.get('[data-testid="drinks-bottom-btn"]')
      .should('have.attr', 'src')
      .should('include', 'drinkIcon');

    cy.get('[data-testid="food-bottom-btn"]')
      .should('have.attr', 'src')
      .should('include', 'mealIcon');
  });

  it('O menu inferior deve ficar fixado sempre ao final da página', () => {
    cy.visit('http://localhost:3000/foods');

    cy.get('[data-testid="footer"]').should('have.css','position', 'fixed');
    cy.get('[data-testid="footer"]').should('have.css','bottom', '0px');
  });

  it('Verifica a cobertura de 45% do Componente Footer', () => {
    cy.task('getCoverage', getId()).its('Footer.functions.pct').should('be.gte', 45.00);
    cy.task('getCoverage', getId()).its('Footer.lines.pct').should('be.gte', 45.00);
    cy.task('getCoverage', getId()).its('Footer.branches.pct').should('be.gte', 45.00);
  });
});

describe('17 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {
  const hasNoFooter = () => {
    cy.get('[data-testid="footer"]').should('not.exist');
    cy.get('[data-testid="drinks-bottom-btn"]').should('not.exist');
    cy.get('[data-testid="food-bottom-btn"]').should('not.exist');
  };

  const hasFooter = () => {
    cy.get('[data-testid="footer"]');
    cy.get('[data-testid="drinks-bottom-btn"]');
    cy.get('[data-testid="food-bottom-btn"]');
  };

  it('Rota "/": não deve ter footer', () => {
    cy.visit('http://localhost:3000/');

    hasNoFooter();
  });

  it('Rota "/foods": deve ter footer', () => {
    cy.visit('http://localhost:3000/foods');

    hasFooter();
  });

  it('Rota "/drinks": deve ter footer', () => {
    cy.visit('http://localhost:3000/drinks');

    hasFooter();
  });

  it('Rota "foods/{id-da-receita}": não deve ter footer', () => {
    cy.visit('http://localhost:3000/foods/52771');

    hasNoFooter();
  });

  it('Rota "drinks/{id-da-receita}": não deve ter footer', () => {
    cy.visit('http://localhost:3000/drinks/178319');

    hasNoFooter();
  });

  it('Rota "/foods/{id-da-receita}/in-progress": não deve ter footer', () => {
    cy.visit('http://localhost:3000/foods/52771/in-progress');

    hasNoFooter();
  });

  it('Rota "/drinks/{id-da-receita}/in-progress": não deve ter footer', () => {
    cy.visit('http://localhost:3000/drinks/178319/in-progress');

    hasNoFooter();
  });

  it('Rota "/profile": deve ter footer', () => {
    cy.visit('http://localhost:3000/profile');

    hasFooter();
  });

  it('Rota "/done-recipes": não deve ter footer', () => {
    cy.visit('http://localhost:3000/done-recipes');

    hasNoFooter();
  });

  it('Rota "/favorite-recipes": não deve ter footer', () => {
    cy.visit('http://localhost:3000/favorite-recipes');

    hasNoFooter();
  });

});

describe('18 - Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior', () => {
  it('Redireciona para a lista de cocktails ao clicar no ícone de bebidas', () => {
    cy.visit('http://localhost:3000/foods');

    cy.get('[data-testid="drinks-bottom-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/drinks'));
  });
  
  it('Redireciona para a lista de comidas ao clicar no ícone de comidas', () => {
    cy.visit('http://localhost:3000/drinks');

    cy.get('[data-testid="food-bottom-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/foods'));
  });

  it('Verifica a cobertura de 90% do Componente Footer', () => {
    cy.task('getCoverage', getId()).its('Footer.functions.pct').should('be.gte', 90.00);
    cy.task('getCoverage', getId()).its('Footer.lines.pct').should('be.gte', 90.00);
    cy.task('getCoverage', getId()).its('Footer.branches.pct').should('be.gte', 90.00);
  });

});