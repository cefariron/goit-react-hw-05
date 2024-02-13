import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBox } from "../../components/SearchBox/SearchBox.jsx";
import { MovieList } from "../../components/MovieList/MovieList.jsx";
import { getMovieReviewsBySearch } from "../../api/api.js";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import css from './MoviesPage.module.css';

export const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(null)
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("params") ?? "";

  useEffect(() => {
    if (!query) {
      return;
    }

    async function fetchData() {
      try {
        setError(false);
        setLoader(true);
        const fetchedMovies = await getMovieReviewsBySearch(query);
        setMovies(fetchedMovies.results);
        setTotalResults(fetchedMovies.total_results)
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, [query]);

  const handleSubmit = () => {
    setMovies([]);
  };

  return (
    <div className={css.container}>
      <h1 className={css.searchTitle}>Search movie!</h1>
      <SearchBox onSubmit={handleSubmit} setSearchParams={setSearchParams} />

      <div className={css.loader}>{loader && <ClipLoader />}</div>

      {error && <NotFoundPage>
        Ooops! Something is wrong... Please refresh page or try again.
        </NotFoundPage>}

      {totalResults === 0 && <NotFoundPage>
        Nothing was found for your request ({query})...
        </NotFoundPage>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};
