describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Name',
      username: 'TestName',
      password: 'Password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', function() {
    cy.contains('Log in')
    cy.contains('Username')
    cy.contains('login').click()
  })

  it('user can log in', function() {
    cy.get('#username').type('TestName')
    cy.get('#password').type('Password')
    cy.get('#loginButton').click()

    cy.contains('Test Name logged in')
  })

  it('user cant log in with wrong password', function() {
    cy.get('#username').type('TestName')
    cy.get('#password').type('Nope!')
    cy.get('#loginButton').click()

    cy.get('.error').contains('Wrong credentials')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'TestName', password: 'Password' })
    })

    it('a new blog can be created', function() {
      cy.contains('Show').click()
      cy.get('.titleInput').type('Cypress Testing')
      cy.get('.authorInput').type('Cypress the Bot')
      cy.get('.urlInput').type('www.blogs.cypress')
      cy.contains('add').click()
      cy.contains('Cypress Testing')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Cypress Testing',
          author: 'Cypress the Bot',
          url: 'www.blogs.cypress'
        })
      })

      it('it can have its likes increased', function() {
        cy.contains('view').click()
        cy.get('#likeButton').click()
        cy.contains('1')
      })

      it('it can be deleted', function() {
        cy.contains('view').click()
        cy.get('#deleteButton').click()
        cy.contains('Cypress the Bot').not()
      })
    })
  })
})
