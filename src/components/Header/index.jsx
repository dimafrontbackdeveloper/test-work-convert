import React from 'react';

const Header = ({ currencies }) => {
  return (
    <header class="header">
      <div class="container">
        <div class="header__row d-f ai-c fd-c">
          <div class="header__column">
            1{currencies.dollar} = 40{currencies.hryvnia}
          </div>
          <div class="header__column">
            1{currencies.euro} = 40{currencies.hryvnia}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
