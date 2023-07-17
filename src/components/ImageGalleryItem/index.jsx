import React, { Component } from 'react';
import css from './imageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className={css.item} key={this.props.image.id}>
        <img
          className={css.image}
          src={this.props.image.webformatURL}
          alt={this.props.image.tags}
          onClick={() => this.props.openModal(this.props.image)}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
