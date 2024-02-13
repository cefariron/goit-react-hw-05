import { Routes, Route, NavLink } from "react-router-dom";
import clsx from "clsx";
import { getTrendMovie } from "./api/api.js";
import { useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage.jsx";
import { MoviesDetailsPage } from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
import { MovieCast } from "./components/MovieCast/MovieCast.jsx";
import { MovieReviews } from "./components/MovieReviews/MovieReviews.jsx";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage.jsx";
import css from "./App.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const fetchedMovies = await getTrendMovie({
          page: "1",
          abortController: controller,
        });
        // console.log(fetchedMovies);
        setMovies(fetchedMovies.results);
      } catch (error) {
        if (error.code !== "ERR_CANCELED") {
          console.log(error.message);
          setError(true);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  // console.log(movies);

  return (
    <div>
      <header className={css.header}>
        <nav className={css.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MoviesDetailsPage />} />
        <Route path="/movies/:movieId/cast" element={<MovieCast />} />
        <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>

    // <div>
    //   <h1>Trending Movies</h1>
    //   <ul>
    //     {movies.map(movie => {
    //       const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    //       return <li key={movie.id}>
    //         <div>
    //           <h3>{movie.title}</h3>
    //           <img src={imgUrl} alt={movie.title} width={200} height={300}/>
    //         </div>
    //       </li>
    //     })}
    //   </ul>
    // </div>
  );
}
