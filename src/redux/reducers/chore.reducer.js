import { combineReducers } from 'redux';
const initialState = {
    chore: {},
    loading: false,
    error: null,    
    assignSuccess: false,    
}

const allChoresInitialState = {
    chore: {},
    loading: false,
    error: null,  
    addSuccess: false,
    deleteSuccess: false,
    updateSuccess: false,
}

const userChore = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_CHORE_REQUESTED':
            return { ...state, loading: true }
        case 'GET_CHORE_SUCCESS':
            return { ...state, loading: false, chore: action.payload, error: null }
        case 'GET_CHORE_FAILED':
            return { ...state, loading: false, error: action.payload }
        case 'ASSIGN_CHORE_SUCCESS':
                const assignedChore = action.payload;
                return { ...state, loading: false, chore: [...state.chore, ...assignedChore], error: null }
        case 'REMOVE_CHORE_SUCCESS':
                return { ...state, loading: false, chore: action.payload, error: null }
        default:
            return state;
    }
}
const allChore = (state = allChoresInitialState, action) => {
    switch (action.type) {
        case 'GET_ALL_CHORES_REQUESTED':
            return { ...state, loading: true}
        case 'GET_ALL_CHORES_SUCCESS':
            return { ...state, loading: false, chore: action.payload, error: null }
        case 'GET_ALL_CHORES_FAILED':
            return { ...state, loading: false, error: action.payload,  }
        case 'ADD_CHORE_SUCCESS':
            return { ...state, addSuccess: true };
        case 'CLEAR_ADD_SUCCESS_FLAG':
            return { ...state, addSuccess: false};
        case 'DELETE_CHORE_SUCCESS':        
            const filteredChores = state.chore.filter( chore => chore.id !== action.payload.choreId );            
            return {
                ...state,
                deleteSuccess: true,
                chore: filteredChores
            }
        case 'CLEAR_DELETE_SUCCESS_FLAG':
            return { ...state, deleteSuccess: false};
        case 'UPDATE_CHORE_SUCCESS':
            const updatedChores = state.chore.map(chore => {
                if ( chore.id === action.payload.choreId ) {
                    return {...chore,
                        name: action.payload.choreName,
                        payment: action.payload.chorePayment,
                        frequency: action.payload.choreFrequency,
                    }
                } else {
                    return chore;
                }
            })
            return {
                ...state,
                updateSuccess: true,
                chore: updatedChores
            }
        case 'CLEAR_UPDATE_SUCCESS_FLAG':
                return { ...state, updateSuccess: false};
        default:
            return state;
    }
}

export default combineReducers({
    userChore, //chore per user
    allChore, //all chores
  });