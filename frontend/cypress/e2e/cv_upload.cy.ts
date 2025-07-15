describe('CV Upload and Parse', () => {
  it('uploads a CV and displays parsed info', () => {
    cy.visit('http://localhost:5173/');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-cv.pdf', { force: true });
    cy.get('button[type="submit"]').click();
    cy.contains('Parsed Candidate', { timeout: 10000 }).should('exist');
    cy.contains('Jane Doe').should('exist');
    cy.contains('jane@example.com').should('exist');
    cy.contains('Python, Selenium').should('exist');
    cy.contains('Compare with Previous Uploads').click();
    cy.contains('Current CV').should('exist');
    cy.contains('Previous Uploads').should('exist');
  });
}); 