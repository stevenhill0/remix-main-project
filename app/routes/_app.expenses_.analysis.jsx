import { Link, useLoaderData } from '@remix-run/react';
import Chart from '~/components/expenses/Chart';
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import expensesStyles from '~/styles/expenses.css';
import { getExpenses } from '../data/expenses.server';

// Dummy data for now
// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     title: 'First Expense',
//     amount: 20.0,
//     date: new Date().toISOString(),
//   },
//   {
//     id: 'e2',
//     title: 'Second Expense',
//     amount: 15.98,
//     date: new Date().toISOString(),
//   },
// ];

const ExpensesAnalysis = () => {
  const expenseData = useLoaderData();

  const hasExpenses = expenseData && expenseData.length > 0;

  return (
    <main>
      {hasExpenses && (
        <>
          <Chart expenses={expenseData} />
          <ExpenseStatistics expenses={expenseData} />{' '}
        </>
      )}

      {!hasExpenses && (
        <section id="no-expenses">
          <h1>No expense data found</h1>
          <p>
            Starting <Link to="/expenses/add">adding</Link> some expense data!
          </p>
        </section>
      )}
    </main>
  );
};

export default ExpensesAnalysis;

export const loader = async () => {
  const expenses = await getExpenses(); // By returning notes, gives the above Notes Component access to the raw data by using the useLoaderData() hook, provided by Remix // Note: the data is temporarily converted to a data string  so you cannot return any objects, will ONLY get the plain data i.e. strings
  return expenses;
};

export const links = () => {
  return { rel: 'stylesheet', href: expensesStyles };
};
