import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { getMovieById } from "../../api/api";
import { useEffect, useState } from "react";
import css from "./MovieDetailsPage.module.css";

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);
  const [genresObj, setGenresObj] = useState([]);
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const genresListArr = genresObj.map((genre) => genre.name);
  const genres = genresListArr.join(", ");

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedMovies = await getMovieById(movieId);
        setMovie(fetchedMovies);
        setYear(fetchedMovies.release_date.substring(0, 4));
        setRating(fetchedMovies.vote_average.toFixed(1));
        setGenresObj(fetchedMovies.genres);
      } catch (error) {
        console.log(error.message);
        setError(true);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <div className={css.container}>
      <div className={css.backLinkContainer}>
        <Link className={css.backLink} to="/">
          <div className={css.iconContainer}>
            <IoArrowBack />
          </div>
          Go back
        </Link>
      </div>
      <div className={css.movieContainer}>
        <div className={css.posterContainer}>
          <img className={css.poster} src={imgUrl} alt={movie.title} />
        </div>
        <div className={css.movieDescriptionContainer}>
          <h2 className={css.title}>
            {movie.original_title} ({year})
          </h2>
          <p className={css.rating}>User rating: {rating}</p>
          <h3 className={css.titleOverview}>Overview</h3>
          <p className={css.overview}>{movie.overview}</p>
          <h3 className={css.titleGenres}>Genres</h3>
          <p className={css.genres}>{genres}</p>
          <p></p>
        </div>
      </div>
      <div>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </div>

      <Outlet />
    </div>
  );
};
