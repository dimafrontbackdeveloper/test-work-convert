import React from 'react';
import CurrencyConversionColumn from './CurrencyConversionColumn';

const CurrencyConversion = ({
  indexOfActiveCurrencyOfFirst,
  indexOfActiveCurrencyOfSecond,
  currencies,
  setIndexOfActiveCurrencyOfFirst,
  firstInputValue,
  secondInputValue,
  setIndexOfActiveCurrencyOfSecond,
  indexOfVisibleChooseCurrency,
  changeVisibleOfChooseCurrency,
  changeInputValue,
}) => {
  const columns = [
    {
      id: 0,
      indexOfActiveCurrency: indexOfActiveCurrencyOfFirst,
      setIndexOfActiveCurrency: setIndexOfActiveCurrencyOfFirst,
      inputValue: firstInputValue,
    },
    {
      id: 1,
      indexOfActiveCurrency: indexOfActiveCurrencyOfSecond,
      setIndexOfActiveCurrency: setIndexOfActiveCurrencyOfSecond,
      inputValue: secondInputValue,
    },
  ];

  return (
    <div class="currency-conversion">
      <div class="container">
        <div class="currency-conversion__block">
          <div class="currency-conversion__row d-g ai-c">
            {columns.map((col) => {
              return (
                <CurrencyConversionColumn
                  id={col.id}
                  indexOfActiveCurrency={col.indexOfActiveCurrency}
                  setIndexOfActiveCurrency={col.setIndexOfActiveCurrency}
                  inputValue={col.inputValue}
                  changeInputValue={changeInputValue}
                  currencies={currencies}
                  changeVisibleOfChooseCurrency={changeVisibleOfChooseCurrency}
                  indexOfVisibleChooseCurrency={indexOfVisibleChooseCurrency}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConversion;
