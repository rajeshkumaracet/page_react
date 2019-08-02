import React from "react";
import "./Header.scss";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <div className="jumbotron ">
      <div className="container">
        <h1 className="display-4">iConnect</h1>
        <p className="lead">Find ur favourite Employes & details!</p>
      </div>
    </div>
  );
};

export default Header;
