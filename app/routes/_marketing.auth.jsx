import { redirect } from '@remix-run/node';
import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';
import { signup } from '../data/auth.server';
import { validateCredentials } from '../data/validation.server';

const Auth = () => {
  return <AuthForm />;
};

export default Auth;

// Remember if you return data with your action e.g. returning error, you can use that data with the useActionData() hook
export const action = async ({ request }) => {
  // The URL class is from Node
  // Getting the search params from the URL
  // request.url gives us access to the data in the url e.g. .searchParams property: gives us access to the search params in the url
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login'; // Gets the mode encoded in the URL. Using 'login' as a fallback

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    // Returns the validationErrors object in within the validateCredentials function
    return error;
  }

  // Placing in try/catch block so that when there is an error it will NOT default to the system error, allowing us to set an inline error
  try {
    if (authMode === 'login') {
      //login logic
    } else {
      // signup
      // credentials contain the email password expected from the signup function
      // It returns a Promise so should await it
      await signup(credentials);
      return redirect('/expenses');
    }
  } catch (error) {
    // the error status will be 422 cos we set it in the signup function | auth.server.js file
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
};

export const links = () => [{ rel: 'stylesheet', href: authStyles }];
