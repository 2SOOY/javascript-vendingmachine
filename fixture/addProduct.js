const TC = [
  {
    product: { name: '솔의눈', price: 10 },
    answer: true,
  },
  {
    product: { name: '솔의눈눈', price: 9 },
    answer: false,
  },
  {
    product: { name: '솔의눈눈눈', price: 50000 },
    answer: true,
  },
  {
    product: { name: '솔의눈눈눈눈눈', price: 50001 },
    answer: false,
  },
  {
    product: { name: '글자', price: 49999 },
    answer: true,
  },
  {
    product: { name: '한', price: 10000 },
    answer: false,
  },
  {
    product: { name: '1234', price: 3000 },
    answer: false,
  },
  {
    product: {
      name: '김김김김김김김김김김김김김김김김김김김김',
      price: 2000,
    },
    answer: true,
  },
  {
    product: { name: '', price: 900 },
    answer: false,
  },
];

export default TC;
