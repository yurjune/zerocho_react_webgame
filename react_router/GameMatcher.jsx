import React, { Component } from 'react';
import NumberBaseball from '../3_numberBaseball/NumberBaseballClass';
import RSP from '../5_rockScissorsPaper/RSPClass';
import Lotto from '../6_lotto/LottoClass';

class GameMatcher extends Component {
  render() {
    // 쿼리스트링
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlSearchParams.get('hello'));

    /* this.props에 담긴 것: history, match, location */
    console.log(this.props)
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseball />
    } else if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RSP />
    } else if (this.props.match.params.name === 'lotto-generator') {
      return <Lotto />
    }
    return (
      <div>일치하는 게임이 없습니다.</div>
    )
  }
}

export default GameMatcher;
