import { Outlet } from '@remix-run/react';
import MainHeader from '~/components/navigation/MainHeader';
import marketingStyles from '~/styles/marketing.css';

const ExpensesLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};

export default ExpensesLayout;

export const links = () => {
  return [{ rel: 'stylesheet', href: marketingStyles }];
};
