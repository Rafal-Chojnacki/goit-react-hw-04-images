import {useEffect, useRef } from "react"
import css from "./modal.module.css"

const Modal = ({ image, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div>
      <div className={css.overlay} onClick={onClose} />
      <div ref={modalRef} className={css.modal}>
        <img
          className={css.image}
          src={image.largeImageURL}
          alt={image.tags}
        />
      </div>
    </div>
  );
};

export default Modal;