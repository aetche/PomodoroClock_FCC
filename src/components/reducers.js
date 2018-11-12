import { combineReducers } from 'redux';


const breakReducer = (state = 5, action) => {
    switch (action.type){
        case 'BREAK_INCREMENT':
            return state + 1 > 60 ? 60 : state + 1;
        case 'BREAK_DECREMENT':
            return state - 1 <= 1 ? 1 : state - 1;
        case 'RESET':
            return 5;
        default:
            return state;
    }
};

const sessionReducer = (state = 25, action) => {
    switch (action.type){
        case 'SESSION_INCREMENT':
            return state + 1 > 60 ? 60 : state + 1;
        case 'SESSION_DECREMENT':
            return state - 1 <= 1 ? 1 : state - 1;
        case 'RESET':
            return 25;
        default:
            return state;
    }

};

const timerLabelReducer = (state = 'Session', action) => {
    switch (action.type){
        case 'RESET':
            return 'Session';
        default:
            return state;
    }
};

const isRunningReducer = (state = false, action) => {
    switch (action.type){
        case 'TOOGLE_PLAY_PAUSE':
            return !state;
        case 'RESET':
            return false;
        default:
            return state;
    }
};


const initialTimer = {
    seconds: 1500, 
    session: 25,
    break: 5,
    label: 'Session'
}

const timerReducer = (state = initialTimer, action) => {
    switch(action.type){
        case 'SESSION_INCREMENT':
            let newSession = state.session + 1 > 60 ? 60 : state.session + 1;
            let currentSeconds = newSession*60;
            return {
                ...state,
                session: newSession,
                seconds: currentSeconds
            }
        case 'SESSION_DECREMENT':
            newSession = state.session - 1 <= 1 ? 1 : state.session - 1;
            currentSeconds = newSession * 60;
            return {
                ...state,
                session:newSession,
                seconds: currentSeconds
            }
        case 'BREAK_INCREMENT':
            return{
                ...state,
                break: state.break + 1 > 60 ? 60 : state.break + 1
            }
        case 'BREAK_DECREMENT':
            return {
                ...state,
                break: state.break - 1 <= 1 ? 1 : state.break - 1
            };
        case 'START_COUNTDOWN':
            let currentLabel;
            if(state.seconds === 0 && state.label === 'Session'){
                currentSeconds = state.break*60 + 1;
                currentLabel = 'Break';
            }
            else if (state.seconds === 0 && state.label === 'Break'){
                currentSeconds = state.session*60 + 1;   
                currentLabel = 'Session';
            }
            else{
                currentSeconds = state.seconds;
                currentLabel = state.label
            }
            return {
                ...state,
                label: currentLabel,
                seconds: currentSeconds -1
            };
        case 'RESET':
            return initialTimer;
        default:
            return state;
    }
}


const allReducers = combineReducers({
    breakReducer,
    sessionReducer,
    timerLabelReducer,
    isRunningReducer,
    timerReducer,
})

export default allReducers;