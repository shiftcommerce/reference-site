describe('Create Account Form', () => {
  beforeAll(async () => {
    page.setViewport({ width: 1200, height: 900 })

    jest.setTimeout(3000)
  })

  const PORT = process.env.TEST_PORT

  it('should show validation errors on the inputs', async () => {
    await page.goto(`http://localhost:${PORT}/account/register`)

    await page.type('input[type="email"]', 'not an email address')
    await page.focus('input[type="password"]')
    await page.evaluate(() => {
      document.querySelector('input[type="password"]').blur()
    })

    await expect(page).toMatch('Invalid email')
    await expect(page).toMatch('Required')
  })

  it('should show validation message recieved from API if credentials are already taken', async () => {
    await page.goto(`http://localhost:${PORT}/account/myaccount`)

    await page.click('.c-login__register-button')
    await page.waitFor('.c-register__text-title')

    await page.type('input[type="firstName"]', 'Homer')
    await page.type('input[type="lastName"]', 'Simpson')
    await page.type('input[type="email"]', 'homersimpson@test.com')
    await page.type('input[type="confirmEmail"]', 'homersimpson@test.com')
    await page.type('input[name="password"]', 'homer123')
    await page.type('input[name="confirmPassword"]', 'homer123')

    await page.click('.c-register__button')
    await page.waitFor('.c-account-errors')

    await expect(page).toMatch('email - has already been taken')
  })
})
