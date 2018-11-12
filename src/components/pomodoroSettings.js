import React from 'react';


class PomodoroSettings extends React.Component{
	render(){

		const { setBreakLength, 
			setSessionLength,
			breakReducer,
			sessionReducer
		} = this.props;

		return(
			<div id="previewSettings">
	          <div id="break-label">
	              <h3>Break Length</h3>
	              <div className="containerPreviewSettings">
		              <button id="break-increment" onClick = {(e) => {setBreakLength(e)}} >+</button>
		              <div id="break-length">{breakReducer}</div>
		              <button id="break-decrement" onClick = {(e) => {setBreakLength(e)}} >-</button>
		          </div>
	          </div>
	            <div id="session-label">
	              <h3>Session Length</h3>
	              <div className="containerPreviewSettings">
	              <button id="session-increment" onClick = { (e) => {setSessionLength(e)}}>+</button>
	              <div id="session-length">{sessionReducer}</div>
	              <button id="session-decrement" onClick = { (e) => {setSessionLength(e)}}>-</button>
	              </div>
	            </div>
	        </div>
			)
	}
}

export default PomodoroSettings;