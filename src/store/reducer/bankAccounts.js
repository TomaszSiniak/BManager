import { ADD_BANK_ACCOUNT, ADD_BANK_ACCOUNT_ERROR, REMOVE_BANK_ACCOUNT, REMOVE_BANK_ACCOUNT_ERROR, UPDATE_BANK_ACCOUNT, UPDATE_BANK_ACCOUNT_ERROR } from '../actions/accountActions';

const INITIAL_STATE = {
  error: null,
}

const bankAccountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        error: action.err,
      }
      case REMOVE_BANK_ACCOUNT_ERROR:
        return {
          ...state,
          error: action.err,
        }
    case ADD_BANK_ACCOUNT:
      return {
        ...state,
        error: null
      }
    case REMOVE_BANK_ACCOUNT:
      return {
        ...state,
        error: null
      }
    case UPDATE_BANK_ACCOUNT:
      return {
        ...state,
        error: null,
      }
    case UPDATE_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        error: action.err,
      }
    default:
      return state;
  }
}

export default bankAccountReducer;