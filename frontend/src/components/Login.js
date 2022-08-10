import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function assignEmail(e) {
    setEmail(e.target.value);
  }
  function assignPassword(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onLogin(userData);
  };

  return (
    <div className="auth__container">
      <form className="auth__form">
        <h2 className="auth__form-title">Sign in</h2>
        <div className="auth__input-field">
          <input
            className="auth__input"
            placeholder="Email"
            required
            name="email"
            type="text"
            onChange={assignEmail}
          ></input>
        </div>
        <div className="auth__input-field">
          <input
            className="auth__input"
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={assignPassword}
          ></input>
        </div>
        <button
          className="auth__submit-button"
          onClick={handleSubmit}
          type="submit"
        >
          Sign in
        </button>
        <div className="auth__redirect">
          <p className="auth__redirect_text">Not a member yet?</p>
          <Link className="auth__redirect_button" to="/signup">
            Sign up here!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
