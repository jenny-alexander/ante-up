const initialState = {
    bank: {},
    loading: false,
    error: null,
}
const bankReducer = (state = initialState, action) => {
    console.log('in bankReducer and action is:', action);
    switch (action.type) {
        case 'GET_BANK_REQUESTED':
            console.log('OINK')
            return { ...state, loading: true }
        case 'GET_BANK_SUCCESS':
            console.log('MOOOOO')
            return { ...state, loading: false, bank: action.payload, error: null }
        case 'GET_BANK_FAILED':
            return { ...state, loading: false, error: action.payload }

        // case 'SET_BANK':
        //     console.log('in bankReducer and action payload is:', action.payload)
        //     return [...state, action.payload];
        // case 'UNSET_BANK':
        //     return [];
        default:
            return state;
    }
}

// const bankReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_BANK':
//             console.log('in bankReducer and action payload is:', action.payload)
//             return [...state, action.payload];
//         case 'UNSET_BANK':
//             return [];
//         default:
//             return state;
//     }
// }

export default bankReducer;