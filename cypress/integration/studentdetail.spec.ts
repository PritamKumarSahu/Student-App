describe('Visit Student Details Page', () => {
  it('Student details page intialize with data', () => {
    cy.visit('/studentdetail/Grade%201');
    cy.url().should('include', '/studentdetail/Grade%201');
    cy.contains('Student Details for Grade 1');
  });

  it('Check Student List', () => {
    cy.visit('/studentdetail/Grade%201');
    cy.fixture('grade1.json').then((students) => {
    cy.get('.table-row').should('have.length', students.length);
    });
  });

  it('Check cancel and save disabled at begning and enabled after blur event', () => {
    cy.visit('/studentdetail/Grade%201');
    cy.get(':nth-child(2) > :nth-child(8) > :button').should('be.disabled')
    cy.get('.table > :nth-child(2) > :nth-child(1)').click({force: true})
    cy.get('.card-header').click({force: true})
    cy.get(':nth-child(2) > :nth-child(8) > :button').should('not.be.disabled');
  });

  it('Check save ', () => {
    cy.visit('/studentdetail/Grade%201');
    cy.get('.table > :nth-child(2) > :nth-child(1)').click({force: true})
    cy.get('.card-header').click({force: true})
    cy.get('.success').should('not.exist');
    cy.get(':nth-child(2) > :nth-child(8) > .btn-primary').click({force:true})
    cy.get('h3').contains('Student detail updated successfully !')
    cy.wait(800)
    cy.get('.success').should('not.exist');
  });
});
