import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import Notiflix from 'notiflix';
import SearchBar from './searchBar';
import ImageGallery from './ImageGallery';
import Modal from './modal';
import Button from './button';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

 
  const handleImages = (searchTerm, newImages, totalHits) => {
    setSearchTerm(searchTerm);
    setImages(newImages);
    setTotalHits(totalHits);
  };

  
  const openModal = (image) => {
    setSelectedImage(image);
  };


  const closeModal = () => {
    setSelectedImage(null);
  };

  const loadMoreImages = async () => {
    const apiKey = '31641463-8cc19d34af378b8aeb6cde8f1';
    const nextPage = currentPage + 1;

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${searchTerm}&page=${nextPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newImages = response.data.hits;

      setImages((prevImages) => [...prevImages, ...newImages]);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Failed to load more images:', error);
      // Handle error, show error message, etc.
    }
  };

  useEffect(() => {
    if (images.length === totalHits) {
      Notiflix.Notify.warning(
        'There are no more images that match your search or you have reached the limit.'
      );
    }
    console.log(`The number of images is ${images.length}`);
    console.log(`The total hits number is ${totalHits}`);
  }, [images.length, totalHits]);

  return (
    <div>
      <SearchBar handleImages={handleImages} />
      {isLoading ? (
        <ColorRing />
      ) : (
        <ImageGallery
          key={searchTerm}
          images={images}
          searchTerm={searchTerm}
          openModal={openModal}
        />
      )}

      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}

      {images.length === 0 || images.length >= totalHits ? (
        <Button isInvisible={true} onClick={loadMoreImages} />
      ) : (
        <Button onClick={loadMoreImages} />
      )}
    </div>
  );
};

export default App;
