import "./App.css";
import { useState, useEffect, useRef } from "react";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";

function useSearch() {
  const [search, updateSeach] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = "search" === "";
      return;
    }
    if (search === "") {
      setError("Please enter a movie title");
      return;
    }

    if (search?.length < 3) {
      setError("Please enter at least 3 characters");
      return;
    }

    if (search?.match(/^\d+$/)) {
      setError("Please enter a valid movie title");
      return;
    }
    setError(null);
  }, [search]);

  return { search, updateSeach, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSeach, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    updateSeach(event.target.value);
  };

  useEffect(() => {
    console.log("NewMovies");
  }, [getMovies]);

  return (
    <div className="page">
      <header>
        <h1>Movie Search</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            name="query"
            onChange={handleChange}
            value={search}
            placeholder="Avengers, Star Wars, Harry Potter..."
          />
          <input
            type="checkbox"
            name="sort"
            onChange={handleSort}
            checked={sort}
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>
      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
