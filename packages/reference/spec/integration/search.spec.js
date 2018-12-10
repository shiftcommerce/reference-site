describe('ShopGo', () => {
  beforeAll(async () => {
    page.setViewport({ width: 1200, height: 900 })

    await page.goto('http://localhost:3001')

    jest.setTimeout(30000)
  })

  it('when searching goes to a search page and displays correct results', async () => {
    await page.type('.c-header__search .ais-SearchBox__input', 'black', { delay: 50 })
    await page.waitForNavigation()

    const pageTitle = await page.$eval('.c-product-listing__menu-description-title', title => title.innerText)
    expect(pageTitle).toEqual('Search "black"')

    await expect(page).toMatch('Black Computer')
    await expect(page).toMatch('Hybrid Computer')
  })

  it('goes to previous searches with the back button', async () => {
    await page.goto('http://localhost:3001')

    await page.type('.c-header__search .ais-SearchBox__input', 'black', { delay: 50 })
    await page.waitForNavigation()

    let pageTitle = await page.$eval('.c-product-listing__menu-description-title', title => title.innerText)
    expect(pageTitle).toEqual('Search "black"')

    await expect(page).toMatch('Black Computer')

    await page.focus('.c-header__search .ais-SearchBox__input')
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Backspace')
    }
    await page.type('.c-header__search .ais-SearchBox__input', 'geeky', { delay: 50 })
    await page.waitForNavigation()

    pageTitle = await page.$eval('.c-product-listing__menu-description-title', title => title.innerText)
    expect(pageTitle).toEqual('Search "geeky"')
    await expect(page).toMatch('Geeky Computer')

    await page.goBack()

    pageTitle = await page.$eval('.c-product-listing__menu-description-title', title => title.innerText)
    expect(pageTitle).toEqual('Search "black"')
    await expect(page).toMatch('Black Computer')
  })
})
