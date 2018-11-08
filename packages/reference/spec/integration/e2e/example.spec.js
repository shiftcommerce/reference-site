import nock from 'nock'

describe('ShopGo', () => {
  beforeAll(async () => {
    nock.enableNetConnect('127.0.0.1')

    await page.goto('http://localhost:3001')
  })

  afterAll(async () => {
    nock.disableNetConnect()
  })

  it('should display "Connect with ShopGo" text on page', async () => {
    await expect(page).toMatch('Connect with ShopGo')
  })
})
