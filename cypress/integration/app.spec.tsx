it('should work', () => {
    cy.visit('http/localhost:3000');
    cy.get('Link').should('have.text', 'Sign Up')
});