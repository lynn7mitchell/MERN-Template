import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import authenticate from "../utils/Authenticate";
import setAuthToken from "../utils/setAuthtoken";

export default function Login() {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // gets the bearer token to validate the user that is logged in
    const token = localStorage.getItem("example-app");

    // if token is authenticated redirect page to /dashboard
    if (authenticate(token)) {
      setRedirect(true);
    }
  }, []);

  // for for field change
  const onChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, hasChanged: true, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      email: formData.email,
      password: formData.password
    };
    axios
      .post("/api/user/login", newUser)
      .then((res) => {
        if (res.data.token) {
          const { token } = res.data;

          localStorage.setItem("example-app", token);
          setAuthToken(token);
        }
        console.log('here')
        setRedirect(true);
        setErrors(errors);
      })
      .catch((err) => {
        console.error(err.res.data);
        setErrors(err.res.data);
      });
  };

  if (redirect) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <Link to={{ pathname: "/" }}>
        <i className="material-icons back-button">arrow_back</i>
      </Link>
      <h3>LOG IN</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        {/* Email */}
        <input
          type="email"
          id="email"
          type="email"
          className="form-feild"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => onChange(e)}
        />

        {/* Password */}
        <input
          type="password"
          id="password"
          type="password"
          className="form-feild"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => onChange(e)}
        />

        <button type="submit" name="action">
          LOG IN
        </button>
      </form>
    </div>
  );
}
