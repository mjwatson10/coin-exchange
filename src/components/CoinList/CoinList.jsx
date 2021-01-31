import React, { Component } from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';


const Table = styled.table`
    margin: 50px, auto, 50px, auto;
    display: inline-block;
    font-size: 1.4rem;
`;

export default class CoinList extends Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Price</th>
            {this.props.showBalance ? <th>Balance</th> : null}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          this.props.coinData.map(({key, name, ticker, price, balance}) =>
              //the ...value enumerates the key values pars as props, basically taking each value from the objects in order and placing it in the tbody
              <Coin key={ticker}
                    handleRefresh={this.props.handleRefresh}
                    name={name}
                    ticker={ticker}
                    showBalance={this.props.showBalance}
                    balance={balance}
                    price={price}
              />
            )
        }
        </tbody>
      </Table>
    )
  }
}
