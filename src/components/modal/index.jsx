import React, { Component } from 'react';
import css from './modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.modalRef && !this.modalRef.contains(event.target)) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div>
        <div className={css.overlay} onClick={this.props.onClose} />
        <div ref={ref => (this.modalRef = ref)} className={css.modal}>
          <img
            className={css.image}
            src={this.props.image.largeImageURL}
            alt={this.props.image.tags}
          />
        </div>
      </div>
    );
  }
}

export default Modal;
