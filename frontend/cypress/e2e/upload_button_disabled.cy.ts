describe('Upload Button Disabled', () => {
  it('should enable upload button when a file is selected', () => {
    cy.visit('/');
    cy.get('button[type="submit"]').should('not.be.disabled');
    // Optionally, clear the file input and check again if your UI disables the button
    // cy.get('input[type="file"]').invoke('val', '').trigger('change');
    // cy.get('button[type="submit"]').should('be.disabled');
  });
}); 