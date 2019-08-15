export const ADD_PROMOTION_CONDITION = 'ADD_PROMOTION_CONDITION';
export const ADD_PROMOTION_CONDITION_ERROR = 'ADD_PROMOTION_CONDITION_ERROR';
export const REMOVE_PROMOTION_CONDITION = 'REMOVE_PROMOTION_CONDITION';
export const REMOVE_PROMOTION_CONDITION_ERROR = 'REMOVE_PROMOTION_CONDITION_ERROR';
export const UPDATE_CONDITION_STATUS = 'UPDATE_CONDITION_STATUS';
export const UPDATE_CONDITION_STATUS_ERROR = 'UPDATE_CONDITION_STATUS_ERROR';


export const addPromotionCondition = data => {
  return (dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();

    firestore.collection('conditions').add(data)
      .then(() => {
        dispatch({ type: ADD_PROMOTION_CONDITION, data })
      })
      .catch(err => {
        dispatch({ type: ADD_PROMOTION_CONDITION_ERROR, err })
      });
  }
}

export const removePromotionCondition = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('conditions').doc(id).delete()
      .then(() => {
        dispatch({ type: REMOVE_PROMOTION_CONDITION, id })
      })
      .catch(err => {
        dispatch({ type: REMOVE_PROMOTION_CONDITION_ERROR, err })
      });
  }
}

export const updateConditionStatus = (id, status) => {
  return (dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();
   
    firestore.collection('conditions').doc(id).update({
      status
    }).then(() => {
      dispatch({ type: UPDATE_CONDITION_STATUS })
    }).catch(err => {
      dispatch({ type: UPDATE_CONDITION_STATUS_ERROR, err})
    })
  }
}