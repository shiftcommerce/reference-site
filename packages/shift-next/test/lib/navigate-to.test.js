import Router from 'next/router'
import navigateTo from '../../src/lib/navigate-to'

test('navigateTo called correctly and scrolls to top', async () => {
  Router.push = jest.fn(() => Promise.resolve())
  global.scrollTo = jest.fn()

  await navigateTo('/somewhere')

  expect(Router.push).toHaveBeenCalledWith('/somewhere', '/somewhere', {})
  expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
})

test('navigateTo can do \'as\' argument', async () => {
  Router.push = jest.fn(() => Promise.resolve())
  global.scrollTo = jest.fn()

  await navigateTo('/somewhere', '/somewhere_else')

  expect(Router.push).toHaveBeenCalledWith('/somewhere', '/somewhere_else', {})
  expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
})

test('navigateTo passes other options', async () => {
  Router.push = jest.fn(() => Promise.resolve())
  global.scrollTo = jest.fn()

  await navigateTo('/somewhere', '/somewhere_else', { shallow: true })

  expect(Router.push)
    .toHaveBeenCalledWith('/somewhere', '/somewhere_else', { shallow: true })
  expect(global.scrollTo).toHaveBeenCalledWith(0, 0)
})
