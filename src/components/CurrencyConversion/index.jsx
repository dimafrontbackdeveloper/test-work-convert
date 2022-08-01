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
    <div className="currency-conversion">
      <div className="container">
        <div className="currency-conversion__block">
          <div className="currency-conversion__row d-g ai-c">
            {columns.map((col) => {
              return (
                <CurrencyConversionColumn
                  key={col.id}
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
