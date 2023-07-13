import { useCallback, useRef, useState, useMemo } from "react";
import { fetchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await fetchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    console.log("sortedMovies function created");
    return sort
      ? [...movies.sort((a, b) => a.title.localeCompare(b.title))]
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, getMovies, error, loading };
}
