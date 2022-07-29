import React, { useState } from 'react';

const CurrencyConversionColumn = ({
  id,
  indexOfActiveCurrency,
  setIndexOfActiveCurrency,
  inputValue,
  changeInputValue,
  currencies,
  changeVisibleOfChooseCurrency,
  indexOfVisibleChooseCurrency,
}) => {
  return (
    <div class="currency-conversion__column">
      <div class="currency-conversion__choose">
        <div
          class="currency-conversion__choose-visible d-f jc-sb ai-c"
          onClick={(e) => changeVisibleOfChooseCurrency(e)(id)}>
          <div class="currency-conversion__choose-visible-left d-f ai-c">
            <span>
              <img src={currencies[indexOfActiveCurrency].img} alt="flag" />
            </span>
            <span>{currencies[indexOfActiveCurrency].text}</span>
          </div>
          <div
            class={`currency-conversion__choose-visible-right ${
              indexOfVisibleChooseCurrency === id &&
              'currency-conversion__choose-visible-right--active'
            }`}>
            &#9660;
          </div>
        </div>
        <ul
          class={`currency-conversion__choose-hidden ${
            indexOfVisibleChooseCurrency === id && 'currency-conversion__choose-hidden--active'
          }`}
          onClick={(e) => e.stopPropagation()}>
          {currencies.map((currency, i) => {
            return (
              <li
                class="d-f ai-c"
                onClick={(e) => {
                  setIndexOfActiveCurrency(i);
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
        value={inputValue}
        onChange={(e) => changeInputValue(e)(id)}
      />
      <div class="currency-conversion__bottom d-f">
        {currencies.map((currency, i) => {
          return <button onClick={() => setIndexOfActiveCurrency(i)}>{currency.text}</button>;
        })}
      </div>
    </div>
  );
};

export default CurrencyConversionColumn;
