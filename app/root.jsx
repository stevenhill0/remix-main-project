import { cssBundleHref } from '@remix-run/css-bundle';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

// To make these styles available a route with a Link function MUST point to these style
import sharedStyles from '~/styles/shared.css';

export const meta = () => {
  return [
    {
      charSet: 'utf-8',
      title: 'New Remix App',
      viewport: 'width=device-width, initial-scale=1',
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: 'stylesheet', href: cssBundleHref }]
    : [{ rel: 'stylesheet', href: sharedStyles }]),
];
