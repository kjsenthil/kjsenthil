const APP_HEADING_TEXT = 'Bestinvest';

describe('Index page', () => {
  before(() => {
    cy.visit('/');
  });

  it('has a title', () => {
    cy.findByText(APP_HEADING_TEXT).should('exist');
  });
});
