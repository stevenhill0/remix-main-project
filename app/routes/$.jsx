import { redirect } from '@remix-run/node';

export function loader({ params }) {
  // The star means all
  if (params['*'] === 'exp') {
    return redirect('/expenses');
  }

  throw new Response('Not found', { status: 404 });
}
