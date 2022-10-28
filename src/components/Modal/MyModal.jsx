import React, { useEffect, useRef } from "react";

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
    <div ref={modalRef} className="modal modal-container">
      {props.el}

      <button onClick={closeModal}>모달 창 닫기</button>
    </div>
  );
}

export default MyModal;
