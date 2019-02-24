import React from "react";
import PropTypes from "prop-types";
import './button.css';

const Button = (props) => (
  <div {...props}>
    <div className={"button " + props.size}>{props.children}</div>
  </div>
);

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Button.defaultProps = {
  size: 'medium',
};

export default Button;