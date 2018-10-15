const payload = {
  errors: [
    {
      title: 'Record not found',
      detail: 'Wrong email/reference/token or password',
      code: '404',
      status: '404'
    }
  ],
  links: {
    self: '/integration/v1/customer_account_authentications'
  }
}

export default payload
