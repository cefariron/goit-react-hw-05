import { useLocation, Link } from "react-router-dom";
import css from "./MovieListItem.module.css";

export const MovieListItem = ({ movie }) => {
  const location = useLocation();
  const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const moviePath = `/movies/${movie.id}`;

  return (
    <Link to={moviePath} state={location}>
      <div className={css.container}>
        <h3 className={css.title}>{movie.title}</h3>
        <img
          className={css.poster}
          src={imgUrl}
          alt={movie.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://img.freepik.com/free-vector/blurred-background-with-light-colors_1034-245.jpg?size=338&ext=jpg&ga=GA1.1.87170709.1707782400&semt=sph";
            e.target.alt = "alternative poster blur";
          }}
        />
      </div>
    </Link>
  );
};
