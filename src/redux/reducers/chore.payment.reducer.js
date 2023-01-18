import { combineReducers } from 'redux';

const dailyInitialState = {
    payment: [],
    loading: false,
    error: null,
    changeSuccess: false,
}

const weeklyInitialState = {
    payment: [],
    loading: false,
    error: null,
    changeSuccess: false,
}

const dailyPayment = (state = dailyInitialState, action) => {
    switch (action.type) {
        case 'GET_DAILY_PAYMENT_REQUESTED':
            return { ...state, loading: true, changeSuccess: false }
        case 'GET_DAILY_PAYMENT_SUCCESS':
            return { ...state, loading: false, payment: action.payload, error: null, changeSuccess: false }
        case 'GET_DAILY_PAYMENT_FAILED':
            return { ...state, loading: false, error: action.payload, changeSuccess: false }
        case 'SET_DAILY_PAYMENT':
            return { ...state, loading: false, payment: action.payload, error: null, changeSuccess: true }
        case 'UPDATE_DAILY_PAYMENT_FAILED':
            return { ...state, loading: false, error: action.payload, changeSuccess: false }
        default:
            return state;
    }
}

const weeklyPayment = (state = weeklyInitialState, action) => {
    switch (action.type) {
        case 'GET_WEEKLY_PAYMENT_REQUESTED':
            return { ...state, loading: true, changeSuccess: false }
        case 'GET_WEEKLY_PAYMENT_SUCCESS':
            return { ...state, loading: false, payment: action.payload, error: null, changeSuccess: false }
        case 'GET_WEEKLY_PAYMENT_FAILED':
            return { ...state, loading: false, error: action.payload, changeSuccess: false }
            case 'SET_WEEKLY_PAYMENT':
                return { ...state, loading: false, payment: action.payload, error: null, changeSuccess: true }
            case 'UPDATE_WEEKLY_PAYMENT_FAILED':
                return { ...state, loading: false, error: action.payload, changeSuccess: false }
        default:
            return state;
    }
}

export default combineReducers({
    //allowance,
    dailyPayment,
    weeklyPayment,
});