import React, { Component } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';
import css from './searchBar.module.css';
import { ColorRing } from 'react-loader-spinner';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      isLoading: false,
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { searchTerm } = this.state;
    const apiKey = '31641463-8cc19d34af378b8aeb6cde8f1';

    this.setState({ isLoading: true });

    setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${searchTerm}&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (response.data.hits.length === 0) 
        {Notiflix.Notify.warning('No results found. Please try again')
        this.props.handleImages
        (searchTerm,
          response.data.hits,
          response.data.totalHits );}
         else 
         {this.props.handleImages
          (searchTerm,
          response.data.hits,
          response.data.totalHits
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }, 1000);
  };

  handleChange = event => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    const { searchTerm, isLoading } = this.state;

    return (
      <div>
        <header className={css.searchBar}>
          <form className={css.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.searchBtn}>
              <span className={css.buttonLabel}>Search</span>
            </button>
            <input
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={searchTerm}
              onChange={this.handleChange}
            />
          </form>
        </header>
        {isLoading && (
          <ColorRing type="TailSpin" color="#00BFFF" height={80} width={80} />
        )}
      </div>
    );
  }
}

export default SearchBar;
