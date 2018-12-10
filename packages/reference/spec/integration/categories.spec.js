describe('ShopGo', () => {
  beforeAll(async () => {
    page.setViewport({ width: 1200, height: 900 })

    await page.goto('http://localhost:3001')

    jest.setTimeout(30000)
  })

  it('should navigate to a category landing page and back', async () => {
    const phonesLink = await page.$('a[href="/phones"]')
    // The usual puppeteer way to click things doesn't work here for some reason
    await page.evaluate((el) => { return el.click() }, phonesLink)
    await expect(page).toMatch('Explore our selection of mobile phones', { timeout: 3000 })

    await page.goBack()
    await expect(page).toMatch('Test homepage heading', { timeout: 3000 })
  })

  it('should navigate between category pages and back and display correct results', async () => {
    await page.goto('http://localhost:3001/categories/computers')
    await expect(page).toMatch('Geeky Computer', { timeout: 3000 })

    const printersLink = await page.$('a[href="/categories/printers"]')
    // The usual puppeteer way to click things doesn't work here for some reason
    await page.evaluate((el) => { return el.click() }, printersLink)
    await expect(page).toMatch('Inkjet Printer', { timeout: 3000 })

    await page.goBack()
    await expect(page).toMatch('Geeky Computer', { timeout: 3000 })
  })

  it('should apply and undo refinements with the back button', async () => {
    await page.goto('http://localhost:3001/categories/computers')
    await page.waitForSelector('.c-product-listing__menu-description-title')
    let products = await page.$$('.c-product-listing-card')
    expect(products.length).toEqual(4)

    const fiveStarRating = (await page.$$('input[type="checkbox"]'))[3]
    await page.evaluate((el) => { return el.click() }, fiveStarRating)
    await page.waitForNavigation()

    products = await page.$$('.c-product-listing-card')
    expect(products.length).toEqual(1)

    await page.goBack()
    await page.waitForNavigation()
    await page.waitForSelector('.c-product-listing__menu-description-title')
    products = await page.$$('.c-product-listing-card')
    expect(products.length).toEqual(4)
  })

  it('should apply and clear refinements', async () => {
    await page.goto('http://localhost:3001/categories/computers')
    await page.waitForSelector('.c-product-listing__menu-description-title')
    let products = await page.$$('.c-product-listing-card')
    expect(products.length).toEqual(4)

    const fiveStarRating = (await page.$$('input[type="checkbox"]'))[3]
    await page.evaluate((el) => { return el.click() }, fiveStarRating)
    await page.waitForNavigation()

    products = await page.$$('.c-product-listing-card')
    expect(products.length).toEqual(1)

    const clearFiltersButton = await page.$('.ais-ClearRefinements-button')
    await page.evaluate((el) => { return el.click() }, clearFiltersButton)
    await page.waitForNavigation()

    products = await page.$$('.c-product-listing-card')
    expect(products.length).toEqual(4)
  })

  it('displays more results when load more button is clicked', async () => {
    await page.goto('http://localhost:3001/categories/computers')
    await page.waitForSelector('.c-product-listing__menu-description-title')
    let products = await page.$$('.c-product-listing-card')
    expect(products.length).toEqual(4)

    const loadMore = await page.$('.c-product-listing__view-more-button')
    await page.evaluate((el) => { return el.click() }, loadMore)
    await page.waitForFunction("document.querySelectorAll('.c-product-listing-card').length != 4")

    products = await page.$$('.c-product-listing-card')
    expect(products.length).toEqual(8)
  })

  it('should change the order of displayed products when sorting order is changed', async () => {
    await page.goto('http://localhost:3001/categories/computers')
    await page.waitForSelector('.c-product-listing__menu-description-title')
    const beforeProductTitles = await page.$$eval('.c-product-listing-card__title', productCards => productCards.map(productCard => productCard.innerText))

    await page.select('.ais-SortBy-select', 'reference_test_suite_product_rating_asc')
    await page.waitForNavigation()

    const afterProductTitles = await page.$$eval('.c-product-listing-card__title', productCards => productCards.map(productCard => productCard.innerText))
    expect(beforeProductTitles.length).toEqual(afterProductTitles.length)
    expect(beforeProductTitles).not.toEqual(afterProductTitles)
  })
})
