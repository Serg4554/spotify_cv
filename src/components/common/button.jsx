import React from "react";
import './button.css';

const Button = (props) => (
  <div {...props}>
    <div className="button">{props.children}</div>
  </div>
);

export default Button;