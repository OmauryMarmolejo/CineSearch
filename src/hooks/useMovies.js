import { useState } from "react";
import { fetchMovies } from "../services/movies";

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const newMovies = await fetchMovies({ search });
    setMovies(newMovies);
  };

  return { movies, getMovies };
}
