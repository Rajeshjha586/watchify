import { Movie } from "./Movie";

export function MovieList({ movies, onSlectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSlectedMovie={onSlectedMovie} />
      ))}
    </ul>
  );
}
