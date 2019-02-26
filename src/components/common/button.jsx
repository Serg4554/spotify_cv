import React from "react";
import PropTypes from "prop-types";
import style from './button.module.css';

const Button = (props) => (
  <div {...props}>
    <div
      className={[style.button, style[props.size]].join(' ')}>
      {props.children}
    </div>
  </div>
);

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Button.defaultProps = {
  size: 'medium',
};

export default Button;