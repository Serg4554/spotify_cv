import * as types from './types';

/** State shape
 * {
 *  uuid: string,
 *  token: string
 * }
 */

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_UUID:
      return {
        ...state,
        uuid: action.payload.uuid,
      };

    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export default reducer;
