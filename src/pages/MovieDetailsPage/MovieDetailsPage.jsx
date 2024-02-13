import { useLocation, useParams, Link, NavLink, Outlet } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { getMovieById } from "../../api/api";
import { useRef, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { MovieDetails } from "../../components/MovieDetails/MovieDetails";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const linkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state);
  const { movieId } = useParams();

  const [movie, setMovie] = useState({});
  const [error, setError] = useState(false);
  const [genresObj, setGenresObj] = useState([]);
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [loader, setLoader] = useState(false);

  const genresListArr = genresObj.map((genre) => genre.name);
  const genres = genresListArr.join(", ");

  useEffect(() => {
    async function fetchData() {
      try {
        setError(false);
        setLoader(true);
        const fetchedMovies = await getMovieById(movieId);
        setMovie(fetchedMovies);
        setYear(fetchedMovies.release_date.substring(0, 4));
        setRating(fetchedMovies.vote_average.toFixed(1));
        setGenresObj(fetchedMovies.genres);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <div className={css.container}>
      <div className={css.backLinkContainer}>
        <Link className={css.backLink} to={backLinkRef.current}>
          <div className={css.iconContainer}>
            <IoArrowBack />
          </div>
          Go back
        </Link>
      </div>

      <div className={css.loader}>{loader && <ClipLoader />}</div>

      {error && (
        <NotFoundPage>
          Ooops! Something is wrong... Please refresh page or go back.
        </NotFoundPage>
      )}

      {Object.keys(movie).length > 0 && (
        <MovieDetails
          movie={movie}
          genres={genres}
          year={year}
          rating={rating}
        />
      )}

      {Object.keys(movie).length > 0 && (
        <div>
          <h4 className={css.addTitle}>Additional information</h4>
          <div className={css.linkContainer}>
            <NavLink to="cast" className={linkClass}>
              Cast
            </NavLink>
            <NavLink to="reviews" className={linkClass}>
              Reviews
            </NavLink>
          </div>
        </div>
      )}

        <Outlet />
    </div>
  );
}
