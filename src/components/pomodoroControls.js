import React from 'react';

let intervalID
class PomodoroControls extends React.Component{
	constructor(props){
		super(props);
		this.handlePlay = this.handlePlay.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.audioBeep = this.audioBeep.bind(this);
	}

	handlePlay(e){
		e.preventDefault();
		if ( !this.props.isRunningReducer ){
			intervalID = setInterval( () => { 
				this.props.startCountdown(this.props.timerLabelReducer, this.props.breakReducer,
            this.props.sessionReducer); 
				this.audioBeep()}, 1000);
		}
		else{
			clearInterval(intervalID);
		}
		this.props.tooglePlayPause();
	}

	handleReset(e){
		e.preventDefault();
		this.refs.audio.pause();
		this.refs.audio.currentTime = 0;
		clearInterval(intervalID);
		this.props.reset();
	}

	audioBeep(){
	    if(this.props.timerReducer.seconds === 0){
	      this.refs.audio.play();
	    }
	  }

	render(){
		
		const {
			isRunningReducer
		} = this.props;

		return(
	          <div className="buttons">
		        <button id="start_stop" onClick = {this.handlePlay}> { isRunningReducer ? 'Pause' : 'Play'} </button>
		        <button id="reset" onClick = {this.handleReset}> Reset </button>
		        <audio ref="audio" id="beep" src="https://goo.gl/65cBl1"></audio>
		      </div>
			)
	}
}

export default PomodoroControls;