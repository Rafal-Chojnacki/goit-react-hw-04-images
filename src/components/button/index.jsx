import React, { Component } from 'react';
import css from './button.module.css';

class Button extends Component {
  render() {
    console.log(this.props.isInvisible);
    const isVisible = !this.props.isInvisible;
    const visibilityClass = isVisible ? css['button--is-active'] : '';

    return (
      <div className={css.btnBox}>
        <button
          className={`${css.button} ${visibilityClass}`}
          onClick={this.props.onClick}
        >
          Load More
        </button>
      </div>
    );
  }
}

export default Button;
