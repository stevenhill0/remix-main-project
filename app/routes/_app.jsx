import { Outlet } from '@remix-run/react';
import ExpensesHeader from '~/components/navigation/ExpenseHeader';
import expensesStyles from '~/styles/expenses.css';

const ExpensesLayout = () => {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
};

export default ExpensesLayout;

export const links = () => {
  return [{ rel: 'stylesheet', href: expensesStyles }];
};
