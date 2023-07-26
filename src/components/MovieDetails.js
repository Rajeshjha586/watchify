import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "./hooks/useKey";
import { API_KEY } from "./App";
import { Spinner } from "./Spinner";

export function MovieDetails({
  selectedId, onCloseMovie, onHandleAddWatchedMovie, watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useKey('Escape', onCloseMovie);

  const isMovieAlreadyRated = watched
    .map((movie) => movie.imbdID)
    .includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imbdID === selectedId
  )?.userRating;

  const {
    Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre, Language: language,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }

      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(() => {
    if (!title) return;

    document.title = `Movie | ${title}`;

    return () => {
      document.title = "🍿 Watchify";
    };
  }, [title]);

  useEffect(() => {
    if (userRating) {
      countRef.current = countRef.current + 1;
    }
  }, [userRating]);

  function onAddingWatchedMovie() {
    const newMovieItem = {
      imbdID: selectedId,
      title,
      year,
      poster,
      imbdRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecision: countRef.current,
    };

    onHandleAddWatchedMovie(newMovieItem);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>{" "}
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>
                {title} {year}
              </h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <strong>Genres:</strong> {genre}
              </p>
              <p>
                <strong>Language: </strong>
                {language}
              </p>
              <p>
                <strong>IMDb Ratings:</strong> <span>⭐️</span>
                {imdbRating}/10{" "}
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isMovieAlreadyRated ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetMovieRating={setUserRating} />
                  <button className="btn-add" onClick={onAddingWatchedMovie}>
                    + Add to list
                  </button>
                </>
              ) : (
                <p>
                  You already rated this movies as <span>⭐️</span>{" "}
                  {watchedUserRating}/10
                </p>
              )}
            </div>
            <p>
              <strong>StoryLine: </strong>
              <em>{plot}</em>
            </p>
            <p>
              <strong>Stars Cast: </strong>
              {actors}
            </p>
            <p>
              <strong>Directed by </strong>
              {director}
            </p>
          </section>
        </>
      )}
    </div>
  );
}
