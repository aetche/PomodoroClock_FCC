import React, { Component } from 'react';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PomodoroSettings from './components/pomodoroSettings';
import PomodoroTimer from './components/pomodoroTimer';

// import * as allActions from './components/actions';



const START_COUNTDOWN = 'START_COUNTDOWN';
const TOOGLE_PLAY_PAUSE = 'TOOGLE_PLAY_PAUSE';
const RESET = 'RESET';
const BREAK_ADD = 'BREAK_ADD';
const BREAK_SUSTRACT = 'BREAK_SUSTRACT';
const SESSION_ADD = 'SESSION_ADD';
const SESSION_SUSTRACT = 'SESSION_SUSTRACT';

const actions = {
  startCountdown: ()=>{
    return{
      type: START_COUNTDOWN,
    }
  },
  tooglePlayPause: ()=>{
    return{
      type: TOOGLE_PLAY_PAUSE,
    }
  },
  reset: ()=>{
    return{
      type: RESET,
    }
  },
  breakAdd: () => {
    return{
      type: BREAK_ADD,
    }
  },
  breakSustract: () => {
    return{
      type: BREAK_SUSTRACT,
    }
  },
  sessionAdd: () => {
    return{
      type: SESSION_ADD,
    }
  },
  sessionSustract: () => {
    return{
      type: SESSION_SUSTRACT,
    }
  },
   
}

// REDUCERS

const initialState = {
  sessionLength: 25,
  breakLength: 5,
  time: 1500,
  isRunning: false,
  timerLabel: 'Session'
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case START_COUNTDOWN:
      let newTime;
      let newLabel;
      if(state.time === 0 && state.timerLabel === 'Session'){
        newTime = state.breakLength*60+1;
        newLabel = 'Break'
      }
      else if(state.time === 0 && state.timerLabel === 'Break'){
        newTime = state.sessionLength*60+1;
        newLabel = 'Session'
      }
      else{
        newTime = state.time;
        newLabel = state.timerLabel
      }
      return {
         ...state,
         time: newTime - 1,
         timerLabel: newLabel
          };
    case TOOGLE_PLAY_PAUSE:
      return{
        ...state,
        isRunning: !state.isRunning
      };
    case RESET:
      return initialState;
    case BREAK_ADD:
      return {
        ...state,
        breakLength: state.breakLength + 1
      };
    case BREAK_SUSTRACT:
      return {
        ...state,
        breakLength: state.breakLength - 1
      };
    case SESSION_ADD:
      return {
        ...state,
        sessionLength: state.sessionLength + 1,
        time: state.time + 60
      };
    case SESSION_SUSTRACT:
      return {
        ...state,
        sessionLength: state.sessionLength - 1,
        time: state.time - 60,
      };
    default:
      return initialState;
  }
};


const showTime = (time) => {
  let min = Math.floor(time/60);
  let sec = time - min*60;
  min = min < 10 ? `0${min}` : min;
  sec = sec < 10 ? `0${sec}` : sec;
  return `${min}:${sec}`;
}

let intervalID


class App2 extends Component{
  
  constructor(props){
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.audioBeep = this.audioBeep.bind(this);
  }
  
  audioBeep(){
    if(this.props.time === 0){
      this.refs.audio.play();
    }
  }
  
  handlePlay(e){
    e.preventDefault();
    if( !this.props.isRunning){
      this.props.tooglePlayPause();
      intervalID = setInterval(()=>{ this.props.startCountdown(); this.audioBeep() }, 1000);
    }
    else{
      this.props.tooglePlayPause();
      clearInterval(intervalID);
    }
  }
  
  handleReset(e){
    e.preventDefault();
    this.refs.audio.pause();
    this.refs.audio.currentTime = 0;
    clearInterval(intervalID);
    this.props.reset();
    console.log(this.props)
  }
  
  breakIncrement(e){
    e.preventDefault();
    if (this.props.breakLength<60){
      this.props.breakAdd();  
    }
  }
  breakDecrement(e){
    e.preventDefault();
    if(this.props.breakLength>1){
      this.props.breakSustract()
    }
  }
  sessionIncrement(e){
    e.preventDefault();
    if (this.props.sessionLength<60){
      this.props.sessionAdd();  
    }
  }
  sessionDecrement(e){
    e.preventDefault();
    if(this.props.sessionLength>1){
      this.props.sessionSustract()
    }
  }
  
  render(){
    return(
      <div id="containerPomodoroApp">
        <h1>Pomodoro Clock</h1>
        <div id="previewSettings">
          <div id="break-label">
              <h3>Break Length</h3>
              <button id="break-increment" onClick={this.breakIncrement} value="breakAdd">+</button>
              <button id="break-decrement" onClick={this.breakDecrement} value="breakSubtract">-</button>
              <div id="break-length">{this.props.breakLength}</div>
          </div>
            <div id="session-label">
              <h3>Session Length</h3>
              <button id="session-increment" onClick={this.sessionIncrement} value="sessionAdd">+</button>
              <button id="session-decrement" onClick={this.sessionDecrement} value="sessionSubtract">-</button>
              <div id="session-length">{this.props.sessionLength}</div>
            </div>
        </div>
        
        <div>
        <div id="containerTimer">
          <div id="timer-label">{this.props.timerLabel}</div>
          <div id="time-left">{showTime(this.props.time)}</div>
          <div className="buttons">
        <button id="start_stop" onClick={this.handlePlay}>{this.props.isRunning ? 'Pause' : 'Play'}</button>
        <button id="reset" onClick={this.handleReset}>Reset</button>
      </div>
        </div>
        
        <audio ref="audio" id="beep" src="https://goo.gl/65cBl1"></audio>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        sessionLength: state.sessionLength,
	    breakLength: state.breakLength,
	    time: state.time,
	    isRunning: state.isRunning,
	    timerLabel: state.timerLabel
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App2);