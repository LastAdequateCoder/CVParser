describe('Candidate List', () => {
  it('should display uploaded candidate in the list', () => {
    cy.visit('/');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-cv.pdf', { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Parsed Candidate', { timeout: 10000 }).should('exist');
    cy.visit('/'); // Go back to main page
    cy.contains('All Parsed Candidates').should('exist');
    cy.contains('Jane Doe').should('exist');
    cy.contains('jane@example.com').should('exist');
  });
}); 