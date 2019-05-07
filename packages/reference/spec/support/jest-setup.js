// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme'

global.shallow = shallow
global.render = render
global.mount = mount

process.env.API_HOST = 'http://example.com'
process.env.API_HOST_PROXY = 'http://example-proxy.com'
process.env.API_TENANT = 'test_tenant'
process.env.SESSION_SECRET = 'superdupersecret'
