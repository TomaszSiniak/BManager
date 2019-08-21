import { ADD_DEPOSIT, ADD_DEPOSIT_ERROR, TOGGLE_SIDEPANE,REMOVE_DEPOSIT, REMOVE_DEPOSIT_ERROR} from '../actions/depositActions';

const INITIAL_STATE = {
  error: null,
  isDepositSidepaneOpen: false,
}

const depositsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_DEPOSIT:
      return {
        ...state,
        error: null,
      }
    case ADD_DEPOSIT_ERROR:
      return {
        ...state,
        error: action.err,
      }
      case TOGGLE_SIDEPANE:
        return {
          ...state,
          isDepositSidepaneOpen: !state.isDepositSidepaneOpen,
        }
        case REMOVE_DEPOSIT:
          return {
            ...state,
            error: null,
          }
        case REMOVE_DEPOSIT_ERROR:
          return {
            ...state,
            error: action.err,
          }
    default:
      return state;
  }
}

export default depositsReducer;