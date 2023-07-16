import { Link, useSearchParams } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';

function AuthForm() {
  // We can use setSearchParams if we want to update the search terms/params
  // searchParams is an object that we use to extract the currently set value for a query parameter of our choice
  const [searchParams, setSearchParams] = useSearchParams();
  // The get method allows us to get the value for specific search parameter
  // The || login is just in case the mode parameter is not set in the URL
  const authMode = searchParams.get('mode') || 'login';

  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User';
  const toggleBtnCaption =
    authMode === 'login' ? 'Create a new user' : 'Log in with existing user';

  return (
    <form method="post" className="form" id="auth-form">
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
        <button>{submitBtnCaption}</button>
        {/* Setting a search/query parameter (i.e. ?),  */}
        <Link to={authMode === 'login' ? '?mode=signup' : '?mode=login'}>
          {toggleBtnCaption}
        </Link>
      </div>
    </form>
  );
}

export default AuthForm;
