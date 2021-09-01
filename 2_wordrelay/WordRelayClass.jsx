const React = require('react');
const { Component } = React;

class WordRelay extends Component {
  // 클래스필드 방식: constructor 사용하지 않음
  state = {
    word: '비행기',
    value: '',
    result: '',
  };

  // 직접 만든 메소드는 화살표 함수를 써야한다(this를 자동으로 bind)
  // 그렇지 않으면 메소드에 this를 수동으로 bind 해줘야 한다
  onSubmitForm = (e) => {
    console.log(this);
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
