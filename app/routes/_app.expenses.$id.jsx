import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { updateExpense } from '../data/expenses.server';
import { validateExpenseInput } from '../data/validation.server';
// import { getExpense } from '../data/expenses.server';

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

// loader function not needed since we already have a loader in the parent route i.e. ExpenseForm.jsx
// export const loader = async ({ params }) => {
//   // The .id is used because it is the SAME name as the file i.e. id.jsx. MUST be the same name
//   // Getting the params ID
//   const expenseId = params.id;

//   const expense = await getExpense(expenseId);
//   // Remember we can either return the response like below (Remix auto-wraps the json helper for us)
//   // Or alternatively manually construct the response with the Remix json() helper function and pass raw data to it
//   return expense;
// };

// using the action function to communicate with the server updateExpense method
// The request parameter is an object which contains the form data
export const action = async ({ params, request }) => {
  // It is the id set in the url
  const expenseId = params.id;

  // formData() method fetches the form data via the Remix request object on the action function
  const formData = await request.formData();

  // Object.fromEntries() converts the incoming data to a key/value object, where form input names are the keys, and form entered values are the values for the keys
  // This way we get all the form input/keys and their values
  // Can always log out to see what is in the object
  // Used it before in _app.expenses.add.jsx
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    // The error object we are returning is the validation object from validateExpenseInput()
    return error;
  }

  // The code is very similar to the add action (_app.expenses.add.jsx) except we are updating
  await updateExpense(expenseId, expenseData);

  // Using the Remix redirect() utility function to redirect the user
  // Redirecting the user to /expenses because was previously on '/expenses/someId'
  return redirect('/expenses');
};
