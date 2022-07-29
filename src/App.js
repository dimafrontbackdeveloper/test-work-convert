import './assets/scss/style.scss';

import euro from './assets/images/euro-flag.jpg';
import dollar from './assets/images/america-flag.jpg';
import hryvnia from './assets/images/ukraine-flag.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CurrencyConversion from './components/CurrencyConversion';

function App() {
  // index of select we need to open
  const [indexOfVisibleChooseCurrency, setIndexOfVisibleChooseCurrency] = useState(null);

  // index of active currency to convertation
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

  // set courses of currencies
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

  // on change selected currency we calculate new value
  const calculateNewValueOfInput = (
    setInputValue,
    changeOfAnotherInputValue,
    firstIndexOfActiveCurrency,
    secondIndexOfActiveCurrency,
  ) => {
    setInputValue((prev) => {
      changeOfAnotherInputValue(
        // if value of first input === '', we change value of second input on ''
        prev !== ''
          ? (
              prev *
              eval(
                `course${currencies[firstIndexOfActiveCurrency].text
                  .toLocaleLowerCase()
                  .split('')
                  .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
                  .join('')}To${currencies[secondIndexOfActiveCurrency].text
                  .toLocaleLowerCase()
                  .split('')
                  .map((item, i) => (i === 0 ? item.toLocaleUpperCase() : item))
                  .join('')}`,
              )
            ).toFixed(2)
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
  };

  const validationOfInputValue = (
    e,
    setInputValue,
    changeOfAnotherInputValue,
    firstIndexOfActiveCurrency,
    secondIndexOfActiveCurrency,
  ) => {
    // if value !== string
    if (!isNaN(+e.target.value)) {
      setInputValue(e.target.value);
      calculateNewValueOfInput(
        setInputValue,
        changeOfAnotherInputValue,
        firstIndexOfActiveCurrency,
        secondIndexOfActiveCurrency,
      );
    }
  };

  const onChangeCurrencyShouldChangeInputValue = (numberOfInputShouldBeChanged) => {
    switch (numberOfInputShouldBeChanged) {
      case 1:
        calculateNewValueOfInput(
          setFirstInputValue,
          setSecondInputValue,
          indexOfActiveCurrencyOfFirst,
          indexOfActiveCurrencyOfSecond,
        );

        break;
      case 2:
        calculateNewValueOfInput(
          setSecondInputValue,
          setFirstInputValue,
          indexOfActiveCurrencyOfSecond,
          indexOfActiveCurrencyOfFirst,
        );
      default:
        break;
    }
  };

  // if change first input currency we change first input value
  useEffect(() => {
    onChangeCurrencyShouldChangeInputValue(2);
  }, [indexOfActiveCurrencyOfFirst]);

  // if change second input currency we change second input value
  useEffect(() => {
    onChangeCurrencyShouldChangeInputValue(1);
  }, [indexOfActiveCurrencyOfSecond]);

  // on change input value
  const changeInputValue = (e) => {
    return (whoInputChanged) => {
      switch (whoInputChanged) {
        // if first input changed
        case 0:
          validationOfInputValue(
            e,
            setFirstInputValue,
            setSecondInputValue,
            indexOfActiveCurrencyOfFirst,
            indexOfActiveCurrencyOfSecond,
          );
          break;
        // if second input changed
        case 1:
          validationOfInputValue(
            e,
            setSecondInputValue,
            setFirstInputValue,
            indexOfActiveCurrencyOfSecond,
            indexOfActiveCurrencyOfFirst,
          );
          break;
        default:
          break;
      }
    };
  };

  // close select currency
  const closeChooseCurrency = () => {
    setIndexOfVisibleChooseCurrency(null);
  };

  // who should be opened
  const changeVisibleOfChooseCurrency = (e) => {
    e.stopPropagation();

    return (ind) => {
      setIndexOfVisibleChooseCurrency((prev) => (prev === ind ? null : ind));
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
        secondInputValue={secondInputValue}
        changeInputValue={changeInputValue}
        setIndexOfActiveCurrencyOfSecond={setIndexOfActiveCurrencyOfSecond}
      />
    </div>
  );
}

export default App;
