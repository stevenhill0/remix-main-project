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
    console.log(error);
    throw error;
  }
};