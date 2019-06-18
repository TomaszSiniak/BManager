import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../actions/authActions';

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
    default:
      return state;
  }
}

export default AuthReducer;