import { Form, Link } from '@remix-run/react';

function ExpenseListItem({ id, title, amount }) {
  function deleteExpenseItemHandler() {
    // tbd
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        {/* <button onClick={deleteExpenseItemHandler}>Delete</button> */}

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
        <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form>
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
