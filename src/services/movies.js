const API_KEY = "4287ad07";

export const fetchMovies = async ({ search }) => {
  if (search === "") {
    return null;
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
    );
    const data = await response.json();

    const movies = data.Search;

    return movies.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Error fetching movies");
  }
};
