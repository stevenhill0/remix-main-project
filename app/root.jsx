import { cssBundleHref } from '@remix-run/css-bundle';
import {
  isRouteErrorResponse,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import Error from './components/util/Error';

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

// Created Separate reusable Document Component so have control of sharing error messages along with the generic JSX
// Using the Document component as a wrapper for the content that should be outputted in the body
const Document = ({ title, children }) => {
  return (
    <html lang="en">
      <head>
        {/* Title will be for errors */}
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Replacing the Outlet Component with the passed children prop, cos we passing Outlet from the App component */}
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // Checking route errors
  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <main>
          <Error title={error.statusText}>
            <p>
              {error.message || 'Something went wrong, please try again later!'}
            </p>
            <p>
              Back to <Link to="/">safety</Link>.
            </p>
          </Error>
        </main>
      </Document>
    );
  }

  return (
    <Document title={error.statusText}>
      <main>
        <Error title={error.statusText}>
          <p>
            {error.message || 'Something went wrong, please try again later!'}
          </p>
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: 'stylesheet', href: cssBundleHref }]
    : [{ rel: 'stylesheet', href: sharedStyles }]),
];
