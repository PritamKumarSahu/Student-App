describe('Visit Dashboard', () => {
  
  it('Dashboard page intialize with chart', () => {
    cy.visit('/')
    cy.url().should('include', '/dashboard')
    cy.contains('% of students passed in 2018-2019 session')
    cy.get('ngx-charts-chart')
    
  })

  it('check the click on Grade 1', () => {
    cy.url().should('include', '/dashboard')
    cy.get(':nth-child(1) > [ngx-charts-pie-arc=""] > .arc-group > .arc').click({force: true})
    cy.url().should('include', '/studentdetail/Grade%201')
    cy.contains('Student Details for Grade 1')
  })

  it('check the click on Grade 2', () => {
    cy.visit('/')
    cy.url().should('include', '/dashboard')
    cy.get(':nth-child(2) > [ngx-charts-pie-arc=""] > .arc-group > .arc').click({force: true})
    cy.url().should('include', '/studentdetail/Grade%202')
    cy.contains('Student Details for Grade 2')
  })

  it('check the click on Grade 3', () => {
    cy.visit('/')
    cy.url().should('include', '/dashboard')
    cy.get(':nth-child(3) > [ngx-charts-pie-arc=""] > .arc-group > .arc').click({force: true})
    cy.url().should('include', '/studentdetail/Grade%203')
    cy.contains('Student Details for Grade 3');
  })

})
