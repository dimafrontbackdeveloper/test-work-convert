import React from 'react';

const currenciesSymbols = {
  dollar: '$',
  euro: '€',
  hryvnia: '₴',
};

const Header = ({ courseUsdToUah, courseEurToUah }) => {
  return (
    <header class="header">
      <div class="container">
        <div class="header__row d-f ai-c fd-c">
          <div class="header__column">
            1{currenciesSymbols.dollar} = {courseUsdToUah}
            {currenciesSymbols.hryvnia}
          </div>
          <div class="header__column">
            1{currenciesSymbols.euro} = {courseEurToUah}
            {currenciesSymbols.hryvnia}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
