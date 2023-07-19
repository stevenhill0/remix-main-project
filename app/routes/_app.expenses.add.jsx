import { redirect } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { addExpense } from '../data/expenses.server';
import { validateExpenseInput } from '../data/validation.server';

const AddExpenses = () => {
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

export default AddExpenses;

// We use the Remix action function for non-GET requests, example POST
//  The destructured request property is automatically available on the action object (Remix returned object)
// Remember: action function MUST return something e.g. a response or raw JSON data
export const action = async ({ request }) => {
  // formData resolves a Promise giving us ACCESS to the submitted data
  // Note: the object stored in the formData variable object does not have basic key/values, but methods we can call e.g. get()
  const formData = await request.formData();

  // get form data: Option 1
  // In the get() method, name the form inout where you want to get the value from
  // Note: you WILL have to call it many times for each input you want
  // formData.get('title');

  // get form data: Option 2
  // Object.fromEntries() converts the incoming data to a key/value object, where form input names are the keys, and form entered values are the values for the keys
  // This way we get all the form input/keys and their values
  // Can always log out to see what is in the object
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    // The error object we are returning is the validation object from validateExpenseInput()
    return error;
  }

  await addExpense(expenseData);

  // Setting a redirect response because when we got the form data we want to redirect the user away from this page to view the list of expenses
  // redirect takes one arg: the path we want to redirect to
  return redirect('/expenses');
};
