import { ADD_ACCOUNT, ADD_ACCOUNT_ERROR, REMOVE_ACCOUNT, REMOVE_ACCOUNT_ERROR } from '../actions/accountActions';

const INITIAL_STATE = {
  error: null,
}

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_ERROR:
      return {
        ...state,
        error: action.err,
      }
      case REMOVE_ACCOUNT_ERROR:
        return {
          ...state,
          error: action.err,
        }
    case ADD_ACCOUNT:
      return {
        ...state,
        error: null
      }
    case REMOVE_ACCOUNT:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}

export default accountReducer;