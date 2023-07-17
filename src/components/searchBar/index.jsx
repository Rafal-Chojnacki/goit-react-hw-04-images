import Notiflix from "notiflix";
import axios from 'axios';
import css from "./searchBar.module.css"
import { useState } from "react";
import { ColorRing } from 'react-loader-spinner';

const SearchBar = ({ handleImages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiKey = '31641463-8cc19d34af378b8aeb6cde8f1';

    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${searchTerm}&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (response.data.hits.length === 0) {
          Notiflix.Notify.warning('No results found. Please try again');
          handleImages(searchTerm, response.data.hits, response.data.totalHits);
        } else {
          handleImages(
            searchTerm,
            response.data.hits,
            response.data.totalHits
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
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
            onChange={handleChange}
          />
        </form>
      </header>
      {isLoading && (
        <ColorRing type="TailSpin" color="#00BFFF" height={80} width={80} />
      )}
    </div>
  );
};

export default SearchBar;