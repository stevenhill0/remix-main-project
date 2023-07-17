import { Link, Outlet } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
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
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add expenses</span>
          </Link>
          {/* Using a normal anchor tag because we are targeting raw data. 
          We do NOT want the Remix Link because we are not returning JSX */}
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        <ExpensesList expenses={DUMMY_EXPENSES} />
      </main>
    </>
  );
};
export default ExpensesLayout;

export const links = () => [{ rel: 'stylesheet', href: expensesStyles }];
