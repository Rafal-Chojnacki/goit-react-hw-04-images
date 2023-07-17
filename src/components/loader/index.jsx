import React, { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';
import css from './loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={css.loaderBox}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
        />
      </div>
    );
  }
}

export default Loader;
