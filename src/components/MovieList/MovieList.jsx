import { MovieListItem } from "../MovieListItem/MovieListItem.jsx";
import css from "./MovieList.module.css";

export const MovieList = ({ movies }) => {
  return (
    <div>
      <h1 className={css.title}>Finding movies:</h1>
      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            <MovieListItem key={movie.id} movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};
