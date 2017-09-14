// actionTypes
import * as types from '../constants/actionTypes'

// Actions
// import { resetProcesses, setLoadingTo, setErroredTo } from './processingStateActions'

// Libs
// import ApiClient from '../lib/ApiClient'

export function setCategory (data) {
  return {
    type: types.SET_CATEGORY,
    payload: data
  }
}

export function fetchCategory (categoryID) {
  return (dispatch) => {
    // dispatch(resetProcesses())
    // dispatch(setLoadingTo(true))

    // const endpoint = `/pim/v1/categories/${categoryID}.json_api`
    //
    // return new ApiClient().read(endpoint)
    //   .then((response) => {
    //     dispatch(setLoadingTo(false))
    //     if (response.status === 200) {
    //       dispatch(setCategory(response.data))
    //     } else {
    //       dispatch(setErroredTo(true))
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(setLoadingTo(false))
    //     dispatch(setErroredTo(true))
    //   })

    // Dummy data to mock category  can be removed when algolia indices are populated
    // UNCOMMENT above logic and delete logic below after algolia indices have been populated
    let dummyCategory = {
      'data': {
        'id': categoryID,
        'attributes': {
          'reference': categoryID,
          'title': categoryID
        }
      }
    }

    dispatch(setCategory(dummyCategory))
  }
}
