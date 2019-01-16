export function registerPayload (account) {
  return {
    data: {
      type: 'customer_accounts',
      attributes: {
        email: account.email,
        email_confirmation: account.confirmEmail,
        password: account.password,
        password_confirmation: account.confirmPassword,
        meta_attributes: {
          first_name: { value: account.first_name },
          last_name: { value: account.last_name }
        }
      }
    }
  }
}
