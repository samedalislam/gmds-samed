import { createContext, useContext, useEffect, useState } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = createContext();

// Provider
const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({show: false, msg: ''});
    const [query, setQuery] = useState('titanic');

    const getMovies = async (url) => {
        setIsLoading(true)
        try {
            const res = await fetch(url);
            const data = await res.json();

            if (data.Response === "True") {
                setIsLoading(false);
                setMovie(data.Search);
                setIsError({
                    show: false,
                    msg: ''
                })
            } else {
                setIsError({show: true, msg: data.Error});
            }

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&s=${query}`);
        }, 600)

        return () => clearTimeout(timerOut)
    }, [query]);
    return (
        <AppContext.Provider value={{ isLoading, movie, isError, query, setQuery }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
