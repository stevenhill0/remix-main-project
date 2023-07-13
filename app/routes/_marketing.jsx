import { Outlet } from '@remix-run/react';
import MainHeader from '~/components/navigation/MainHeader';
import marketingStyles from '~/styles/marketing.css';

const MarketingLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};

export default MarketingLayout;

export const links = () => {
  return [{ rel: 'stylesheet', href: marketingStyles }];
};