import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR, USER_REGISTER_ERROR, USER_REGISTER_SUCCESS } from '../actions/authActions';

const initialState = {
  authError: null,
}

const AuthReducer = (state=initialState, action) => {
  switch(action.type){
    case LOGIN_ERROR:
      return {
        ...state,
        authError: 'Sorry, Login failed, try again',
      }
    case LOGIN_SUCCESS:
        return {
          ...state,
          authError: null
        }
    case LOGOUT_ERROR:
      return {
        ...state,
        authError: 'There was a problem with logout'
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authError: null
      }
    case USER_REGISTER_ERROR:
      console.log(action.data)
      return {
        ...state,
        authError: action.error.message
      }
      case USER_REGISTER_SUCCESS:
          return {
            ...state,
            user: action.data,
            authError: null,
          }
    default:
      return state;
  }
}

export default AuthReducer;