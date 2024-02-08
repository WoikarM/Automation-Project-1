beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

//Assignment 4:
describe('Section 1: Functional tests', () => {
    it('User can use only same both first and validation passwords', ()=>{
        cy.get('[data-testid="user"]').type('jaanvarvas')
        cy.get('#email').type('email@email.ee')
        cy.get('[data-cy="name"]').type('Jaan')
        cy.get('[data-testid="lastNameTestId"]').type('Varvas')
        cy.get('[data-testid="phoneNumberTestId"]').type('55555555')

        cy.get('#password').type('Kartul')
        cy.get('#confirm').type('Porgand')
        cy.get('#email').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#password_error_message').should('be.visible')

        cy.get('#confirm').scrollIntoView()
        cy.get('#confirm').clear().type('Kartul')
        cy.get('#email').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })
    
    it('User can submit form with all fields added', ()=>{
        inputValidData('jaanvarvas')
        cy.get('[type="radio"]').first().check()
        cy.get('[type="checkbox"]').first().check()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible').and('contain', 'User successfully submitted registration')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('jaanvarvas')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User cannot submit data when email is absent', () => {
        inputValidData('jaanvarvas')
        cy.get('#email').scrollIntoView()
        cy.get('#email').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
    })

})

//Assignment 5:
describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)   
    })

    it('Test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('img[data-cy="cypress_logo"]').click()
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 50)
    });

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox button list is correct', () => {
       
        cy.get('input[type="checkbox"]').should('have.length', 3)

        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')

        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
        
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).uncheck()
    })

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {
        cy.get('#animal').select(1).screenshot('Favourite animal drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('select#animal').should('be.visible')
        .find('option').should('have.length', 6)
        .each(($option, index, $list)  => {
            const expectedOptions = ['dog', 'cat', 'snake', 'hippo', 'cow', 'horse']
            const actualOptionText = $option.text().trim().toLowerCase()
            expect(actualOptionText).to.equal(expectedOptions[index])
        })
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('email@yemail.ee')
    cy.get('[data-cy="name"]').type('Jaan')
    cy.get('#lastName').type('Varvas')
    cy.get('[data-testid="phoneNumberTestId"]').type('55555555')
    cy.get('#password').type('Kartul')
    cy.get('#confirm').type('Kartul')
    cy.get('h2').contains('Password').click()
}