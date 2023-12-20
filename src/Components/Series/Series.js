import React, { useEffect, useState } from 'react';
import axios from "axios";
import SingleContent from '../SingleContent/SingleContent';
import Pagination from '../Pagination/Pagination';
import Genres from '../Genres/Genres';
import useGenres from '../../Hooks/useGenre';

const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const URLGenre = useGenres(selectedGenres);
  const api_key = "7134239c71fa2170eb85f46cda23d323";
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${URLGenre}`
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
        <span className='pageTitle'>TV Series</span>
        <Genres type ='tv' selectedGenres={selectedGenres} genres={genres} setGenres={setGenres} setSelectedGenres={setSelectedGenres} setPage={setPage} />
        <div className="trending">
        {content && 
          content.map((tv) => 
            <SingleContent 
            key = {tv.id}
            id = {tv.id}
            poster = {tv.poster_path}
            title = {tv.title || tv.name} 
            date = {tv.first_air_date || tv.release_date} 
            media_type = "tv"
            vote_average = {tv.vote_average}
            /> )}
          
        </div>
        {numOfPages > 1 && (
          <Pagination setPage = {setPage} numOfPages={numOfPages}/>
        )} 
    </div>
  )
}

export default Series