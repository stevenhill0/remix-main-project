// Making sure the code for auth does NOT end up in the frontend

import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { compare, hash } from 'bcryptjs';
import { prisma } from './database.server';

const SESSION_SECRET = <process className="env SESSION_SECRET"></process>;

// Creating a session cookie
// 1st arg: object. Object takes a separate cookie property with an object
const sessionStorage = createCookieSessionStorage({
  // Configure cookie which will be sent to the user's browser for the session
  cookie: {
    // In dev mode HTTPS is not active, only in a production environment
    secure: (process.env.NODE_ENV = 'production'),
    // Sign the cookie with a key that is only known by the backend
    secrets: [SESSION_SECRET],
    // Protection from 3rd party sites
    sameSite: 'lax',
    // life span of cookie: 30 days calculated in seconds
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // To make sure client side JS can NOT access this cookie
    httpOnly: true,
  },
});

const createUserSession = async (userId, redirectPath) => {
  // Creating a session
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    // Wrapping key in single quotes because of the dash
    // Setting the header as the value for the property
    // sessionStorage is a utility object giving access to creating a session and committing a session
    headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
  });
};

export const getUserFromSession = async (request) => {
  // Getting the cookie header from the incoming request that contains the session cookie
  // Note: the browser will automatically attach the session cookie to all requests that send to the backend, so easy to extract and validate
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  // We know there is a userId because we are setting it in the above createUserSession function
  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  // Returning the identifier for the user that makes up our session
  return userId;
};

export const destroyUserSession = async (request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  //  sessionStorage.destroySession() returns a Promise that yields a string that should be set as a value for set-Cookie on a response from the browser
  // Cos the session must also be delete in the browser
  return redirect('/', {
    headers: { 'Set-Cookie': await sessionStorage.destroySession(session) },
  });
};

export const requireUserSession = async (request) => {
  const userId = await getUserFromSession(request);

  // If no user
  if (!userId) {
    // Can also throw redirects
    // Default behavior to 'throw' is to cancel the function
    throw redirect('/auth?mode=login');
  }

  // returning the userId so when calling requireUserSession, we don't need to call getUserFromSession again in other functions
  return userId;
};

export const signup = async ({ email, password }) => {
  // Searching for user via unique email address
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    // Not an error response: its a regular JS Error object
    const error = new Error('A user with provided email already exists.');
    // Adding an extra property to the error object
    // 422 is common HTTP status code for incorrect input
    error.status = 422;
    // Because it is a regular error, it will trigger FE errorBoundary Components
    throw error;
  }

  //   Hashing password using bcryptjs
  //   1st arg: un-hashed password; 2nd arg: salt rounds: strength of encryption you want
  //   Hash is asynchronous which returns a Promise
  const hashedPassword = await hash(password, 12);

  //   Will not work if not using full key/value pairs
  const user = await prisma.user.create({
    data: { email: email, password: hashedPassword },
  });

  return createUserSession(user.id, '/expenses');
};

export const login = async ({ email, password }) => {
  // Searching for user via unique email address
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    // Not an error response: its a regular JS Error object
    const error = new Error('A user with provided email already exists.');
    // Adding an extra property to the error object
    // 422 is common HTTP status code for authentication error
    error.status = 401;
    // Because it is a regular error, it will trigger FE errorBoundary Components
    throw error;
  }

  const passwordCorrect = await compare(password, existingUser.password);

  if (!passwordCorrect) {
    // Not an error response: its a regular JS Error object
    const error = new Error('A user with provided email already exists.');
    // Adding an extra property to the error object
    // 422 is common HTTP status code for authentication error
    error.status = 401;
    // Because it is a regular error, it will trigger FE errorBoundary Components
    throw error;
  }

  //   We are returning the redirect response that contains the cookie
  //   1st arg: existingUser id is the user id for the session
  // 2nd arg: redirect path
  return createUserSession(existingUser.id, '/expenses');
};
