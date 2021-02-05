import React, {useState, useEffect} from 'react';
import CoinList from './components/CoinList/CoinList';
import CoinHeader from './components/CoinHeader/CoinHeader';
import AccountBalance from './components/AccountBalance/AccountBalance';
// import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import axios from 'axios';


const Div = styled.div`
    text-align: center;
    background-color: darkblue;
    color: #CCCCCC;
`;

const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(4));


function App(props) {
  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async() => {
    const response = await axios.get('https://api.coinpaprika.com/v1/coins');

    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);


    const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id));

    const coinData = await Promise.all(promises);
    console.log("CoinData: ", coinData);

    const coinPriceData = coinData.map(function(response) {
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes.USD.price),
      };
    });
    setCoinData(coinPriceData);
  }

  useEffect(() => {
    if (coinData.length === 0) {
      //component did mount
      componentDidMount();
    }
    /*else {
      //component did update
    }*/
  });

  // componentDidMount = async() => {
  //   const response = await axios.get('https://api.coinpaprika.com/v1/tickers');
  //   const coinData = response.data.slice(0, COIN_COUNT).map(coin => {
  //     return {
  //       key: coin.id,
  //       name: coin.name,
  //       ticker: coin.symbol,
  //       balance: 0,
  //       price: parseFloat(Number(coin.quotes.USD.price).toFixed(4)),
  //     }
  //   });
  //   this.setState({coinData});
  // }


  const handleBalanceVisibilityChange = () => {
    setShowBalance(oldValue => !oldValue);
  }

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    const newPrice = formatPrice(response.data.quotes.USD.price);

    const newCoinData = coinData.map((values) => {
      let newValues = {...values};
      if (valueChangeId === values.key) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newValues.price = newPrice;
      }
      return newValues
    });
    setCoinData(newCoinData);
  }
    return (
      <Div className="App">

        <CoinHeader />
        <AccountBalance
            amount={balance}
            showBalance={showBalance}
            handleBalanceVisibilityChange={handleBalanceVisibilityChange}
          />
        <CoinList
            coinData={coinData}
            showBalance={showBalance}
            handleRefresh={handleRefresh}
          />

      </Div>
    );
}

export default App;
