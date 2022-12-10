import React, { useEffect, useRef } from "react";

import close from "../../images/icons/close.png";

function MyModal(props) {
  const closeModal = () => {
    props.setIsOpen(false);
  };

  const modalRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={modalRef}
      className={
        props.isAnimation
          ? "modal modal-container modal-animation"
          : "modal modal-container"
      }
    >
      <div className="modal-header">
        <img
          className="close-button"
          src={close}
          alt="close"
          onClick={closeModal}
        />
      </div>
      {props.el}
    </div>
  );
}

export default MyModal;
