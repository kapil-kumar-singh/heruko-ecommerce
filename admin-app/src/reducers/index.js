import { combineReducers } from 'redux';
import authReducer from './auth_reducers';
import userReducer from './user_reducers';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default rootReducer;




// export default ( state = { name : "kapil" }, action ) => {
//     return state;
// }