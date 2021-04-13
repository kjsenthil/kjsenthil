describe('Projections chart', () => {
  before(() => {
    cy.visit('/');

    // Add an arbitrary wait amount to fix detached DOM elements error with
    // Gatsby. References:
    // https://www.cypress.io/blog/2020/07/22/do-not-get-too-detached/#avoid-race-conditions
    // https://github.com/cypress-io/cypress/issues/7306
    // https://twitter.com/kentcdodds/status/1239658244387115008
    cy.wait(500);
  });

  it('updates the total contributions as the form values change', () => {
    cy.get('input[name="upfrontInvestment"]').eq(0).clear().type('1000');
    cy.get('input[name="monthlyInvestment"]').eq(0).clear().type('200');
    cy.get('input[name="investmentPeriod"]').eq(0).clear().type('40');
    cy.get('button[data-testid="simulation-form-update"]').click();

    cy.get('[data-testid="projections-grid-contributions"]').should('have.text', '£97,000.00');
  });
});
