export function createLoginPayload (login) {
  const credentials = login
  const loginPayload = {
    type: 'customer_account_authentications',
    attributes: {
      email: credentials.email,
      password: credentials.password,
      meta_attributes: {}
    }
  }
  return {
    data: loginPayload
  }
}
