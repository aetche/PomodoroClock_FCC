export const setBreakLength = (event) => {
    const direction = event.target.id === 'break-increment' ? 'BREAK_INCREMENT' : 'BREAK_DECREMENT';
    return {
        type: direction,
    };
}

export const setSessionLength = (event) => {
    const direction = event.target.id === 'session-increment' ? 'SESSION_INCREMENT' : 'SESSION_DECREMENT';
    return {
        type: direction,
    };
}

export const reset = () => {
    return {
        type: 'RESET',
    };
}

export const startCountdown = (label, breakLength, sessionLength) => {
    return {
        type: 'START_COUNTDOWN',
        label
    };
}

export const tooglePlayPause = () => {
    return{
        type: 'TOOGLE_PLAY_PAUSE',
    };
}