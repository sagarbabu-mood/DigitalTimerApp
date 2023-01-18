import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {minutes: 25, seconds: '00', isTimerOn: false}

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onIncrement = () => {
    const {isTimerOn} = this.state
    if (!isTimerOn) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
      }))
    }
  }

  onDecrement = () => {
    const {isTimerOn} = this.state
    if (!isTimerOn) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    }
  }

  getPauseOrStartText = () => {
    const {isTimerOn} = this.state
    const value = isTimerOn ? 'Pause' : 'Start'
    return value
  }

  getPauseOrRunningText = () => {
    const {isTimerOn} = this.state
    const value = isTimerOn ? 'Running' : 'Paused'
    return value
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({minutes: 25, seconds: '00', isTimerOn: false})
  }

  startOrPauseTimer = () => {
    this.setState(prevState => ({
      isTimerOn: !prevState.isTimerOn,
    }))
    const {isTimerOn} = this.state
    console.log(isTimerOn)
    if (!isTimerOn) {
      this.timerId = setInterval(this.tick, 1000)
    }
  }

  tick = () => {
    const {minutes, seconds} = this.state
    console.log(minutes, seconds)
    if (seconds <= 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    } else if (seconds < 10 && seconds > 0) {
      const time = 0 + seconds
      this.setState({seconds: time})
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
  }

  render() {
    const {minutes, seconds} = this.state

    return (
      <>
        <div className="bg-container">
          <h1>Digital Timer</h1>
          <div className="timer-and-reset-container">
            <div className="timer-container">
              <div className="timer-text-container">
                <h1 className="timer">
                  {minutes}:{seconds}
                </h1>
                <p className="timer-text">{this.getPauseOrRunningText()}</p>
              </div>
            </div>
            <div className="reset-container">
              <div className="buttons-container">
                <div className="container">
                  <button type="button" onClick={this.startOrPauseTimer}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                    />
                    {this.getPauseOrStartText()}
                  </button>
                </div>
                <div className="container">
                  <button type="button" onClick={this.onReset}>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                    />
                    Reset
                  </button>
                </div>
              </div>
              <div className="plus-and-minus-buttons-container">
                <p>Set Timer Limit</p>
                <div className="plus-and-minus">
                  <button
                    className="icon"
                    type="submit"
                    onClick={this.onDecrement}
                  >
                    -
                  </button>
                  <p className="fixed-timer">{minutes}</p>
                  <button
                    className="icon"
                    type="submit"
                    onClick={this.onIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default DigitalTimer
