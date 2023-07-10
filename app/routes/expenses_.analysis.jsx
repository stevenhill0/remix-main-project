import Chart from '~/components/expenses/Chart';
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import expensesStyles from '~/styles/expenses.css';
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

const ExpensesAnalysis = () => {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
};

export default ExpensesAnalysis;

export const links = () => {
  return { rel: 'stylesheet', href: expensesStyles };
};
