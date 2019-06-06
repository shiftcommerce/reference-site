// Pages
import { AccountDetailsPage } from '../../../src/pages/account/details'
import emptyLayout from '../../support/empty-layout';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {}
}))

const layout = {
  component: emptyLayout,
  props: {}
}

describe('handleUpdateDetailsSubmit()', () => {
  test('sets form status to success when updating customer account succeeds', async () => {
    const setStatus = jest.fn()
    const setSubmitting = jest.fn()
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve(true))

    // a dummy layout

    const wrapper = shallow(<AccountDetailsPage dispatch={dispatch} account={{}} layout={layout} />, { disableLifecycleMethods: true })

    await wrapper.instance().handleUpdateDetailsSubmit({}, { setStatus, setSubmitting })

    expect(setStatus).toHaveBeenCalledWith('success')
  })

  test('sets form status to error when updating customer account fails', async () => {
    const setStatus = jest.fn()
    const setSubmitting = jest.fn()
    const dispatch = jest.fn().mockImplementation(() => Promise.resolve(false))

    const wrapper = shallow(<AccountDetailsPage dispatch={dispatch} account={{}} layout={layout}/>, { disableLifecycleMethods: true })

    await wrapper.instance().handleUpdateDetailsSubmit({}, { setStatus, setSubmitting })

    expect(setStatus).toHaveBeenCalledWith('error')
  })
})
