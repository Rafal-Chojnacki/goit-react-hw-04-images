import React, { Component } from 'react';
import css from './imageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images, openModal, hits } = this.props;
    console.log(images.length)
    if (hits === 0) {
      <ul className={css.gallery}>
      </ul>
      return;
    }
    return (
      <ul className={css.gallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={`${this.props.searchTerm}-${image.id}`}
            image={image}
            openModal={openModal}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
