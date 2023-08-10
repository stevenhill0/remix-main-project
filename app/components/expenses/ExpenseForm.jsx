import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from '@remix-run/react';

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  // This is fetching the validation errors from _add.expenses.add.jsx
  const validationErrors = useActionData();
  const navigation = useNavigation();

  // useLoaderData to pre-populate the form fields with the new expense data
  // Remember: the data may be undefined if is a new form: we must handle it appropriately
  // Because ExpenseForm.jsx is a parent route it must rather use the useMatches() hook
  // const expenseData = useLoaderData();
  const matches = useMatches();

  // The Remix useParams() hook allows us to extract the params from the urk
  // We would use this hook if we cannot use the useLoaderData hook
  // Since we using the parent route to get the data we cannot use the useLoaderData hook
  // Instead we are using the useMatches() hook along with the useParams() hook
  const params = useParams();

  // Because the matches returned objected is an array, we can use the find method find the id we want to target
  // This will return all expenses
  const expenses = matches.find(
    (match) => match.id === 'routes/_app.expenses'
  ).data;

  // Getting an individual expense by comparing the id in all the returned expense data with the params id
  const expenseData = expenses.find((expense) => expense.id === params.id);

  // Setting default values in the case it is a new form and the values are undefined
  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : { title: '', amount: '', date: '' };

  // Checking if we are not in idle mode i.e.a are submitting data or we finished submitting data and Remix is updating the pages
  const isSubmitting = navigation.state !== 'idle';

  // Good idea to have a dynamic method where if data exists use patch/updating, or if no data use 'post'
  return (
    <Form
      method={expenseData ? 'patch' : 'post'}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          // defaultValue is a built-in React prop
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            // defaultValue is a built-in React prop
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            // defaultValue is a built-in React prop
            // Need to do another check if date is available cos we need to ONLY give data info, not the time info that is also part of it
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ''
            }
          />
        </p>
      </div>
      {/* Checking if validationErrors exists i.e. is truthy */}
      {validationErrors && (
        <ul>
          {/* Object.values will return an array of all the error messages */}
          {/* And then mapping the array of error messages into list items */}
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Expense'}
        </button>
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
