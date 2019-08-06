export const ADD_PROMOTION_CONDITION = 'ADD_PROMOTION_CONDITION';
export const ADD_PROMOTION_CONDITION_ERROR = 'ADD_PROMOTION_CONDITION_ERROR';
export const REMOVE_PROMOTION_CONDITION = 'REMOVE_PROMOTION_CONDITION';
export const REMOVE_PROMOTION_CONDITION_ERROR = 'REMOVE_PROMOTION_CONDITION_ERROR';


export const addPromotionCondition = data => {
  return(dispatch, getState, { getFirestore }) => {

    const firestore = getFirestore();

    firestore.collection('conditions').add(data)
      .then(() => {
        dispatch( {type: ADD_PROMOTION_CONDITION, data})
      })
      .catch(err => {
        dispatch( {type: ADD_PROMOTION_CONDITION_ERROR, err})
      })
  }
}

export const removePromotionCondition = id => {
  return {
    type: REMOVE_PROMOTION_CONDITION,
    id
  }
}