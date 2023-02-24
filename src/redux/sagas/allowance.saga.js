import axios from 'axios';
import { put, takeLatest, select } from 'redux-saga/effects';
import { getWeekInfo} from '../reducers/week.reducer';
import { getUserInfo } from '../reducers/user.reducer';

/* api functionality should include:
- get allowance info from db
- update to monthly and weekly totals
- update boolean deposited values (to determine whether $ was paid to user)
*/

function* createNewAllowanceRecord(action)
 {
    //console.log('*** YEE HAW in createNewAllowanceRecord and action is:', action.payload)
    const weekInfo = yield select(getWeekInfo);
    const userInfo = yield select(getUserInfo);
    console.log('select info from reducers is:', weekInfo, userInfo);
    try {
        //yield put({ type: 'UNSET_ALLOWANCE_RECORD'});
        //action.payload should include: age, week_id, allowance date.
        if (Object.entries(userInfo).length > 0 && Object.entries(weekInfo).length > 0 ) {
            console.log('*** about to call allowance router')
            const response = yield axios.post(`api/allowance/add`, 
            { userId: userInfo.id,              
              spend: userInfo.age * 0.7,
              save: userInfo.age * 0.2,
              share: userInfo.age * 0.1,
              weekId: weekInfo.id,
              allowanceDate: weekInfo.allowance_date.substring(0,10),
        });
        }


    } catch(error) {
        console.log('Allowance CREATE NEW RECORD failed:', error);
    }
 }
function* fetchLatestAllowance(action) {
    // console.log('action is:', action);
    try {
        yield put({ type: 'UNSET_LATEST_ALLOWANCE' });
        const response = yield axios.get(`/api/allowance/latest/${action.payload.userId}/${action.payload.weekId}`);        
        yield put({ type: 'SET_LATEST_ALLOWANCE', payload: response.data });
    } catch (error) {
        console.log('Allowance GET LATEST request failed', error);
    }
}

function* fetchNextAllowanceInfo(action) {
    try {
        const response = yield axios.get(`/api/allowance/next/${action.payload}`);
        yield put({ type: 'SET_NEXT_ALLOWANCE', payload: response.data });
    } catch (error) {
        console.log('Allowance GET NEXT ALLOWANCE INFO request failed', error);
    }
}

function* updateAllowance(action) {
    try {
        yield axios.put('/api/allowance/update-deposit-flag', action.payload);
        yield put({ type: 'UNSET_ALLOWANCE' });
        yield put({ type: 'UPDATE_ALLOWANCE_FLAG', payload: action.payload.depositedFlagColumn });
    } catch (error) {
        console.log('set deposit flag error is:', error);
    }
}

function* allowanceSaga() {
    //yield takeLatest('FETCH_ALLOWANCE', fetchAllowance);
    yield takeLatest('GET_NEXT_ALLOWANCE_INFO', fetchNextAllowanceInfo);
    yield takeLatest('FETCH_LATEST_ALLOWANCE', fetchLatestAllowance);
    yield takeLatest('UPDATE_ALLOWANCE', updateAllowance);
    yield takeLatest('CREATE_ALLOWANCE_RECORD', createNewAllowanceRecord);
}

export default allowanceSaga;