import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import setAuthToken from "../utils/setAuthtoken";

export default function SignUp() {
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
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
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (passwordRegex.test(formData.password) !== true) {
      setErrors({
        password:
          "Password must be 8 characters and have at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
      });
    }

    if (formData.password !== this.state.confirmPassword) {
      setErrors({
        password: "passwords do not match",
      });
    }

    const newUser = {
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
            // if (res.data.token) {
            //   const { token } = res.data;
            //   localStorage.setItem("example-app", token);
            //   setAuthToken(token);
            // }
            // setRedirect(true),
            //   setErrors({
            //     errors: {},
            //   });
          })
          .catch((err) => {
            console.error(err.res.data);
            setErrors(err.res.data);
          });
      })
      .catch((err) => {
        console.error(err.res.data);
        setErrors(err.res.data);
      });
  };
  if (redirect) {
    return <Redirect to="/dashboard" />;
  }
  return( 
  <div>
     <Link to={{ pathname: "/" }}>
        <i className="material-icons back-button">arrow_back</i>
      </Link>
      <h3>SIGN UP</h3>
      
  </div>);
}
