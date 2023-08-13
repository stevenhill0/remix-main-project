import { prisma } from './database.server';

// Data is coming from the form i.e. components/expenses/ExpenseForm.jsx
export const addExpense = async (expenseData) => {
  try {
    return await prisma.expense.create({
      // The + sign in front of expenseData tells Prisma to convert to a number
      // Data returned from a form is ALWAYS a string
      // Note: in the Prisma scheme i.e. prisma/schema.prisma file for amount, we have setup to expect a float (number w/ decimals)
      data: {
        title: expenseData.title,
        //   Converting a string to a number: via the + sign i.e. what MongoDB expects
        amount: +expenseData.amount,
        //   Converting string to a data object i.e. what MongoDB expects
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error('Failed to add expense!');
  }
};

// FETCHING all expenses form the DB
export const getExpenses = async () => {
  try {
    // If you do not pass any additional config to findMany it will fetch all expenses
    // findMany returns a Promise which will eventually return an array
    const expenses = await prisma.expense.findMany({
      orderBy: { date: 'desc' },
    });
    return expenses;
  } catch (error) {
    throw new Error('Failed to get expenses!');
  }
};

// Get a single expense by ID
// Note we are calling this function in the loader inside _app.expenses.$id.jsx
export const getExpense = async (id) => {
  try {
    // Finding the expesne with the same id
    const expense = await prisma.expense.findFirst({ where: { id } });
    return expense;
  } catch (error) {
    throw new Error('Failed to get expense!');
  }
};

// Updating the expense
// We are going to use the update function with the _app.expenses.$id.jsx file
export const updateExpense = async (id, expenseData) => {
  try {
    // update function takes a config object
    await prisma.expense.update({
      where: { id },
      // data property shows which fields should be updated
      data: {
        title: expenseData.title,
        //   Converting a string to a number: via the + sign i.e. what MongoDB expects
        amount: +expenseData.amount,
        //   Converting string to a data object i.e. what MongoDB expects
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error('Failed to update expense!');
  }
};

export const deleteExpense = async (id) => {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    throw new Error('Failed to delete expense!');
  }
};
