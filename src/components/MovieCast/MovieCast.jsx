import { useState, useEffect } from "react";
import { getMovieCreditsById } from "../../api/api";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage.jsx";
import css from "./MovieCast.module.css";

export const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(false);
        setLoader(true);
        const fetchedCredits = await getMovieCreditsById(movieId);
        const firstsCasts = fetchedCredits.cast.slice(0, 12);
        setCasts(firstsCasts);
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
      <div className={css.loader}>{loader && <ClipLoader />}</div>
      {error && (
        <NotFoundPage>
          Ooops! Something is wrong... Please try again or go back.
        </NotFoundPage>
      )}
      <ul className={css.list}>
        {casts.map((cast) => {
          const imgUrl = `https://image.tmdb.org/t/p/w500${cast.profile_path}`;
          return (
            <li className={css.item} key={cast.cast_id}>
              <img
                className={css.castImg}
                src={imgUrl}
                alt={cast.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFliLfU9Jo4QaNyNBaRMRgwKBC3M6u7H17A&usqp=CAU";
                  e.target.alt = "alternative poster blur";
                }}
              />
              <h5 className={css.actorName}>{cast.name}</h5>
              <p className={css.character}>Character: {cast.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
