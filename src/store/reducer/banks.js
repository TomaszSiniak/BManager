import {
  ADD_BANK,
  ADD_BANK_ERROR,
  REMOVE_BANK,
  REMOVE_BANK_ERROR,
  TOGGLE_SIDEPANE,
} from '../actions/bankActions';

const INITIAL_STATE = {
  error: null,
  isSidepaneVisible: false,
}

const bankReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_BANK:
      return {
        ...state,
        error: null,
      }
    case ADD_BANK_ERROR:
      return {
        ...state,
        error: action.err,
      }
    case REMOVE_BANK:
      return {
        ...state,
        error: null

      }
    case REMOVE_BANK_ERROR:
      return {
        ...state,
        error: action.error
      }
    case TOGGLE_SIDEPANE:
        return {
          ...state,
          isSidepaneVisible: !state.isSidepaneVisible,
        }
    default:
      return state;
  }
}

export default bankReducer;