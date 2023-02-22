import { combineReducers } from 'redux';
const initialState = {
    chore: {},
    loading: false,
    error: null,
    changeSuccess: false,    
}

const allChoresInitialState = {
    chore: {},
    loading: false,
    error: null,  
}

const userChore = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_USER_CHORE_REQUESTED':
            return { ...state, loading: true, changeSuccess: false }
        case 'GET_CHORE_SUCCESS':
            return { ...state, loading: false, chore: action.payload, error: null, changeSuccess: false }
        case 'GET_CHORE_FAILED':
            return { ...state, loading: false, error: action.payload, changeSuccess: false }
        case 'ASSIGN_CHORE_SUCCESS':
                return { ...state, loading: false, chore: action.payload, error: null, changeSuccess: false }
        case 'REMOVE_CHORE_SUCCESS':
                return { ...state, loading: false, chore: action.payload, error: null, changeSuccess: false }
        case 'UPDATE_CHORE_SUCCESS':
            return {...state, loading: false, chore: action.payload, error: null, changeSuccess: true}
        case 'UPDATE_CHORE_FAILED':
            return {...state, loading: false, chore: action.payload, error: action.payload, changeSuccess: false}
        default:
            return state;
    }
}
const allChore = (state = allChoresInitialState, action) => {
    switch (action.type) {

        case 'GET_ALL_CHORES_REQUESTED':
            return { ...state, loading: true}
        case 'GET_ALL_CHORES_SUCCESS':
            return { ...state, loading: false, chore: action.payload, error: null }
        case 'GET_ALL_CHORES_FAILED':
            return { ...state, loading: false, error: action.payload,  }
        default:
            return state;
    }
}

//export default choreReducer;
export default combineReducers({
    userChore, //chore per user
    allChore, //all chores
  });