import React, { useEffect } from 'react';
import {useState} from "react";
import axios from "axios";
import SingleContent from '../SingleContent/SingleContent';
import './Trending.css';
import Pagination from '../Pagination/Pagination';

const Trending = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const api_key = "7134239c71fa2170eb85f46cda23d323";
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`
    );

    // console.log(data.results); это тоже чтобы наблюдать Эрроры

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page])
  

  return (
    <div>
        <span className='pageTitle'>Trending</span><hr></hr>
        <thead>Share with your friends! The best films are only in NUTFLIX</thead>
        <hr></hr>
        <div className="trending">
        {content && 
          content.map((trending) => 
            <SingleContent 
            key = {trending.id}
            id = {trending.id}
            poster = {trending.poster_path}
            title = {trending.title || trending.name}
            date = {trending.first_air_date || trending.release_date}
            media_type = {trending.media_type}
            vote_average = {trending.vote_average.toFixed(2)}
            /> )}
        </div> 
        <Pagination setPage = {setPage}/>
    </div>
  )
}

export default Trending