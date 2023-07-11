import "./App.css";
import { useState, useEffect } from "react";
import { useMovies } from "./hooks/useMovies";
import { Movies } from "./components/Movies";

function useSearch() {
  const { search, updateSeach } = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
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
  const { movies } = useMovies();
  const { search, updateSeach, error } = useSearch();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    updateSeach(event.target.value);
  };

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
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
