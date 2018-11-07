export function createLoginPayload (login) {
  return {
    data: {
      type: 'customer_account_authentications',
      attributes: {
        email: login.email,
        password: login.password,
        meta_attributes: {}
      }
    }
  }
}
