export function registerPayload (account) {
  return {
    data: {
      type: 'customer_accounts',
      attributes: {
        email: account.email,
        email_confirmation: account.confirm_email,
        password: account.password,
        password_confirmation: account.confirm_password,
        meta_attributes: {
          first_name: { value: account.first_name },
          last_name: { value: account.last_name }
        }
      }
    }
  }
}
