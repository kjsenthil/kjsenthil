describe('Projections chart', () => {
  before(() => {
    cy.visit('/');
  });

  it('updates the total contributions as the form values change', () => {
    cy.get('input[name="upfrontInvestment"]').eq(0).clear().type('1000');
    cy.get('input[name="monthlyInvestment"]').eq(0).clear().type('200');
    cy.get('input[name="investmentPeriod"]').eq(0).clear().type('40');
    cy.get('button[data-testid="simulation-form-update"]').click();

    cy.get('[data-testid="projections-grid-contributions"]').should('have.text', '£97,000.00');
  });
});
