import './assets/scss/style.scss';

import euro from './assets/images/euro-flag.jpg';
import dollar from './assets/images/america-flag.jpg';
import hryvnia from './assets/images/ukraine-flag.jpg';
import change from './assets/images/change.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [isVisibleFirstChoose, setIsVisibleFirstChoose] = useState(false);
  const [isVisibleSecondChoose, setIsVisibleSecondChoose] = useState(false);

  const [indexOfActiveCurrencyOfFirst, setIndexOfActiveCurrencyOfFirst] = useState(0);
  const [indexOfActiveCurrencyOfSecond, setIndexOfActiveCurrencyOfSecond] = useState(0);

  const [firstInputValue, setFirstInputValue] = useState('');
  const [secondInputValue, setSecondInputValue] = useState('');

  const [courseUahToUsd, setCourseUahToUsd] = useState(null);
  const [courseUahToEur, setCourseUahToEur] = useState(null);
  const courseUahToUah = 1;

  const [courseUsdToUah, setCourseUsdToUah] = useState(null);
  const [courseUsdToEur, setCourseUsdToEur] = useState(null);
  const courseUsdToUsd = 1;

  const [courseEurToUah, setCourseEurToUah] = useState(null);
  const [courseEurToUsd, setCourseEurToUsd] = useState(null);
  const courseEurToEur = 1;

  const getCourseUah = async () => {
    const course = await axios('https://api.exchangerate.host/latest?symbols=EUR,USD&base=UAH');
    setCourseUahToUsd(course.data.rates.USD);
    setCourseUahToEur(course.data.rates.EUR);
  };

  const getCourseUsd = async () => {
    const course = await axios('https://api.exchangerate.host/latest?symbols=EUR,UAH&base=USD');
    setCourseUsdToUah(course.data.rates.UAH);
    setCourseUsdToEur(course.data.rates.EUR);
  };

  const getCourseEur = async () => {
    const course = await axios('https://api.exchangerate.host/latest?symbols=UAH,USD&base=EUR');
    setCourseEurToUah(course.data.rates.UAH);
    setCourseEurToUsd(course.data.rates.USD);
  };

  useEffect(() => {
    getCourseUah(); // course UAH to USD and UAH to EUR
    getCourseUsd(); // course USD to UAH and USD to EUR
    getCourseEur(); // course EUR to UAH and EUR to USD
  }, []);

  const currencies = [
    { img: euro, text: 'EUR' },
    { img: dollar, text: 'USD' },
    { img: hryvnia, text: 'UAH' },
  ];

  useEffect(() => {
    setFirstInputValue((prev) => {
      setSecondInputValue(
        prev *
          eval(
            `course${currencies[indexOfActiveCurrencyOfFirst].text
              .toLocaleLowerCase()
              .split('')
              .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
              .join('')}To${currencies[indexOfActiveCurrencyOfSecond].text
              .toLocaleLowerCase()
              .split('')
              .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
              .join('')}`,
          ),
      );

      return prev;
    });
  }, [indexOfActiveCurrencyOfSecond]);

  useEffect(() => {
    setSecondInputValue((prev) => {
      setFirstInputValue(
        prev *
          eval(
            `course${currencies[indexOfActiveCurrencyOfSecond].text
              .toLocaleLowerCase()
              .split('')
              .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
              .join('')}To${currencies[indexOfActiveCurrencyOfFirst].text
              .toLocaleLowerCase()
              .split('')
              .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
              .join('')}`,
          ),
      );

      return prev;
    });
  }, [indexOfActiveCurrencyOfFirst]);

  const changeFirstInputValue = (e) => {
    // if value !== string
    if (!isNaN(+e.target.value)) {
      setFirstInputValue(e.target.value);

      setFirstInputValue((prev) => {
        setSecondInputValue(
          // if value of first input === '', we change value of second input on ''
          prev !== ''
            ? prev *
                eval(
                  `course${currencies[indexOfActiveCurrencyOfFirst].text
                    .toLocaleLowerCase()
                    .split('')
                    .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
                    .join('')}To${currencies[indexOfActiveCurrencyOfSecond].text
                    .toLocaleLowerCase()
                    .split('')
                    .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
                    .join('')}`,
                )
            : '',
        );

        // if value === 01 we change value to 1
        if (prev[0] === '0') {
          if (!(prev[1] === '.' || prev[1] === undefined)) {
            return prev[1];
          } else {
            return prev;
          }
        }

        return prev;
      });
    }
  };

  const changeSecondInputValue = (e) => {
    if (!isNaN(+e.target.value)) {
      setSecondInputValue(e.target.value);
      setSecondInputValue((prev) => {
        setFirstInputValue(
          // if value of second input === '', we change value of first input on ''
          prev !== ''
            ? prev *
                eval(
                  `course${currencies[indexOfActiveCurrencyOfSecond].text
                    .toLocaleLowerCase()
                    .split('')
                    .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
                    .join('')}To${currencies[indexOfActiveCurrencyOfFirst].text
                    .toLocaleLowerCase()
                    .split('')
                    .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
                    .join('')}`,
                )
            : '',
        );

        // if value === 01 we change value to 1
        if (prev[0] === '0') {
          if (!(prev[1] === '.' || prev[1] === undefined)) {
            return prev[1];
          } else {
            return prev;
          }
        }

        return prev;
      });
    }
  };

  const currenciesSymbols = {
    dollar: '$',
    euro: '€',
    hryvnia: '₴',
  };

  const closeChoose = (numberOfCloseChoose) => {
    if (isNaN(+numberOfCloseChoose)) {
      setIsVisibleFirstChoose(false);
      setIsVisibleSecondChoose(false);
    }

    if (numberOfCloseChoose === 1) {
      setIsVisibleFirstChoose(false);
    }

    if (numberOfCloseChoose === 2) {
      setIsVisibleSecondChoose(false);
    }
  };

  const toggleVisibleOfFirstChoose = (e) => {
    e.stopPropagation();
    closeChoose(2);
    setIsVisibleFirstChoose((prev) => !prev);
  };

  const toggleVisibleOfSecondChoose = (e) => {
    e.stopPropagation();
    closeChoose(1);
    setIsVisibleSecondChoose((prev) => !prev);
  };

  return (
    <div class="wrapper" onClick={closeChoose}>
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
      <div class="currency-conversion">
        <div class="container">
          <div class="currency-conversion__block">
            <div class="currency-conversion__row d-g ai-c">
              <div class="currency-conversion__column">
                <div class="currency-conversion__choose">
                  <div
                    class="currency-conversion__choose-visible d-f jc-sb ai-c"
                    onClick={toggleVisibleOfFirstChoose}>
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
                    onClick={toggleVisibleOfSecondChoose}>
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
                      isVisibleSecondChoose && 'currency-conversion__choose-hidden--active'
                    }`}
                    onClick={(e) => e.stopPropagation()}>
                    {currencies.map((currency, i) => {
                      return (
                        <li
                          class="d-f ai-c"
                          onClick={() => {
                            setIndexOfActiveCurrencyOfSecond(i);
                            closeChoose(2);
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
    </div>
  );
}

export default App;
