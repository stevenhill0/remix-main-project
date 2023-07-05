import { Outlet } from '@remix-run/react';

import expensesStyles from '~/styles/expenses.css';

const ExpensesList = () => {
  return (
    <div>
      Expenses
      <Outlet />
    </div>
  );
};
export default ExpensesList;

export const links = () => [{ rel: 'stylesheet', href: expensesStyles }];
