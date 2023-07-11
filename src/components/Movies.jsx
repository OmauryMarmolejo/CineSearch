function MoviesList({ movies }) {
  return (
    <main>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
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
