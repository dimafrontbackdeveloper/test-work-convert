import React, { useState } from 'react';

import euro from './../../../assets/images/euro-flag.jpg';
import dollar from './../../../assets/images/america-flag.jpg';
import hryvnia from './../../../assets/images/ukraine-flag.jpg';

const CurrencyConversionColumn = () => {
  const [isVisibleChooseCurrency, setIsVisibleChooseCurrency] = useState(false);

  const closeChoose = () => {
    setIsVisibleChooseCurrency(false);
  };

  const toggleVisibleChooseCurrency = (e) => {
    e.stopPropagation();
    setIsVisibleChooseCurrency((prev) => !prev);
  };

  return (
    <div class="currency-conversion__column">
      <div class="currency-conversion__choose">
        <div
          class="currency-conversion__choose-visible d-f jc-sb ai-c"
          onClick={toggleVisibleChooseCurrency}>
          <div class="currency-conversion__choose-visible-left d-f ai-c">
            <span>
              <img src={euro} alt="flag" />
            </span>
            <span>EUR</span>
          </div>
          <div class="currency-conversion__choose-visible-right">&#9660;</div>
        </div>
        <ul
          class={`currency-conversion__choose-hidden ${
            isVisibleChooseCurrency && 'currency-conversion__choose-hidden--active'
          }`}>
          <li class="d-f ai-c">
            <span>
              <img src={euro} alt="flag" />
            </span>
            <span>EUR</span>
          </li>
          <li>
            <span>
              <img src={euro} alt="flag" />
            </span>
            <span>EUR</span>
          </li>
          <li>
            <span>
              <img src={euro} alt="flag" />
            </span>
            <span>EUR</span>
          </li>
        </ul>
      </div>
      <input class="currency-conversion__amount" value={1} />
      <div class="currency-conversion__bottom d-f">
        <button>UAH</button>
        <button>USD</button>
        <button>EUR</button>
      </div>
    </div>
  );
};

export default CurrencyConversionColumn;
