import css from "./button.module.css"

const Button = ({ isInvisible, onClick }) => {
  const isVisible = !isInvisible;
  const visibilityClass = isVisible ? css['button--is-active'] : '';

  return (
    <div className={css.btnBox}>
      <button
        className={`${css.button} ${visibilityClass}`}
        onClick={onClick}
      >
        Load More
      </button>
    </div>
  );
};

export default Button;