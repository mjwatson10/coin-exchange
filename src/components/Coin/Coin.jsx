import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Td = styled.td`
  border: 1px solid#cccccc;
  width: 25vh;
`;


export default function Coin(props) {

const handleClick = (event) => {
  event.preventDefault();

  props.handleRefresh(props.tickerId);

}

const handleBuy = (event) => {
  event.preventDefault();
  props.handleBuyCoins(props.tickerId);
}

const handleSell = (event) => {
  event.preventDefault();
  props.handleSellCoins(props.tickerId);
}

        return(
          <tr>
            <Td>{props.name}</Td>
            <Td>{props.ticker}</Td>
            <Td>${props.price}</Td>
            {props.showBalance ? <Td>${props.balance}</Td> : null}
            <Td>
              <form action="#" method="POST">
                <button onClick={handleClick}>Refresh</button>
                <button onClick={handleBuy}>Buy</button>
                <button onClick={handleSell}>Sell</button>
              </form>
            </Td>
          </tr>
        );
}


Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
