const initialState = {
    bank: {},
    loading: false,
    error: null,
    changeSuccess: false,
    allowanceDepositSuccess: false,
}
const bankReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BANK_REQUESTED':
            return { ...state, loading: true, changeSuccess: false }
        case 'GET_BANK_SUCCESS':
            return { ...state, loading: false, bank: action.payload, error: null, changeSuccess: false }
        case 'GET_BANK_FAILED':
            return { ...state, loading: false, error: action.payload, changeSuccess: false }
        case 'DEPOSIT_SUCCESS':
            return {
                ...state,
                loading: false,
                bank: action.payload,
                error: null,
                changeSuccess: true,
                allowanceDepositSuccess: false
            }
        case 'ALLOWANCE_DEPOSIT_SUCCESS':
            return {
                ...state,
                loading: false,
                bank: action.payload,
                error: null,
                changeSuccess: false,
                allowanceDepositSuccess: true
            }
        case 'CLEAR_DEPOSIT_SUCCESS':
            return { ...state, changeSuccess: false }
        default:
            return state;
    }
}

export default bankReducer;