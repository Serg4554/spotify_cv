import * as types from "./types";

/** State shape
 * {
 *  loading: bool,
 *  error: string
 *  ready: bool
 * }
 */

const initState = {
  loading: false,
  error: "",
  ready: false
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };

    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload.error
      };

    case types.SET_READY:
      return {
        ...state,
        ready: action.payload.ready
      };

    default:
      return state;
  }
};

export default reducer;
