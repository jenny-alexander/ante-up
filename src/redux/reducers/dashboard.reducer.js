import { combineReducers } from 'redux';

const dailyTotalChorePayment = (state = null, action ) => { 
        switch (action.type) {        
        case 'GET_TOTAL_DAILY_CHORE_PAYMENT_SUCCESS':            
            return action.payload;
        default:
            return state;
    }
}

const weeklyTotalChorePayment = (state = null, action ) => { 
    switch (action.type) {    
    case 'GET_TOTAL_WEEKLY_CHORE_PAYMENT_SUCCESS':        
        return action.payload;    
    default:
        return state;
    }
}
const adhocTotalChorePayment = (state = null, action ) => { 
    switch (action.type) {    
    case 'GET_TOTAL_ADHOC_CHORE_PAYMENT_SUCCESS':        
        return action.payload;    
    default:
        return state;
    }
}

const individualChorePayments = (state = [], action ) => { 
    switch (action.type) {    
    case 'GET_INDIVIDUAL_CHORE_PAYMENT_SUCCESS':        
        return action.payload;   
    default:
        return state;
    }
}

export default combineReducers({
    dailyTotalChorePayment,
    weeklyTotalChorePayment,
    adhocTotalChorePayment,
    individualChorePayments,
  });