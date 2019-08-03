import {
  ADD_BANK,
  ADD_BANK_ERROR,
  REMOVE_BANK,
  REMOVE_BANK_ERROR,
  ADD_ACCOUNT,
  REMOVE_ACCOUNT,
  LOAD_BANKS_LIST
} from '../actions/bankActions';

const INITIAL_STATE = {
  error: null,
}

const bankReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case LOAD_BANKS_LIST:
    //   return {
    //     ...state,
    //     list: action.data,
    //     error: null,
    //   }
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
        // list: state.list.filter(item => item.id !== action.id)
      }
    case REMOVE_BANK_ERROR:
      return {
        ...state,
        error: action.error
        // list: state.list.filter(item => item.id !== action.id)
      }
    case ADD_ACCOUNT:
      return {
        ...state,
        // list: state.list.map(item => {
        //   if(item.bankName === action.bankName) {
        //     return {
        //       ...item,
        //       accounts: [...item.accounts, action.data]
        //     }
        //   }
        //   return item;
        // })
      }
    case REMOVE_ACCOUNT:
      return {
        ...state,
        // list: state.list.map(item => {
        //   if (item.bankName === action.name) {
        //     return {
        //       ...item,
        //       accounts: item.accounts.filter(account => {
        //         return action.id !== account.id
        //       })
        //     }
        //   }
        //   return item;
        // })
      }
    default:
      return state;
  }
}

export default bankReducer;