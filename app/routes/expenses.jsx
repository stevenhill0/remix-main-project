import { Outlet } from '@remix-run/react';
import ExpensesList from '~/components/expenses/ExpensesList';
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

const ExpensesLayout = () => {
  return (
    <>
      <Outlet />
      <main>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
};
export default ExpensesLayout;

export const links = () => [{ rel: 'stylesheet', href: expensesStyles }];
