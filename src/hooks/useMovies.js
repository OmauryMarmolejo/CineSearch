import { useState } from "react";
import { fetchMovies } from "../services/movies";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const newMovies = await fetchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { movies, getMovies, error, loading };
}
