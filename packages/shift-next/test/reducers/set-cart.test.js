import setCart from '../../src/reducers/set-cart'
import * as actionTypes from '../../src/actions/action-types'

test('sets initial State', () => {
  expect(setCart(undefined, { type: 'ANYTHING' })).toEqual({ miniBagDisplayed: false })
})

test('returns an empty cart when SET_ORDER is dispatched', () => {
  expect(setCart({ key: 'value' }, { type: actionTypes.SET_ORDER })).toEqual({})
})

test('returns an updated cart when CART_UPDATED is dispatched and sums quantity correctly', () => {
  const action = {
    type: actionTypes.CART_UPDATED,
    payload: {
      key: 'new value',
      line_items: [
        { unit_quantity: 6 },
        { unit_quantity: 4 }
      ],
      line_items_count: 2
    }
  }

  const expected = {
    key: 'new value',
    line_items: [
      { unit_quantity: 6 },
      { unit_quantity: 4 }
    ],
    line_items_count: 10
  }

  expect(setCart({ key: 'value' }, action)).toEqual(expected)
})

test("doesn't change the state when an unrecognized action is dispatched", () => {
  const action = {
    type: 'UNKNOWN',
    payload: {
      key: 'new value'
    }
  }

  expect(setCart({ key: 'value' }, action)).toEqual({
    key: 'value'
  })
})
