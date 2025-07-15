describe('Header Navigation', () => {
  it('should navigate to main page when clicking header', () => {
    cy.visit('/');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-cv.pdf', { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Parsed Candidate', { timeout: 10000 }).should('exist');
    cy.get('.header-title').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Upload CV').should('exist');
  });
}); 