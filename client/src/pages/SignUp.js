import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../utils/setAuthtoken";

export default function SignUp() {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // for for field change
  const onChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, hasChanged: true, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // check for strong password
    //  8 Characters, 1 uppercase Letter, 1 Lowercase letter 1 Number, and 1 Special Character
    // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    // found regex at https://www.w3resource.com/javascript/form/password-validation.php
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

    if (passwordRegex.test(formData.password) !== true) {
      setErrors({
        password:
          "Password must be at least 8 characters and have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      });
      return (console.log("Password must be at least 8 characters and have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",))
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        password: "passwords do not match",
      });
      return (console.log("passwords do not match"))
    }

    const newUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    axios
      .post("api/user", newUser)
      .then((res) => {
        setErrors({
          errors: "none",
        });

        // after use is signed up the app will log them in immediately and redirect to /dashboard

        axios
          .post("api/user/login", newUser)
          .then((res) => {
            if (res.data.token) {
              const { token } = res.data;
              localStorage.setItem("example-app", token);
              setAuthToken(token);
            }
            setRedirect(true)
              setErrors({
                errors: {},
              });
          })
          .catch((err) => {
            console.error(err.res.data);
            setErrors(err.res.data);
          });
      })
      .catch((err) => {
        console.error(err.response.data);
        setErrors(
         err.response.data,
        );
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
      <h3>SIGN UP</h3>
      <form onSubmit={(e) => onSubmit(e)}>
      {errors.email === "This email already exists" ? <p>This email already exists</p> : ''}
      {errors.password ? <p>{errors.password}</p> : ''}
         {/* First Name */}
         <input
          type="text"
          id="firstName"
          className="form-feild"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => onChange(e)}
        />

         {/* Email */}
         <input
          type="text"
          id="lastName"
          className="form-feild"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => onChange(e)}
        />

        {/* Email */}
        <input
          type="email"
          id="email"
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
          className="form-feild"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => onChange(e)}
        />

        {/* Confirm Password */}
        <input
          type="password"
          id="Confirm Password"
          className="form-feild"
          name="confirmPassword"
          placeholder="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => onChange(e)}
        />

        <button type="submit" name="action">
          SIGN UP
        </button>
      </form>
    </div>
  );
}
