import {combineReducers} from 'redux'

const initialState = {
    loggedIn: false
};

const authReducer = (state=initialState, action :any) => { 
    switch(action.type){
        default:
            return state;
        case 'auth/login':
            return {
                ...state,
                loggedIn: true
            }
        case 'auth/logout':
            return {
                ...state,
                loggedIn: false
            }
    }
}

const rootReducer = combineReducers({
    auth : authReducer,
});

export default rootReducer;
