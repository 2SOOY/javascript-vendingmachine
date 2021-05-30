const TC_NONE_ACC = [
  {
    input: '1',
    answer: 0,
  },
  {
    input: '9',
    answer: 0,
  },
  {
    input: 10,
    answer: 10,
  },
  {
    input: '30000',
    answer: 30000,
  },
  {
    input: '50000',
    answer: 50000,
  },
  {
    input: '50001',
    answer: 0,
  },
];

const TC_ACC = [
  {
    input: '5',
    answer: 0,
  },
  {
    input: '5',
    answer: 0,
  },
  {
    input: 10000,
    answer: 10000,
  },
  {
    input: '30000',
    answer: 40000,
  },
  {
    input: '10000',
    answer: 50000,
  },
  {
    input: '50001',
    answer: 50000,
  },
];

export { TC_NONE_ACC, TC_ACC };
