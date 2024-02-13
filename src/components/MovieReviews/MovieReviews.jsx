import { useState, useEffect } from "react";
import { getMovieReviewsById } from "../../api/api";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage.jsx";
import css from "./MovieReviews.module.css";

export const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setError(false);
        setLoader(true);
        const fetchedReviews = await getMovieReviewsById(movieId);
        setReviews(fetchedReviews.results);
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
      {reviews.length === 0 && (
        <NotFoundPage>We dont have any reviews for this movie.</NotFoundPage>
      )}
      <ul className={css.list}>
        {reviews.map((review) => {
          return (
            <li className={css.item} key={review.id}>
              <h4 className={css.autorName}>Author: {review.author}</h4>
              <p className={css.reviewsText}>{review.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
