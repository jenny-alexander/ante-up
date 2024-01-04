import { combineReducers } from 'redux';

const initialState = {
    data: [],
    loading: false,
    error: null,
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
export const getAllowanceInfo = (state) => state.allowance.latestAllowance;
export default combineReducers({
    latestAllowance,
    nextAllowance,
});