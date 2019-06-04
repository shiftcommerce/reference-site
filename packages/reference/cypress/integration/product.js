describe('Product page', () => {
  context('Variants', () => {
    it('renders disabled add to basket button is no variant is selected', () => {
      // Navigate to the PDP
      cy.goToPdpFromPlp()

      // Check the add to cart button is disabled
      cy.contains(/Add To Basket/i).should('have.class', 'o-button--disabled')
    })

    it('renders correctly for variant that is in stock', () => {
      // Select the instock variant
      cy.contains(/Hybrid Computer 13'' - £699.00/i).click()

      // Check the instock variant details
      cy.contains(/HYBRID_13/i)
      cy.contains(/£699/i)

      // Check EWIS email input is not rendered
      // Note: form input does not have a name
      cy.get('.c-ewis-form__input-field').should('not.exist')

      // Check the add to basket button is rendered correctly
      cy.contains(/Add To Basket/i).should('not.have.class', 'o-button--disabled')
    })

    it('renders correctly for variant that is out of stock', () => {
      // Select the out of stock variant
      cy.contains(/Hybrid Computer 15'' - £999.00- Email When in Stock/i).click()

      // Check the out of stock variant details
      cy.contains(/HYBRID_15/i)
      cy.contains(/£999/i)

      // Check EWIS email input is rendered
      // Note: form input does not have a name
      cy.get('.c-ewis-form__input-field').should('exist')

      // Check the EWIS button is rendered correctly
      cy.contains(/Email When in Stock/i).should('not.have.class', 'o-button--disabled')
    })

    it('renders details correctly when changing between instock and out of stock variants', () => {
      // Select the instock variant
      cy.contains(/Hybrid Computer 13'' - £699.00/i).click()

      // Check the instock variant details
      cy.contains(/HYBRID_13/i)
      cy.contains(/£699/i)

      // Check EWIS email input is not rendered
      // Note: form input does not have a name
      cy.get('.c-ewis-form__input-field').should('not.exist')

      // Check the add to basket button is rendered correctly
      cy.contains(/Add To Basket/i).should('not.have.class', 'o-button--disabled')

      // Select the out of stock variant
      cy.contains(/Hybrid Computer 15'' - £999.00- Email When in Stock/i).click()

      // Check the out of stock variant details
      cy.contains(/HYBRID_15/i)
      cy.contains(/£999/i)

      // Check EWIS email input is rendered
      // Note: form input does not have a name
      cy.get('.c-ewis-form__input-field').should('exist')

      // Check the EWIS button is rendered correctly
      cy.contains(/Email When in Stock/i).should('not.have.class', 'o-button--disabled')
    })
  })

  context('EWIS', () => {
    it('renders a success message when EWIS form is submitted', () => {
      // Select the out of stock variant
      cy.get('button[value="HYBRID_15"]').click()

      // Enter email in EWIS email field
      cy.get('.c-ewis-form__input-field').type('test@example.com')

      // Click EWIS form submit button
      cy.get('button[aria-label="Add to Basket"]').click()

      // Check form submission confirmation
      cy.contains(/Thank you for your interest\./i)
      cy.contains(/We will email you when this item is back in stock\./i)
    })
  })

  context('Add To Bag', () => {
    it('renders a minibag when a variant is added to the cart', () => {
      // Stub requests
      cy.server()

      cy.route({
        method: 'POST',
        url: '/addToCart',
        status: 200,
        response: 'fixture:cart/add-to-cart.json'
      }).as('addToCart')

      // Check that the minibag isn't displayed to start with
      cy.get('.c-minibag__dropdown').should('have.length', 0)

      // Select the instock variant
      cy.contains(/Hybrid Computer 13'' - £699.00/i).click()

      // Add item to cart
      cy.contains(/Add To Basket/i).click()

      // Check add to cart request body
      cy.wait('@addToCart')
        .its('requestBody')
        .should('include', {
          quantity: 1,
          variantId: '27106'
        })

      // Check minibag is rendered
      cy.contains(/Shopping Basket/i)
      cy.contains(/View Shopping Basket/i)
      cy.contains(/Continue Shopping/i)

      cy.get('.c-minibag__dropdown-cross').click()
    })
  })

  context('Product Images', () => {
    it('renders the product image', () => {
      // Check image is rendered
      cy.get('.c-product-display__carousel img').first().should('have.attr', 'src', '/static/fixtures/product-image-1.jpg')
    })

    it('clicking a pagination dot, thumbnails and left/right arrows will change the image', () => {
      // Click the second dot
      cy.get('.control-dots .dot:nth-child(2)').click()

      // Second image should be selected
      cy.get('.slider .slide:nth-child(2)').should('have.class', 'selected')

      // Click the first thumbmnail
      cy.get('.thumbs .thumb:nth-child(1)').click()

      // First image should be selected
      cy.get('.slider .slide:nth-child(1)').should('have.class', 'selected')

      // Click next arrow button
      cy.get('.c-product-display__carousel').find('.control-next').first().click()

      // Second image should be selected
      cy.get('.slider .slide:nth-child(2)').should('have.class', 'selected')

      // Click previous arrow button
      cy.get('.c-product-display__carousel').find('.control-prev').first().click()

      // First image should be selected
      cy.get('.slider .slide:nth-child(1)').should('have.class', 'selected')
    })
  })
})
