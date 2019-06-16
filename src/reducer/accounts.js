import { ADD_BANK, REMOVE_BANK, ADD_ACCOUNT, REMOVE_ACCOUNT } from '../actions/accountActions';

const INITIAL_STATE = {
  bankList: [],
}

const accountReducer = (state=INITIAL_STATE, action ) => {
  switch(action.type) {
    case ADD_BANK:
      return {
        ...state,
        bankList: [...state.bankList, action.data]
      }
    case REMOVE_BANK:
        return {
          ...state,
          bankList: state.bankList.filter(item => item.id !== action.id)
        }
    case ADD_ACCOUNT:
      return {
        ...state,
        bankList: state.bankList.map(item => {
          if(item.bankName === action.bankName) {
            return {
              ...item,
              accounts: [...item.accounts, action.data]
            }
          }
          return item;
        })
      }
    case REMOVE_ACCOUNT:
      return {
        ...state,
        bankList: state.bankList.map(item => {
          if (item.bankName === action.name) {
            return {
              ...item,
              accounts: item.accounts.filter(account => {
                return action.id !== account.id
              })
            }
          }
          return item;
        })
      }
      return { ...state }
    default:
      return state;
  }
}

export default accountReducer;