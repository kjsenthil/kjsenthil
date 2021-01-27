const APP_HEADING_TEXT = 'Digital Hybrid Demo';

describe('Index page', () => {
  before(() => {
    cy.visit('/');
  });

  it('has a title', () => {
    cy.findByText(APP_HEADING_TEXT).should('exist');
  });

  it('lists the available funds', () => {
    cy.findAllByTestId('asset-selector-list').should('have.length', 1);
  });
});
