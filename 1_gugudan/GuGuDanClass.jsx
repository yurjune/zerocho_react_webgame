const React = require('react');

class GuGuDan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: Math.ceil(Math.random() * 9),
      second: Math.ceil(Math.random() * 9),
      value: '',
      result: '',
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState((prevState) => {
        return {  // return으로 감싸고 prevState 활용, setState는 비동기
          result: `${prevState.first} x ${prevState.second} = ${prevState.value} 정답`,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: '',
        };  
      });
    } else {
      this.setState({
        result: '땡', 
        value: '',
      });
    }
    this.input.focus();
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  input;
  onRefInput = (ref) => {
    this.input = ref; // this.input은 input의 DOM에 접근하는 것
  }

  render() {
    return(
      <React.Fragment>
        <div>{this.state.first} 곱하기 {this.state.second}는?</div>
        <form onSubmit={this.onSubmit}>
          <input ref={this.onRefInput} type="number" value={this.state.value} onChange={this.onChange} />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </React.Fragment>
    )
  }
}

module.exports = GuGuDan;
