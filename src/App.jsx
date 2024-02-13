import { Routes, Route } from "react-router-dom";
import { getTrendMovie } from "./api/api.js";
import { useEffect, useState, lazy, Suspense } from "react";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import { MovieCast } from "./components/MovieCast/MovieCast.jsx";
import { MovieReviews } from "./components/MovieReviews/MovieReviews.jsx";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import css from "./App.module.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage.jsx"));


export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setError(false);
        setLoader(true);
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
      } finally {
        setLoader(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <div className={css.loader}>{loader && <ClipLoader />}</div>
      {error && (
        <NotFoundPage>
          Ooops! Something is wrong... Please refresh page!
        </NotFoundPage>
      )}

      <Navbar />
      
      <Suspense fallback={<ClipLoader/>}>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
