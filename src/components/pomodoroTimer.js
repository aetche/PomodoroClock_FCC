import React from 'react';
import PomodoroControls from './pomodoroControls';


const showTime = (time) => {
	let minutes = Math.floor(time / 60);
	let seconds = time - minutes*60;
	minutes = minutes < 10 ? '0'+ minutes : minutes;
	seconds = seconds < 10 ? '0'+ seconds : seconds;
	return minutes + ':' + seconds;
}

class PomodoroTimer extends React.Component{
	render(){
		const { 
			reset,
			startCountdown,
			tooglePlayPause,
			timerLabelReducer,
            isRunningReducer,
            timerReducer,
		} = this.props;

		return(
			<div id="containerTimer">
	          <div id="timer-label">{ timerReducer.label }</div>
	          <div id="time-left"> {showTime(timerReducer.seconds)}</div>
	          < PomodoroControls 
	          reset = {reset}
	          startCountdown = { startCountdown }
	          tooglePlayPause = { tooglePlayPause }
	          timerReducer = { timerReducer }
	          isRunningReducer = { isRunningReducer }
	          timerLabelReducer = { timerLabelReducer }
	          />
	        </div>
			)
	}
}

export default PomodoroTimer;