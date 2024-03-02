import { useState, useEffect } from "react";
import React from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import "./App.css";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=a6767de5";

// const movie = {
//   Title: "Iron Man",
//   Year: "2008",
//   imdbID: "tt0371746",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("all");
  }, []);
  return (
    <div className="app">
      <h1>MarvelFlix</h1>
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          placeholder="search......"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
