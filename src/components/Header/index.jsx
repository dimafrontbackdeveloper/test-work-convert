import React from 'react';

const currenciesSymbols = {
  dollar: '$',
  euro: '€',
  hryvnia: '₴',
};

const Header = ({ courseUsdToUah, courseEurToUah }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row d-f ai-c fd-c">
          <div className="header__column">
            1{currenciesSymbols.dollar} = {courseUsdToUah?.toFixed(2)}
            {currenciesSymbols.hryvnia}
          </div>
          <div className="header__column">
            1{currenciesSymbols.euro} = {courseEurToUah?.toFixed(2)}
            {currenciesSymbols.hryvnia}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
