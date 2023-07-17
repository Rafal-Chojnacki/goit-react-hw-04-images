import React from 'react';
import axios from 'axios';
import SearchBar from './searchBar';
import ImageGallery from './ImageGallery';
import { Component } from 'react';
import Modal from './modal';
import Button from './button';
import { ColorRing } from 'react-loader-spinner';
import Notiflix from 'notiflix';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      images: [],
      selectedImage: null,
      currentPage: 1,
      isLoading: false,
      totalHits: 0,
    };
  }

  handleImages = (searchTerm, newImages, totalHits) => {
    this.setState({
      searchTerm,
      images: newImages,
      totalHits,
    });
  };

  setImages = images => {
    this.setState(prevState => ({
      ...prevState,
      images: [...prevState.images, ...images],
    }));
  };

  openModal = image => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  loadMoreImages = async () => {
    const { searchTerm, currentPage } = this.state;
    const apiKey = '31641463-8cc19d34af378b8aeb6cde8f1';
    const nextPage = currentPage + 1;
    const response = await axios.get(
      `https://pixabay.com/api/?q=${searchTerm}&page=${nextPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const newImages = response.data.hits;
    this.setState(prevState => ({
      images: [...prevState.images, ...newImages],
      currentPage: nextPage,
    }));
  
  }
  render() {
    if (this.state.images.length === this.state.totalHits) {
      Notiflix.Notify.warning('There are not more images which You search or You have reached the limit')
  };
    console.log(`The number of images is ${this.state.images.length}`)
  console.log(`the total hits number is ${this.state.totalHits}`)
    const { isLoading, images, selectedImage } = this.state;
    return (
      <div>
        <SearchBar handleImages={this.handleImages} />
        {isLoading ? (
          <ColorRing />
        ) : (
          <ImageGallery
            key={this.state.searchTerm}
            images={images}
            searchTerm={this.state.searchTerm}
            openModal={this.openModal}
          />
        )}
        {selectedImage && (
          <Modal image={selectedImage} onClose={this.closeModal} />
        )}
        {this.state.images.length === 0 || this.state.images.length >= this.state.totalHits ? (
          <Button isInvisible={true} onClick={this.loadMoreImages} />
        ) : (
          <Button onClick={this.loadMoreImages} />
        )}
      </div>
    );
  }
}

export default App;
