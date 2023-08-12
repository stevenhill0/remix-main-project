import { Link, useFetcher } from '@remix-run/react';

function ExpenseListItem({ id, title, amount }) {
  const fetcher = useFetcher();
  function deleteExpenseItemHandler() {
    // Confirm is a function from the browser: It creates a popup/dialogue with yes/no buttons: returns a Boolean
    const proceed = confirm('Are you sure you want to delete this item?');

    // Returning without deleting if user did not want to delete. Below delete request will not run since returning early
    if (!proceed) {
      return;
    }
    // The useFetcher, unlike useSubmit will NOT trigger a subsequent navigation, it will do NOTHING. Which is what we want if deleting
    fetcher.submit(null, { method: 'delete', action: `/expenses/${id}` });
  }

  // This is similar to useNavigation hook: we use it in ExpenseForm.jsx
  if (fetcher.state !== 'idle') {
    // If the state is not idle can return different content
    // Will give hte user some visual feedback while it is deleting (i.e. not idle)
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }
  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/* Using the onClick handler to delete an item with useFetcher hook */}
        <button onClick={deleteExpenseItemHandler}>Delete</button>

        {/* 
        The remix Form component allows you to use delete as a method 
        The HTML form element only allows you to use post or get

        Because we are sending a request we want to use a form and NOT a link inside a button

        If we do not use an action='' inside the Form component it will search for an action in _app.expenses.jsx
        The reason for this is _app.expenses.jsx is the parent route for this Component

        */}

        {/* The action url is the ID we want to target. The id is being passed as a prop
        It will then reach the action in _app.expenses.$id.jsx, which has already been set
         */}
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
