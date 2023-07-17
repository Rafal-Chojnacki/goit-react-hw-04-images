import css from "./imageGalleryItem.module.css"

const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <li className={css.item} key={image.id}>
      <img
        className={css.image}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => openModal(image)}
      />
    </li>
  );
};

export default ImageGalleryItem;