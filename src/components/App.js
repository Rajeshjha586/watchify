import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { WatchedMovieList } from "./WatchedMovieList";
import { WatchedMovieSummary } from "./WatchedMovieSummary";
import { MovieDetails } from "./MovieDetails";
import { MovieList } from "./MovieList";
import { MovieBox } from "./MovieBox";
import { MovieGallery } from "./MovieGallery";
import { NumResult } from "./NumResult";
import { SearchBar } from "./SearchBar";
import { NavBar } from "./NavBar";
import { ErrorMessage } from "./ErrorMessage";
import {Spinner} from './Spinner';

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const API_KEY = "36291f1";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const { movies, isLoading, error } = useMovies(query);

  function handleSelctedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleAddWatchedMovies(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imbdID !== id));
  }

function handleCloseMovie() {setSelectedId(null)};

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>

      <MovieGallery>
        <MovieBox>
          {isLoading && <Spinner />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSlectedMovie={handleSelctedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </MovieBox>

        <MovieBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onHandleAddWatchedMovie={handleAddWatchedMovies}
              watched={watched}
            />
          ) : (
            <>
              {" "}
              <WatchedMovieSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onHandleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </MovieBox>
      </MovieGallery>
    </>
  );
}
