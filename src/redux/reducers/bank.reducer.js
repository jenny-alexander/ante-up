const bankReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BANK':
            console.log('in bankReducer and action payload is:', action.payload)
            return [...state, action.payload];
        case 'UNSET_BANK':
            return [];
        default:
            return state;
    }
}

export default bankReducer;