import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const SingleMovie = () => {
    const { id } = useParams();
    const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`;

    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState("");

    const getMovies = async (url) => {
        setIsLoading(true);

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            if (data) {
                setIsLoading(false);
                setMovie(data);
            }
        } catch (error) {
            console.log("Something went wrong!");
        }
    };
    useEffect(() => {
        let timerOut = setTimeout(() => {
            getMovies(API_URL);
        }, 600);

        return () => clearTimeout(timerOut);
    }, [API_URL]);

    if (isLoading) {
        return (
            <div className="movie-section">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <section className="movie-section">
            <div className="movie-card">
                <figure>
                    <img src={movie.Poster} alt="" />
                </figure>
                
                <div className="card-content">
                    <p className="title">{movie.Title}</p>
                    <p className="card-text">{movie.Released}</p>
                    <p className="card-text">{movie.Genre}</p>
                    <p className="card-text">{movie.imdbRating}</p>
                    <p className="card-text">{movie.Country}</p>
                    <NavLink to={'/'} className={'back-btn'}>Go Back</NavLink>
                </div>
            </div>
        </section>
    );
};
export default SingleMovie;
