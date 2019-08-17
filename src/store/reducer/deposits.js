import { ADD_DEPOSIT, ADD_DEPOSIT_ERROR, TOGGLE_DEPOSIT_SIDEPANE} from '../actions/depositActions';

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
      case TOGGLE_DEPOSIT_SIDEPANE:
        return {
          ...state,
          isDepositSidepaneOpen: !state.isDepositSidepaneOpen,
        }
    default:
      return state;
  }
}

export default depositsReducer;