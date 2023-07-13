import { useNavigate } from '@remix-run/react';
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';

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
