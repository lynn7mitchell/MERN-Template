import React from 'react'
import { Link } from "react-router-dom";

export default function NoMatch() {
  return (
    <div>
    <div>
        <Link
          to={{
            pathname: "/",
          }}
        >
          <i className="material-icons back-button">arrow_back</i>
        </Link>

        <h1>404 Page Not Found</h1>
      </div>
    </div>
  )
}
