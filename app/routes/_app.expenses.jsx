import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { FaDownload, FaPlus } from 'react-icons/fa';
import ExpensesList from '~/components/expenses/ExpensesList';
import expensesStyles from '~/styles/expenses.css';
import { getExpenses } from '../data/expenses.server';

const ExpensesLayout = () => {
  // We using useLoaderData to print the expense data to the screen
  // It gives access to the closest loader that was called i.e. the loader function in this file
  // UseLoaderData returns a simple JSON object with key/value pairs
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

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
        {/* If hasExpenses is true i.e. there are values in the array */}
        {hasExpenses && <ExpensesList expenses={expenses} />}
        {/* If hasExpenses is false i.e. there are NO values in the array */}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <link to="add" />
              adding some expenses today.
            </p>
          </section>
        )}
      </main>
    </>
  );
};
export default ExpensesLayout;

// Remember: the loader always returns a response from the backend
export const loader = () => {
  // We are fetching the expenses from the DB
  // The function returns a Promise, which eventually will return an array of the data
  // If do NOT return a response using the Remix json() function, Remix will automatically wrap the returned data into a serialized response
  return getExpenses();
};

export const links = () => [{ rel: 'stylesheet', href: expensesStyles }];
