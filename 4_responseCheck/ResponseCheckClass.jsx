import React, { Component } from 'react';
import RenderAverage from './RenderAverageClass';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요',
    result: [],
  }

  timeout;
  startTime;
  endTime;

  onClickScreen = () => {
    const { state } = this.state;
    if (state === 'waiting') {
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭',
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);  // 2~3초 사이 
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요',
      })
    } else if (state === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
      })
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState(prevState => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요',
          result: [...prevState.result, this.endTime - this.startTime]
        }
      });
    }
  }

  onReset = () => {
    this.setState({ result: [] });
  }

  render() {
    const { state, message, result } = this.state;
    return (
      <>
        <div id='screen' className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        <RenderAverage resultInfo={result} resetInfo={this.onReset}/>
      </>
    );
  }
}

export default ResponseCheck;
