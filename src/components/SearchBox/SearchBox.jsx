import css from "./SearchBox.module.css";

export const SearchBox = ({ onSubmit, setSearchParams }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
    const form = evt.currentTarget;
    setSearchParams({ params: form.elements.searchBox.value });
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="searchBox"
        autoFocus
        autoComplete="off"
        placeholder="Enter your search request..."
      />
      <button className={css.searchBtn} type="submit">
        Search movies
      </button>
    </form>
  );
};
