import * as cartHandler from '../../lib/cartHandler'

describe('addToCart()', () => {
  test('add line items to cart, when initial cart is empty', () => {
    // arrange
    const cart = { lineItems: [] }
    const lineItemToAdd = {
      title: 'test',
      price: 10,
      discount: 0,
      quantity: 5,
      sku: '123',
      imageUrl: '',
      size: 'size - 8'
    }
    const expectedCart = {
      lineItems: [
        {
          title: 'test',
          price: 10,
          discount: 0,
          quantity: 5,
          sku: '123',
          imageUrl: '',
          size: 'size - 8'
        }
      ]
    }

    // act
    const resultCart = cartHandler.addToCart(cart, lineItemToAdd, {})

    // assert
    expect(resultCart).toMatchObject(expectedCart)
  })

  test('add to the quantity of the existing line item as expected', () => {
    // arrange
    const cart = {
      lineItems: [
        {
          title: 'test',
          price: 10,
          discount: 0,
          quantity: 2,
          sku: '123',
          imageUrl: '',
          size: 'size - 8'
        }
      ]
    }
    const lineItemToAdd = {
      title: 'test',
      price: 10,
      discount: 0,
      quantity: 5,
      sku: '123',
      imageUrl: '',
      size: 'size - 8'
    }
    const expectedCart = {
      lineItems: [
        {
          title: 'test',
          price: 10,
          discount: 0,
          quantity: 7,
          sku: '123',
          imageUrl: '',
          size: 'size - 8'
        }
      ]
    }

    // act
    const resultCart = cartHandler.addToCart(cart, lineItemToAdd, {})

    // assert
    expect(resultCart).toMatchObject(expectedCart)
  })

  test('increase line items, when new line item is added', () => {
    // arrange
    const cart = {
      lineItems: [
        {
          title: 'test',
          price: 10,
          discount: 0,
          quantity: 2,
          sku: '123',
          imageUrl: '',
          size: 'size - 8'
        }
      ]
    }
    const lineItemToAdd = {
      title: 'test',
      price: 10,
      discount: 0,
      quantity: 5,
      sku: '124',
      imageUrl: '',
      size: 'size - 8'
    }
    const expectedCart = {
      lineItems: [
        {
          title: 'test',
          price: 10,
          discount: 0,
          quantity: 2,
          sku: '123',
          imageUrl: '',
          size: 'size - 8'
        },
        {
          title: 'test',
          price: 10,
          discount: 0,
          quantity: 5,
          sku: '124',
          imageUrl: '',
          size: 'size - 8'
        }
      ]
    }

    // act
    const resultCart = cartHandler.addToCart(cart, lineItemToAdd, {})

    // assert
    expect(resultCart).toMatchObject(expectedCart)
  })
})

describe('updateCart()', () => {
  test('updates quantity of the line item as expected, to the latest quantity', () => {
    // arrange
    const cart = {
      lineItems: [
        {
          title: 'test',
          price: 10,
          discount: 0,
          quantity: 2,
          sku: '123',
          imageUrl: '',
          size: 'size - 8'
        }
      ]
    }
    const lineItemToAdd = {
      quantity: 5,
      sku: '123'
    }
    const expectedCart = {
      lineItems: [
        {
          title: 'test',
          price: 10,
          discount: 0,
          quantity: 5,
          sku: '123',
          imageUrl: '',
          size: 'size - 8'
        }
      ]
    }

    // act
    const resultCart = cartHandler.updateCart(cart, lineItemToAdd, {})

    // assert
    expect(resultCart).toMatchObject(expectedCart)
  })

  test('removes line item, if updated quantity is zero', () => {
    // arrange
    const cart = {
      lineItems: [
        {
          title: 'test',
          price: 10,
          discount: 0,
          quantity: 2,
          sku: '123',
          imageUrl: '',
          size: 'size - 8'
        }
      ]
    }
    const lineItemToAdd = {
      quantity: 0,
      sku: '123'
    }
    const expectedCart = { lineItems: [] }

    // act
    const resultCart = cartHandler.updateCart(cart, lineItemToAdd, {})

    // assert
    expect(resultCart).toMatchObject(expectedCart)
  })
})
