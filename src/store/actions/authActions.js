export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';

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

export const registerUser = data => {
  return(dispatch, getState, { getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(data)
    firebase.auth().createUserWithEmailAndPassword(
      data.email,
      data.password,
    ).then(res => {
      return firestore.collection('users').doc(res.user.uid).set({
        firstName: data.firstName,
        password: data.password,
        email: data.email,
      })
    }).then(() => {
      dispatch({ type: USER_REGISTER_SUCCESS })
    }).catch(error => {
      dispatch({ type: USER_REGISTER_ERROR, error})
    })
  }
}