import { Form, Link, useNavigation, useSearchParams } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  // We can use setSearchParams if we want to update the search terms/params. Otherwise do NOT need it
  // searchParams is an object that we use to extract the currently set value for a query parameter of our choice
  const [searchParams, setSearchParams] = useSearchParams();

  // Want to update the caption of the submit based on whether we are sending a request or not
  const navigation = useNavigation();

  // The get method allows us to get the value for specific search parameter
  // The || login is just in case the mode parameter is not set in the URL
  const authMode = searchParams.get('mode') || 'login';

  // Checking if we are doing something i.e the state is not idle
  // navigation.state returns a Boolean
  const isSubmitting = navigation.state !== 'idle';

  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User';
  const toggleBtnCaption =
    authMode === 'login' ? 'Create a new user' : 'Log in with existing user';

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Authenticating...' : submitBtnCaption}
        </button>
        {/* Setting a search/query parameter (i.e. ?),  */}
        <Link to={authMode === 'login' ? '?mode=signup' : '?mode=login'}>
          {toggleBtnCaption}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
