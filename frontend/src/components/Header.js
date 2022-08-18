import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/around.svg";

function Header({ email, onSignOut }) {
  function handleSignOut() {
    onSignOut();
  }
  return (
    <header className="header">
      <img
        id="aroundSvg"
        alt="Around the U.S."
        className="header__logo"
        src={logo}
      />
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__user">{email}</p>
          <span className="header__link" onClick={handleSignOut}>
            Sign out
          </span>
        </div>
      </Route>
      <Route path="/signin">
        <div className="header__wrapper">
          <Link className="header__link" to="/signup">
            Sign up
          </Link>
        </div>
      </Route>
      <Route path="/signup">
        <div className="header__wrapper">
          <Link className="header__link" to="/signin">
            Sign in
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
