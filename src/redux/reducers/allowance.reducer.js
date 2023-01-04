import { combineReducers } from 'redux';

const initialState = {
    data: [],
    loading: false,
    error: null,
}

const allowance = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALLOWANCE':
            return [...state, action.payload];
        case 'UNSET_ALLOWANCE':
            return [];
        case 'GET_BANK_REQUESTED':
            return { ...state, loading: true, changeSuccess: false }
        case 'GET_BANK_SUCCESS':
            return { ...state, loading: false, bank: action.payload, error: null, changeSuccess: false }
        case 'GET_BANK_FAILED':
            return { ...state, loading: false, error: action.payload, changeSuccess: false }
        default:
            return state;
    }
}

const latestAllowance = (state = {}, action) => {
    switch (action.type) {
        case 'SET_LATEST_ALLOWANCE':
            return action.payload;
        case 'UNSET_LATEST_ALLOWANCE':
            return {};
        case 'UPDATE_ALLOWANCE_FLAG':
            return {
                ...state,
                [action.payload]: true,
            }
        default:
            return state;
    }
}

const nextAllowance = (state = {}, action) => {
    switch (action.type) {
        case 'SET_NEXT_ALLOWANCE':
            return action.payload;
        case 'UNSET_NEXT_ALLOWANCE':
            return {};
        default:
            return state;
    }
}
// make one object that has keys allowance and latestAllowance\
// these will be on the redux state at:
// state.allowance.allowance and state.allowance.latestAllowance
export default combineReducers({
    //allowance,
    latestAllowance,
    nextAllowance,
});