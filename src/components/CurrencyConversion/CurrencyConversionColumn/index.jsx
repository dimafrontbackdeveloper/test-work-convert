import React, { useState } from 'react';

import euro from './../../../assets/images/euro-flag.jpg';
import dollar from './../../../assets/images/america-flag.jpg';
import hryvnia from './../../../assets/images/ukraine-flag.jpg';

const CurrencyConversionColumn = ({ currencies }) => {
  return (
    <div class="currency-conversion__column">
      <div class="currency-conversion__choose">
        <div
          class="currency-conversion__choose-visible d-f jc-sb ai-c"
          // onClick={toggleVisibleOfFirstChoose}
        >
          <div class="currency-conversion__choose-visible-left d-f ai-c">
            <span>
              <img src={`currencies[indexOfActiveCurrencyOfFirst].img`} alt="flag" />
            </span>
            <span>{`currencies[indexOfActiveCurrencyOfFirst].text`}</span>
          </div>
          <div class="currency-conversion__choose-visible-right">&#9660;</div>
        </div>
        {/* <ul
                  class={`currency-conversion__choose-hidden ${
                    isVisibleFirstChoose && 'currency-conversion__choose-hidden--active'
                  }`}
                  onClick={(e) => e.stopPropagation()}>
                  {currencies.map((currency, i) => {
                    return (
                      <li
                        class="d-f ai-c"
                        onClick={() => {
                          setIndexOfActiveCurrencyOfFirst(i);
                          closeChoose(1);
                        }}
                        key={i + '_' + currencies.text}>
                        <span>
                          <img src={currency.img} alt="flag" />
                        </span>
                        <span>{currency.text}</span>
                      </li>
                    );
                  })}
                </ul> */}
      </div>
      <input
        class="currency-conversion__amount"
        // value={firstInputValue}
        // onChange={changeFirstInputValue}
      />
      <div class="currency-conversion__bottom d-f">
        {/* {currencies.map((currency, i) => {
                  return (
                    <button onClick={() => setIndexOfActiveCurrencyOfFirst(i)}>
                      {currency.text}
                    </button>
                  );
                })} */}
      </div>
    </div>
  );
};

export default CurrencyConversionColumn;
