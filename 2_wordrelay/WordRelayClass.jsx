const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  state = {
    word: '비행기',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '정답',
        word: this.state.value,
        value: '',
      });
    } else {
      this.setState({
        result: '땡',
        value: '',
      })
    }
    this.input.focus();
  }

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  }

  input;
  onRefInput = (ref) => {
    this.input = ref;
  }

  render() {
    return (
    <>
    <div>제시어: {this.state.word}</div>
    <form onSubmit={this.onSubmitForm}>
      <input ref={this.onRefInput} type="text" value={this.state.value} onChange={this.onChangeInput}/>
      <button>입력</button>
    </form>
    <div>{this.state.result}</div>
    </>
    )
  }
}

module.exports = WordRelay;
