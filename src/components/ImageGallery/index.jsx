import React from "react";
import css from "./imageGallery.module.css";
import ImageGalleryItem from "components/ImageGalleryItem";

const ImageGallery = ({ images, openModal, hits, searchTerm }) => {
  console.log(images.length);
  if (hits === 0) {
    return <ul className={css.gallery}></ul>;
  }
  return (
    <ul className={css.gallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={`${searchTerm}-${image.id}`}
          image={image}
          openModal={openModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
