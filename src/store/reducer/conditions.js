import { UPDATE_CONDITION_STATUS, UPDATE_CONDITION_STATUS_ERROR } from '../actions/conditionActions';

const INITIAL_STATE = {
  error: null,
}

const accountConditionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_CONDITION_STATUS:
      return {
        ...state,
        error: null,
      }
    case UPDATE_CONDITION_STATUS_ERROR:
      return {
        ...state,
        error: action.err,
      }
    default:
      return state;
  }
}

export default accountConditionReducer;