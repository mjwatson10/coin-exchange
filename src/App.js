import React from 'react';
import CoinList from './components/CoinList/CoinList';
import CoinHeader from './components/CoinHeader/CoinHeader';
import AccountBalance from './components/AccountBalance/AccountBalance';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';


const Div = styled.div`
    text-align: center;
    background-color: darkblue;
    color: #CCCCCC;
`;


class App extends React.Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: [
      {
        // key: uuidv4(),
        name: 'Bitcoin',
        ticker: 'BTC',
        balance: 0.5,
        price: 9999.99
      },
      {
        // key: uuidv4(),
        name: 'Ethereum',
        ticker: 'ETH',
        balance: 32,
        price: 299.99
      },
      {
        // key: uuidv4(),
        name: 'Tether',
        ticker: 'USDT',
        balance: 0,
        price: 1.00
      },
      {
        // key: uuidv4(),
        name: 'Ripple',
        ticker: 'XRP',
        balance: 1000,
        price: 0.2
      },
      {
        // key: uuidv4(),
        name: 'Bitcoin Cash',
        ticker: 'BCH',
        balance: 0,
        price: 298.99
      }
    ]
  }


  handleBalanceVisibilityChange = () => {
    this.setState(function(oldState) {
      return{
        ...oldState,
        showBalance: !oldState.showBalance
      }
    });
  }

  handleRefresh = (valueChangeTicker) => {
    const newCoinData = this.state.coinData.map((values) => {
      let newValues = {...values};
      if (valueChangeTicker === newValues.ticker) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newValues.price *= randomPercentage;
      }
      return newValues
    });
    this.setState({coinData: newCoinData});
  }

  render(){
    return (
      <Div className="App">

        <CoinHeader />
        <AccountBalance
            amount={this.state.balance}
            showBalance={this.state.showBalance}
            handleBalanceVisibilityChange={this.handleBalanceVisibilityChange}
          />
        <CoinList
            coinData={this.state.coinData}
            showBalance={this.state.showBalance}
            handleRefresh={this.handleRefresh}
          />

      </Div>
    );
  }
}

export default App;
