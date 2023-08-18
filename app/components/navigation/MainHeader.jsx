import { Form, Link, NavLink, useLoaderData } from '@remix-run/react';
import Logo from '../util/Logo';

function MainHeader() {
  const userId = useLoaderData();

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        <ul>
          {/* Using NavLink because we do not want to use <a></a> as it will force the browser to download the page again 
          Remember: NavLink is the same as the Link Component, except it has an active CSS class so that you can target it showing when the link is active
          */}
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
        </ul>
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId && (
              <Form method="post" action="/logout" id="logout-form">
                <button className="cta-alt">Logout</button>
              </Form>
            )}
            {/* Using a normal link here so that it does NOT have special styling, unlike the NavLink Component */}
            {!userId && (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
