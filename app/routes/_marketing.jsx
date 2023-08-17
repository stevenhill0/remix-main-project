import { Outlet } from '@remix-run/react';
import MainHeader from '~/components/navigation/MainHeader';
import marketingStyles from '~/styles/marketing.css';
import { getUserFromSession } from '../data/auth.server';

const MarketingLayout = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};

export default MarketingLayout;

// Checking if loader has session cookies attached to it
// Have to use backend to find the cookie because we restricted the FE from accessing it via sessionStorage function in auth.server.js
// Note: the browser will automatically attach the session cookie to all requests that send to the backend, so easy to extract and validate
// loader functions can return Promises
export const loader = ({ request }) => {
  // Because it is an async function it returns a Promise
  getUserFromSession(request);
};

export const links = () => {
  return [{ rel: 'stylesheet', href: marketingStyles }];
};
