import { Routes, Route, NavLink } from "react-router-dom";
import clsx from "clsx";
import { getTrendMovie } from "./api/api.js";
import { useEffect, useState } from "react";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage.jsx";
import { MovieDetailsPage } from "./pages/MovieDetailsPage/MovieDetailsPage.jsx";
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
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
