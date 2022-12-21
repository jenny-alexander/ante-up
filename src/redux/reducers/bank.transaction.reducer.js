const bankTransactionReducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_BANK_TRANSACTION_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export default bankTransactionReducer;