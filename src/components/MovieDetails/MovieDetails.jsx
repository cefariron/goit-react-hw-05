import css from "./MovieDetails.module.css";

export const MovieDetails = ({ movie, genres, year, rating }) => {
  const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className={css.movieContainer}>
      <div className={css.posterContainer}>
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
  );
};
