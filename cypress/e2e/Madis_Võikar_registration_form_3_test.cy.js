import 'cypress-file-upload';
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */

describe('Visual parts of the page tests', () => {
    it('Should verify radio buttons and their content', () => {
    
        cy.get('input[type="radio"]').should('be.visible')
        cy.get('input[type="radio"]').each((radioButton) => {
        cy.wrap(radioButton).should('have.attr', 'type', 'radio')
    });
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','Never')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
  });

    it('Should update city dropdown based on country selection', () => {
        cy.get('#country').select('Estonia')
        cy.get('#city').children().should('have.length', 4)
        cy.get('#country').select('Spain')
        cy.get('#city').children().should('have.length', 5)
  });

    it('Should clear city selection when country is updated', () => {
        cy.get('#country').select('Estonia')
        cy.get('#city').should('not.be.disabled')
        cy.get('#city').select('Tallinn')
        cy.get('#city').invoke('val').should('deep.equal', ['string:Tallinn'])
        cy.get('#country').select('Austria')
        cy.get('#city').invoke('val').should('deep.equal', [])
  });
  
    it('Should verify checkboxes, their content, and links', () => {
        cy.get('input[type="checkbox"]').should('be.visible')
        cy.get('input[type="checkbox"]').should('not.be.checked').check().should('be.checked')
        cy.get('a').should('have.attr', 'href', 'cookiePolicy.html')
  });

    it('Should verify email format', () => {
        cy.get('input[type="email"]').type('test@example.com')
        cy.get('input[type="email"]').should('have.value', 'test@example.com')
  });
});

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

describe('Functional Tests', () => {
    it('Should fill all fields and make corresponding assertions', () => {
        cy.get("input[name='name']").type('Something')
        cy.get("input[name='email']").type('validemail@yeap.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('label').contains('Date of registration').next('input[type="date"]').click().type('2024-01-01')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('label').contains('Birthday').next('input[type="date"]').click().type('1999-01-01')
        cy.get('input[type="checkbox"]').should('not.be.checked').check().should('be.checked')
        cy.get('input[type="submit"]').should('be.enabled')
        cy.get('input[type="submit"]').click()
      });
    
      it('Should fill only mandatory fields and make corresponding assertions', () => {
        cy.get("input[name='email']").type('validemail@yeap.com')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.contains('Accept our privacy policy').find('input[type="checkbox"]').eq(0).click()
        cy.get('input[type="submit"]').should('be.enabled')
        cy.get('input[type="submit"]').click()
      });
    
      it('Should assert corresponding assertions when mandatory fields are absent', () => {
        cy.get("input[name='name']").type('Something')
        cy.get('label').contains('Date of registration').next('input[type="date"]').click().type('2024-01-01')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('label').contains('Birthday').next('input[type="date"]').click().type('1999-01-01')
        cy.get('input[type="checkbox"]').eq(1).click()
        cy.get('input[type="submit"]').should('not.be.enabled')
      });
    
      it('Should add a file', () => {
        cy.fixture('cerebrum_hub_logo.png').then(fileContent => {
        cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'cerebrum_hub_logo.png',
        mimeType: 'application/png'
    });
});
    });
})