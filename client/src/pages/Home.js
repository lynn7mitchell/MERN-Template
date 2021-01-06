import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>MERN TEMPLATE</h1>
      <Link to={"/login"}>
        <button>Log In</button>
      </Link>
      <Link to={"/signup"}>
        <button> Sign Up</button>
      </Link>
      <p>Demo Login:</p>
      <p>Email: code7sandbox@gmail.com</p>
      <p>Password: DemoTest#1</p>
    </div>
  );
}
