import * as cartHandler from '../../../../client/actions/handlers/cartHandler'

describe('addToCart()', () => {
  test('add line items to cart, when initial cart is empty', () => {
    // arrange
    const cart = { lineItems: [], totalQuantity: 0 }
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
      ],
      totalQuantity: 5
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
      ],
      totalQuantity: 2
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
      ],
      totalQuantity: 7
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
      ],
      totalQuantity: 2
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
      ],
      totalQuantity: 7
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
      ],
      totalQuantity: 2
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
      ],
      totalQuantity: 5
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
      ],
      totalQuantity: 2
    }
    const lineItemToAdd = {
      quantity: 0,
      sku: '123'
    }
    const expectedCart = { lineItems: [], totalQuantity: 0 }

    // act
    const resultCart = cartHandler.updateCart(cart, lineItemToAdd, {})

    // assert
    expect(resultCart).toMatchObject(expectedCart)
  })
})
