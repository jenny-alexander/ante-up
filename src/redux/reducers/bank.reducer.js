const initialState = {
    bank: {},
    loading: false,
    error: null,
    changeSuccess: false,
    allowanceDepositSuccess: false,
}
const bankReducer = (state = initialState, action) => {
    console.log('in bankReducer and action is:', action);
    switch (action.type) {
        case 'GET_BANK_REQUESTED':
            console.log('OINK')
            return { ...state, loading: true, changeSuccess: false }
        case 'GET_BANK_SUCCESS':
            console.log('MOOOOO')
            return { ...state, loading: false, bank: action.payload, error: null, changeSuccess: false }
        case 'GET_BANK_FAILED':
            return { ...state, loading: false, error: action.payload, changeSuccess: false }
        case 'DEPOSIT_SUCCESS':
            console.log('in reducer DEPOSIT_SUCCESS')
            return {
                ...state,
                loading: false,
                bank: action.payload,
                error: null,
                changeSuccess: true,
                allowanceDepositSuccess: false
            }
        case 'ALLOWANCE_DEPOSIT_SUCCESS':
            console.log('in reducer ALLOWANCE_DEPOSIT_SUCCESS')
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
        // case 'DEPOSIT_SUCCESS':
        //     console.log('DEPOSIT_SUCCESS')
        //     return { ...state, loading: false, bank: action.payload, error: null, changeSuccess: true }
        // case 'SET_BANK':
        //     console.log('in bankReducer and action payload is:', action.payload)
        //     return [...state, action.payload];
        // case 'UNSET_BANK':
        //     return [];
        default:
            return state;
    }
}

export default bankReducer;