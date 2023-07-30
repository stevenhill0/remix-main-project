import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { getExpense } from '../data/expenses.server';

const ExpensesDynamicValue = () => {
  // Using the useNavigate hook from Remix to navigate programmatically
  // It returns a function which takes a path as an argument
  const navigate = useNavigate();

  const closeHandler = () => {
    // Remember by using .. we are navigating back one step to the parent route
    navigate('..');
  };

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
};

export default ExpensesDynamicValue;

export const loader = async ({ params }) => {
  // The .id is used because it is the SAME name as the file i.e. id.jsx. MUST be the same name
  // Getting the params ID
  const expenseId = params.id;

  const expense = await getExpense(expenseId);
  // Remember we can either return the response like below (Remix auto-wraps the json helper for us)
  // Or alternatively manually construct the response with the Remix json() helper function and pass raw data to it
  return expense;
};
