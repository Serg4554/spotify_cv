import React from "react";
import ResponsiveModal from 'react-responsive-modal';

const Modal = (props) => {
  let modalStyle = {
    borderRadius: "10px",
    background: "#252525",
    boxShadow: "0 5px 30px 0 rgba(0, 0, 0, .5)",
    border: "1px solid #333"
  };
  Object.assign(modalStyle, props.style);

  let {style, styles, center, ...other} = props;

  return (
    <ResponsiveModal
      {...other}
      center
      styles={{
        overlay: {background: "rgba(0, 0, 0, .6)"},
        modal: modalStyle,
        closeButton: {visibility: "hidden"}
      }}
    >
      {props.children}
    </ResponsiveModal>
  );
};

export default Modal;