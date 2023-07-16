import AuthForm from '~/components/auth/AuthForm';
import authStyles from '~/styles/auth.css';

const Auth = () => {
  return <AuthForm />;
};
export default Auth;

export const links = () => [{ rel: 'stylesheet', href: authStyles }];
