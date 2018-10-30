export function registerPayload (account) {
  const credentials = account
  const accountPayload = {
    type: 'customer_accounts',
    attributes: {
      email: credentials.email,
      email_confirmation: credentials.confirm_email,
      password: credentials.password,
      password_confirmation: credentials.confirm_password,
      meta_attributes: {
        first_name: { value: credentials.first_name },
        last_name: { value: credentials.last_name }
      }
    }
  }
  return {
    data: accountPayload
  }
}
