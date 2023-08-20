// Dummy data for now
// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     title: 'First Expense',
//     amount: 20.0,
//     date: new Date().toISOString(),
//   },
//   {
//     id: 'e2',
//     title: 'Second Expense',
//     amount: 15.98,
//     date: new Date().toISOString(),
//   },
// ];

// export const loader = () => {
//   return DUMMY_EXPENSES;
// };

import { getExpenses } from '~/data/expenses.server';
import { requireUserSession } from '../data/auth.server';

export async function loader({ request }) {
  // Will throw a redirect response if no user
  // We are able to get the userId because requireUserSession returns it
  const userId = await requireUserSession(request);

  return getExpenses(userId);
}
