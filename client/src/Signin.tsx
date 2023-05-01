import { useAuth0 } from "@auth0/auth0-react";

const Signin = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  console.debug('auth0', isLoading, isAuthenticated)

  return isAuthenticated ? null : <button onClick={() => loginWithRedirect()}>Sign In</button>
};

export default Signin;