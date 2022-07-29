import React from 'react';
import CurrencyConversionColumn from './CurrencyConversionColumn';

import change from './../../assets/images/change.png';

const CurrencyConversion = ({
  indexOfActiveCurrencyOfFirst,
  indexOfActiveCurrencyOfSecond,
  currencies,
  setIndexOfActiveCurrencyOfFirst,
  firstInputValue,
  changeFirstInputValue,
  secondInputValue,
  changeSecondInputValue,
  setIndexOfActiveCurrencyOfSecond,

  indexOfVisibleChooseCurrency,
  changeVisibleOfChooseCurrency,
}) => {
  return (
    <div class="currency-conversion">
      <div class="container">
        <div class="currency-conversion__block">
          <div class="currency-conversion__row d-g ai-c">
            <div class="currency-conversion__column">
              <div class="currency-conversion__choose">
                <div
                  class="currency-conversion__choose-visible d-f jc-sb ai-c"
                  onClick={(e) => changeVisibleOfChooseCurrency(e)(0)}>
                  <div class="currency-conversion__choose-visible-left d-f ai-c">
                    <span>
                      <img src={currencies[indexOfActiveCurrencyOfFirst].img} alt="flag" />
                    </span>
                    <span>{currencies[indexOfActiveCurrencyOfFirst].text}</span>
                  </div>
                  <div class="currency-conversion__choose-visible-right">&#9660;</div>
                </div>
                <ul
                  class={`currency-conversion__choose-hidden ${
                    indexOfVisibleChooseCurrency === 0 &&
                    'currency-conversion__choose-hidden--active'
                  }`}
                  onClick={(e) => e.stopPropagation()}>
                  {currencies.map((currency, i) => {
                    return (
                      <li
                        class="d-f ai-c"
                        onClick={(e) => {
                          setIndexOfActiveCurrencyOfFirst(i);
                          changeVisibleOfChooseCurrency(e)(null);
                        }}
                        key={i + '_' + currencies.text}>
                        <span>
                          <img src={currency.img} alt="flag" />
                        </span>
                        <span>{currency.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <input
                class="currency-conversion__amount"
                value={firstInputValue}
                onChange={changeFirstInputValue}
              />
              <div class="currency-conversion__bottom d-f">
                {currencies.map((currency, i) => {
                  return (
                    <button onClick={() => setIndexOfActiveCurrencyOfFirst(i)}>
                      {currency.text}
                    </button>
                  );
                })}
              </div>
            </div>
            <div class="currency-conversion__column">
              <div class="currency-conversion__choose">
                <div
                  class="currency-conversion__choose-visible d-f jc-sb ai-c"
                  onClick={(e) => changeVisibleOfChooseCurrency(e)(1)}>
                  <div class="currency-conversion__choose-visible-left d-f ai-c">
                    <span>
                      <img src={currencies[indexOfActiveCurrencyOfSecond].img} alt="flag" />
                    </span>
                    <span>{currencies[indexOfActiveCurrencyOfSecond].text}</span>
                  </div>
                  <div class="currency-conversion__choose-visible-right">&#9660;</div>
                </div>
                <ul
                  class={`currency-conversion__choose-hidden ${
                    indexOfVisibleChooseCurrency === 1 &&
                    'currency-conversion__choose-hidden--active'
                  }`}
                  onClick={(e) => e.stopPropagation()}>
                  {currencies.map((currency, i) => {
                    return (
                      <li
                        class="d-f ai-c"
                        onClick={(e) => {
                          setIndexOfActiveCurrencyOfSecond(i);
                          changeVisibleOfChooseCurrency(e)(null);
                        }}
                        key={i + '_' + currencies.text}>
                        <span>
                          <img src={currency.img} alt="flag" />
                        </span>
                        <span>{currency.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <input
                class="currency-conversion__amount"
                value={secondInputValue}
                onChange={changeSecondInputValue}
              />
              <div class="currency-conversion__bottom d-f">
                {currencies.map((currency, i) => {
                  return (
                    <button onClick={() => setIndexOfActiveCurrencyOfSecond(i)}>
                      {currency.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConversion;
