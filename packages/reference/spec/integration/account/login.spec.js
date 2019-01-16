describe('Login Form', () => {
  beforeAll(async () => {
    page.setViewport({ width: 1200, height: 900 })

    jest.setTimeout(3000)
  })

  const PORT = process.env.TEST_PORT

  it('should allow you to login and logout', async () => {
    await page.goto(`http://localhost:${PORT}/account/myaccount`)

    await page.type('input[type="email"]', 'homersimpson@test.com')
    await page.type('input[type="password"]', 'homer123')

    await page.click('.c-login__button')

    await page.waitFor('.c-order-history__banner')

    await expect(page).toMatch('My Account')

    await page.click('.c-order-history__banner-button-icon')
    await page.waitFor('.c-component-header')

    await expect(page.url()).toMatch(`http://localhost:${PORT}`)
  })

  it('should show validation errors on the inputs', async () => {
    await page.goto(`http://localhost:${PORT}/account/myaccount`)

    await page.type('input[type="email"]', 'testtest')
    await page.focus('input[type="password"]')
    await page.evaluate(() => {
      document.querySelector('input[type="password"]').blur()
    })

    await expect(page).toMatch('Invalid email')
    await expect(page).toMatch('Password is required')
  })

  it('should show validation message recieved from API if credentials are incorrect', async () => {
    await page.goto(`http://localhost:${PORT}/account/myaccount`)

    await page.type('input[type="email"]', 'dona@duck.com')
    await page.type('input[type="password"]', 'donald123')

    await page.click('.c-login__button')
    await page.waitFor('.c-account-errors')

    await expect(page).toMatch('There has been a problem processing your request')
    await expect(page).toMatch('Wrong email/reference/token or password')
  })
})
