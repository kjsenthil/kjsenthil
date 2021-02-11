const APP_HEADING_TEXT = 'Digital Hybrid';

describe('Index page', () => {
  before(() => {
    cy.visit('/');
  });

  it('has a title', () => {
    cy.findByText(APP_HEADING_TEXT).should('exist');
  });
});
