import React, { useEffect, useState } from 'react';
import axios from "axios";
import SingleContent from '../SingleContent/SingleContent';
import Pagination from '../Pagination/Pagination';
import Genres from '../Genres/Genres';
import useGenres from '../../Hooks/useGenre';


const Movies = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const URLGenre = useGenres(selectedGenres);
  const api_key = "7134239c71fa2170eb85f46cda23d323";
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${URLGenre}`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages); 
  }

  useEffect(() => {
    window.scroll(0,0);
    fetchMovies();
  }, [page,URLGenre])

  return (
    <div>
        <span className='pageTitle'>Movies</span>
        <Genres type ='movie' selectedGenres={selectedGenres} genres={genres} setGenres={setGenres} setSelectedGenres={setSelectedGenres} setPage={setPage} />
        <div className="trending">
        {content && 
          content.map((movie) => 
         
            <SingleContent 
            key = {movie.id}
            id = {movie.id}
            poster = {movie.poster_path}
            title = {movie.title || movie.name}     
            date = {movie.first_air_date || movie.release_date}   
            media_type="movie"
            vote_average = {movie.vote_average}
            /> )}
          
        </div>
        {numOfPages > 1 && (
          <Pagination setPage = {setPage} numOfPages={numOfPages}/>
        )} 
    </div>
  )
}

export default Movies