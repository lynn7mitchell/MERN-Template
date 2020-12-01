import React, { useState, useEffect } from "react";
import setAuthToken from "../utils/setAuthtoken";
import axios from "axios";

export default function Dashboard() {

  const [user, setUser] = useState({})
  useEffect(() => {
    // gets the bearer token to validate the user that is logged in
    const token = localStorage.getItem("example-app");

    if (token) {
      setAuthToken(token);
    }

    axios.get("/api/user")
    .then(res =>{
      setUser(res.data)
    })
    .catch((err) => {
      console.error(err.res.data);
    });

  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user.firstName + ' ' + user.lastName }</h2>
    </div>
  )
}
