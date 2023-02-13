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

const adhocInitialState = {
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
        case 'PUT_DAILY_PAYMENT_SUCCESS':
            return { ...state, loading: false, error: null, changeSuccess: true }
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
        case 'PUT_WEEKLY_PAYMENT_SUCCESS':
            return { ...state, loading: false, error: null, changeSuccess: true }
        case 'UPDATE_WEEKLY_PAYMENT_FAILED':
                return { ...state, loading: false, error: action.payload, changeSuccess: false }
        default:
            return state;
    }
}

const adhocPayment = (state = adhocInitialState, action) => {
    switch (action.type) {
        case 'GET_ADHOC_PAYMENT_REQUESTED':
            return { ...state, loading: true, changeSuccess: false }
        case 'GET_ADHOC_PAYMENT_SUCCESS':
            return { ...state, loading: false, payment: action.payload, error: null, changeSuccess: false }
        case 'GET_ADHOC_PAYMENT_FAILED':
            return { ...state, loading: false, error: action.payload, changeSuccess: false }
        case 'PUT_ADHOC_PAYMENT_SUCCESS':
            return { ...state, loading: false, error: null, changeSuccess: true }
        case 'UPDATE_ADHOC_PAYMENT_FAILED':
                return { ...state, loading: false, error: action.payload, changeSuccess: false }
        default:
            return state;
    }
}

export default combineReducers({
    dailyPayment,
    weeklyPayment,
    adhocPayment,
});