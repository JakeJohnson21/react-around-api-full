import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
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
    onRegister(userData);
  };

  return (
    <div className="auth__container">
      <form className="auth__form">
        <h2 className="auth__form-title">Sign up</h2>
        <label className="auth__input-field">
          <input
            className="auth__input"
            placeholder="Email"
            required
            name="email"
            type="text"
            onChange={assignEmail}
          ></input>
        </label>
        <label className="auth__input-field">
          <input
            className="auth__input"
            type="password"
            required
            name="password"
            placeholder="Password"
            onChange={assignPassword}
          ></input>
        </label>
        <button
          className="auth__submit-button"
          onClick={handleSubmit}
          type="text"
        >
          Sign up
        </button>
        <div className="auth__redirect">
          <p className="auth__redirect_text">Already a member?</p>
          <Link className="auth__redirect_button" to="/signin">
            Sign in here!
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
