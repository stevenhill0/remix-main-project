import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';

const Auth = () => {
  return <AuthForm />;
};

export default Auth;

export const action = async ({ request }) => {
  // The URL class is from Node
  // Getting the search params from the URL
  // request.url gives us access to the data in the url e.g. .searchParams property: gives us access to the search params in the url
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get('mode') || 'login'; // Gets the mode encoded in the URL. Using 'login' as a fallback

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  if (authMode === 'login') {
    //login logic
  } else {
    // signup logic
  }
};

export const links = () => [{ rel: 'stylesheet', href: authStyles }];
