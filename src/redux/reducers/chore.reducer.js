const initialState = {
    chore: {},
    loading: false,
    error: null,
    changeSuccess: false,    
}

const choreReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'GET_CHORE_REQUESTED':
            return { ...state, loading: true, changeSuccess: false }
        case 'GET_CHORE_SUCCESS':
            return { ...state, loading: false, chore: action.payload, error: null, changeSuccess: false }
        case 'GET_CHORE_FAILED':
            return { ...state, loading: false, error: action.payload, changeSuccess: false }
        case 'UPDATE_CHORE_SUCCESS':
            return {...state, loading: false, chore: action.payload, error: null, changeSuccess: true}
        case 'UPDATE_CHORE_FAILED':
            return {...state, loading: false, chore: action.payload, error: action.payload, changeSuccess: false}
        default:
            return state;
    }
}

export default choreReducer;