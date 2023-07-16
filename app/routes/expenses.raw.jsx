// Dummy data for now
const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'First Expense',
    amount: 20.0,
    date: new Date().toISOString(),
  },
  {
    id: 'e2',
    title: 'Second Expense',
    amount: 15.98,
    date: new Date().toISOString(),
  },
];

export const loader = () => {
  return DUMMY_EXPENSES;
};
