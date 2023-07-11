function MoviesList({ movies }) {
  return (
    <main>
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </li>
        ))}
      </ul>
    </main>
  );
}

function NoMoviesResults() {
  return <p>No movies found!</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <MoviesList movies={movies} /> : <NoMoviesResults />;
}
