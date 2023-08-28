/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preeche os campso obrigatórios e envia o formulário', function() {
        const longText = 'foi facil demais chegar ate aqui e bem rapido....foi facil demais chegar ate aqui e bem rapido....foi facil demais chegar ate aqui e bem rapido....foi facil demais chegar ate aqui e bem rapido....foi facil demais chegar ate aqui e bem rapido....foi facil demais chegar ate aqui e bem rapido....foi facil demais chegar ate aqui e bem rapido....foi facil demais chegar ate aqui e bem rapido....'

        cy.get('#firstName').type('Matheus')
        cy.get('#lastName').type('Couto')
        cy.get('#email').type('matheus@gmail.com')
        cy.get('#product').select('Blog')
        cy.get(':nth-child(3) > input').click()
        cy.get('#email-checkbox').click()
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success > strong').should('be.visible')
  })
  it('exibir mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
    
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Couto')
    cy.get('#email').type('matheusgmailcom')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazia quando preenchido com valor não numerico', function () {
    cy.get('#phone')
    .type('abcdefgh')
    .should('have.value', '')  
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Matheus')
    cy.get('#lastName').type('Couto')
    cy.get('#email').type('matheus@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('text')
    cy.contains('button', 'Enviar').click()
    cy.get('#firstName').clear()
    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function (){
    cy.get('#firstName').type('Matheus')
    .should('have.value', 'Matheus')
    .clear()
    cy.get('#lastName').type('Couto')
    .should('have.value', 'Couto')
    .clear()
    cy.get('#email').type('matheus@gmail.com')
    .should('have.value', 'matheus@gmail.com')
    .clear()
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('1231231')
    .should('have.value', '1231231')
    .clear()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function() {
      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu índice', function() {
    cy.get('#product').select(3).should('have.value', 'mentoria')
  })
  it('seleciona um produto (cursos) por seu value', function() {
    cy.get('#product').select('cursos').should('have.value', 'cursos')
  })

it('marca o tipo de atendimento "Feedback"', function() {
  cy.get(':nth-child(4) > input').check().should('have.value', 'feedback')
})
it('marca o tipo de atendimento "Elogio"', function() {
  cy.get(':nth-child(3) > input').check().should('be.checked')

})
it('marca o tipo de atendimento "Ajuda"', function() {
  cy.get('#support-type > :nth-child(2) > input').check().should('be.checked')
})
it('marca ambos checkboxes, depois desmarca o último', function() {
  cy.get('input[tyype="checkbox"]')
  .check().should('be.checked')
  .last()
  .uncheck()
  .should('not.be.checked')
})
it('seleciona um arquivo da pasta fixtures', function(){

  cy.get('input[type="file"]')
  .should('not.have.value')
  .selectFile('./cypress/fixtures/example.json')
  .should(function($inpunt) {
    expect($inpunt[0].files[0].name).to.equal('example.json')

  })
})  
it('seleciona um arquivo simulando um drag-and-drop', function(){

  cy.get('input[type="file"]')
  .should('not.have.value')
  .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
  .should(function($inpunt) {
    expect($inpunt[0].files[0].name).to.equal('example.json')

  })
})
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
  cy.fixture('example.json').as('sampleFile')
  cy.get('input[type="file"]')
  .selectFile('@sampleFile')
  .should(function($inpunt) {
    expect($inpunt[0].files[0].name).to.equal('example.json')
})
})
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
  cy.get('#privacy a').should('have.attr', 'target', '_blank')
  .click()

})
it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
  cy.get('#privacy a')
  .invoke('removeAttr', 'target')
  .click()
  cy.contains('Talking About Testing').should('be.visible')
})
})
