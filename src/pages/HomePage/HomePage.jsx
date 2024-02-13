import { MovieListItem } from "../../components/MovieListItem/MovieListItem";
import css from "./HomePage.module.css";

export default function HomePage({ movies }) {
  return (
    <div>
      <h1 className={css.title}>Trending Movies</h1>
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
