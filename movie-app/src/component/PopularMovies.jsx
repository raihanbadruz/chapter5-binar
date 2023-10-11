import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { getMovieList } from "./Api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";

function PopularMovies() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const movieBanner = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    getMovieList((data) => {
      setMovies(data.results);
    });
  }, []);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className="home-banner">
        <div className="banner-image">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieBanner?.backdrop_path}`}
            alt=""
            className="image-container"
          />
          <div className="navbar-wrapper">
            <h4>Movielist</h4>
            <input
              type="search"
              name=""
              id=""
              placeholder="What do you want to watch?"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="button-wrapper">
              {isLoggedIn ? (
                <>
                  <Button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setIsLoggedIn(false);
                      return navigate("/");
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button as={Link} to="/login">
                    Login
                  </Button>
                  <Button as={Link} to="/register">
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="content-wrapper">
            <h3>{movieBanner?.original_title}</h3>
            <p>{movieBanner?.overview}</p>
            <button>Watch Trailer</button>
          </div>
        </div>
      </div>
      <div className="app">
        <div className="app-header">
          <h2>Popular Movies</h2>
          <div className="movie-container d-flex flex-wrap m-5">
            {movies.length > 0 &&
              movies
                .filter((movie) => {
                  return search.toLowerCase() === ""
                    ? movie
                    : movie.title.toLowerCase().includes(search);
                })
                .map((movie, index) => (
                  <Card
                    key={index}
                    variant="secondary"
                    className="card-img mx-4 mb-2"
                    style={{ width: "18rem" }}
                  >
                    <Card.Img />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt=""
                      />
                      <Link to={`/Detail/${movie.id}`}>
                        {" "}
                        <Button variant="primary">Detail</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularMovies;
