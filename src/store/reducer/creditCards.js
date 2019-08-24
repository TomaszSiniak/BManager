import { ADD_CREDIT_CARD, ADD_CREDIT_CARD_ERROR, REMOVE_CREDIT_CARD, REMOVE_CREDIT_CARD_ERROR, UPDATE_CREDIT_CARD, UPDATE_CREDIT_CARD_ERROR, TOGGLE_CREDIT_CARD_SIDEPANE } from '../actions/creditCardsActions';



const INITIAL_STATE = {
  error: null,
  isSidepaneVisible: false,
}

const creditCardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CREDIT_CARD_ERROR:
      return {
        ...state,
        error: action.err,
      }
      case REMOVE_CREDIT_CARD_ERROR:
        return {
          ...state,
          error: action.err,
        }
    case ADD_CREDIT_CARD:
      return {
        ...state,
        error: null
      }
    case REMOVE_CREDIT_CARD:
      return {
        ...state,
        error: null
      }
    case UPDATE_CREDIT_CARD:
      return {
        ...state,
        error: null,
      }
    case UPDATE_CREDIT_CARD_ERROR:
      return {
        ...state,
        error: action.err,
      }
      case TOGGLE_CREDIT_CARD_SIDEPANE:
      return {
        ...state,
        isSidepaneVisible: !state.isSidepaneVisible,
      }
    default:
      return state;
  }
}

export default creditCardReducer;