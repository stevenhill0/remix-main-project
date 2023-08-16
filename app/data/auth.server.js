// Making sure the code for auth does NOT end up in the frontend

import { hash } from 'bcryptjs';
import { prisma } from './database.server';

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
  await prisma.user.create({
    data: { email: email, password: hashedPassword },
  });
};
