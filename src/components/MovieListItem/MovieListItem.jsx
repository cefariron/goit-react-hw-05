import { Link } from "react-router-dom";
import css from "./MovieListItem.module.css";

export const MovieListItem = ({ movie }) => {
  // const location = useLocation();
  const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const moviePath = `/movies/${movie.id}`;

  return (
    <Link  to={moviePath}>
      <div className={css.container}>
        <h3 className={css.title}>{movie.title}</h3>
        <img className={css.poster} src={imgUrl} alt={movie.title} />
      </div>
    </Link>
  );
};
