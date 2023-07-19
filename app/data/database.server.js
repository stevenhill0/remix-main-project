import { PrismaClient } from '@prisma/client';

/**
 * @type PrismaClient
 */
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  // When in dev mode making sure we do NOT create multiple database connections accidentally
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  prisma = global.__db;
}

export { prisma };
