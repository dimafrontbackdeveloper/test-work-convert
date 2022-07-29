import './assets/scss/style.scss';

import euro from './assets/images/euro-flag.jpg';
import dollar from './assets/images/america-flag.jpg';
import hryvnia from './assets/images/ukraine-flag.jpg';
import change from './assets/images/change.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CurrencyConversion from './components/CurrencyConversion';

function App() {
  const [indexOfVisibleChooseCurrency, setIndexOfVisibleChooseCurrency] = useState(null);

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

  const closeChooseCurrency = () => {
    setIndexOfVisibleChooseCurrency(null);
  };

  const changeVisibleOfChooseCurrency = (e) => {
    e.stopPropagation();

    return (ind) => {
      setIndexOfVisibleChooseCurrency(ind);
    };
  };

  return (
    <div class="wrapper" onClick={closeChooseCurrency}>
      <Header courseUsdToUah={courseUsdToUah} courseEurToUah={courseEurToUah} />
      <CurrencyConversion
        indexOfVisibleChooseCurrency={indexOfVisibleChooseCurrency}
        changeVisibleOfChooseCurrency={changeVisibleOfChooseCurrency}
        indexOfActiveCurrencyOfFirst={indexOfActiveCurrencyOfFirst}
        indexOfActiveCurrencyOfSecond={indexOfActiveCurrencyOfSecond}
        currencies={currencies}
        setIndexOfActiveCurrencyOfFirst={setIndexOfActiveCurrencyOfFirst}
        firstInputValue={firstInputValue}
        changeFirstInputValue={changeFirstInputValue}
        secondInputValue={secondInputValue}
        changeSecondInputValue={changeSecondInputValue}
        setIndexOfActiveCurrencyOfSecond={setIndexOfActiveCurrencyOfSecond}
      />
    </div>
  );
}

export default App;
