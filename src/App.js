import React, { Component } from 'react';
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PomodoroSettings from './components/pomodoroSettings';
import PomodoroTimer from './components/pomodoroTimer';

import * as allActions from './components/actions';


class App extends Component {
  render() {
    const {
            setBreakLength,
            setSessionLength,
            reset,
            startCountdown,
            tooglePlayPause,
            breakReducer,
            sessionReducer,
            timerLabelReducer,
            isRunningReducer,
            timerReducer,
        } = this.props;

    return (
      <div className="App">
        <header className="App-header">
        <h1>Pomodoro Clock</h1>
        </header>
        <div id="containerClock">
          <PomodoroSettings 
            setBreakLength = { setBreakLength }
            setSessionLength = { setSessionLength }
            breakReducer = { breakReducer }
            sessionReducer = { sessionReducer }
          />
          <PomodoroTimer 
          reset = { reset }
          startCountdown = { startCountdown }
          tooglePlayPause = { tooglePlayPause }
          timerLabelReducer = { timerLabelReducer }
          isRunningReducer = { isRunningReducer }
          timerReducer = { timerReducer }
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        breakReducer: state.breakReducer,
        sessionReducer: state.sessionReducer,
        timerLabelReducer: state.timerLabelReducer,
        isRunningReducer: state.isRunningReducer,
        timerReducer: state.timerReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...allActions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);