export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const login = data => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS })
      })
      .catch(err => {
        dispatch({ type: LOGIN_ERROR, err })
      })
  }
}

export const logout = () => {
  return(dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS})
      })
      .catch(err => {
        dispatch({ type: LOGOUT_ERROR }, err)
      })
  }
}