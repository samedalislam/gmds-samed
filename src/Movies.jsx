import { NavLink } from "react-router-dom";
import { useGlobalContext } from "./context";

const Movies = () => {
    const { movie, isLoading } = useGlobalContext();

    if(isLoading){
      return (
        <div>
          <div className="loading">Loading...</div>
        </div>
      )
    }
    return (
        <>
            <section className="moviePage">
                <div className="container grid grid-4-col">
                    {movie.map((curMovie) => {
                        const { Poster, Title, imdbID } = curMovie;
                        return (
                            <NavLink to={`movie/${imdbID}`} key={imdbID}>
                                <div className="card">
                                    <div className="cardInfo">
                                        <h2>
                                            {Title.slice(0, 15)}
                                            {Title.length > 15 ? "..." : ""}
                                        </h2>
                                        <img src={Poster} alt="" />
                                    </div>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>
            </section>
        </>
    );
};
export default Movies;
