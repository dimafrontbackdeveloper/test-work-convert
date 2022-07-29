import axios from 'axios';

export const getCourseUah = async () => {
  const course = await axios('https://api.exchangerate.host/latest?symbols=EUR,USD&base=UAH');
  return { USD: course.data.rates.USD, EUR: course.data.rates.EUR };
};

export const getCourseUsd = async () => {
  const course = await axios('https://api.exchangerate.host/latest?symbols=EUR,UAH&base=USD');
  return { UAH: course.data.rates.UAH, EUR: course.data.rates.EUR };
};

export const getCourseEur = async () => {
  const course = await axios('https://api.exchangerate.host/latest?symbols=UAH,USD&base=EUR');
  return { UAH: course.data.rates.UAH, USD: course.data.rates.USD };
};
