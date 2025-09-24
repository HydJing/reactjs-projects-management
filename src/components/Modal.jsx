import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import Button from "./Button.jsx";

const Modal = forwardRef(function Modal({ title, message, buttonCaption, children, onClose }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  useEffect(() => {
    const modal = dialog.current;
    if (onClose) {
      modal.addEventListener('close', onClose);
    }

    return () => {
      if (onClose) {
        modal.removeEventListener('close', onClose);
      }
    };
  }, [onClose]);

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      <h2 className="text-xl font-bold text-stone-700 my-4">{title}</h2>
      <p className="text-stone-600 mb-4">{message}</p>
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
