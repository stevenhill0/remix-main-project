import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10

  // This is fetching the validation errors from _add.expenses.add.jsx
  const validationErrors = useActionData();
  const navigation = useNavigation();

  // useLoaderData to pre-populate the form fields with the new expense data
  // Remember: the data may be undefined if is a new form: we must handle it appropriately
  const expenseData = useLoaderData();

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

  return (
    <Form method="post" className="form" id="expense-form">
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
