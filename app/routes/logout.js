import { json } from '@remix-run/node';
import { destroyUserSession } from '../data/auth.server';

// Calling it logout.js cos no JSX
export const action = ({ request }) => {
  if (request !== 'post') {
    throw (json('invalid request method'), { status: 400 });
  }

  //   returns the response which destroys the cookie
  return destroyUserSession(request);
};
