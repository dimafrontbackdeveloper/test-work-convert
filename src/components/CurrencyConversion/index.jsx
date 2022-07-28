import React from 'react';
import CurrencyConversionColumn from './CurrencyConversionColumn';

import change from './../../assets/images/change.png';

const CurrencyConversion = () => {
  return (
    <div class="currency-conversion">
      <div class="container">
        <div class="currency-conversion__block">
          <div class="currency-conversion__row d-g ai-c">
            <CurrencyConversionColumn />
            <div class="currency-conversion__column">
              <img class="currency-conversion__change" src={change} alt="change" />
            </div>
            <CurrencyConversionColumn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConversion;
