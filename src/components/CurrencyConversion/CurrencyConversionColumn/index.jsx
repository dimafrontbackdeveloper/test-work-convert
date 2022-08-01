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
    <div className="currency-conversion__column">
      <div className="currency-conversion__choose">
        <div
          className="currency-conversion__choose-visible d-f jc-sb ai-c"
          onClick={(e) => changeVisibleOfChooseCurrency(e)(id)}>
          <div className="currency-conversion__choose-visible-left d-f ai-c">
            <span>
              <img src={currencies[indexOfActiveCurrency].img} alt="flag" />
            </span>
            <span>{currencies[indexOfActiveCurrency].text}</span>
          </div>
          <div
            className={`currency-conversion__choose-visible-right ${
              indexOfVisibleChooseCurrency === id &&
              'currency-conversion__choose-visible-right--active'
            }`}>
            &#9660;
          </div>
        </div>
        <ul
          className={`currency-conversion__choose-hidden ${
            indexOfVisibleChooseCurrency === id && 'currency-conversion__choose-hidden--active'
          }`}
          onClick={(e) => e.stopPropagation()}>
          {currencies.map((currency, i) => {
            return (
              <li
                key={`${currency.text}__${i}`}
                className="d-f ai-c"
                onClick={(e) => {
                  setIndexOfActiveCurrency(i);
                  changeVisibleOfChooseCurrency(e)(null);
                }}>
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
        className="currency-conversion__amount"
        value={inputValue}
        onChange={(e) => changeInputValue(e)(id)}
      />
      <div className="currency-conversion__bottom d-f">
        {currencies.map((currency, i) => {
          return (
            <button key={`${currency.text}__${i}`} onClick={() => setIndexOfActiveCurrency(i)}>
              {currency.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CurrencyConversionColumn;
