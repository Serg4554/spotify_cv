import React from "react";
import PropTypes from "prop-types";
import style from './button.module.css';

const Button = (props) => {
  const {size, enabled, onClick, ...other} = props;

  let classNames = [style.button, style[props.size]];
  if(!props.enabled) {
    classNames.push(style.disabled);
  }

  return (
    <div
      {...other}
      onClick={() => {
        if(props.enabled && onClick) {
          onClick();
        }
      }}
    >
      <div className={classNames.join(' ')}>{props.children}</div>
    </div>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  enabled: PropTypes.bool
};

Button.defaultProps = {
  size: 'medium',
  enabled: true
};

export default Button;