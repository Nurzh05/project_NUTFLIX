import { Chip } from '@material-ui/core';
import React, { useEffect } from 'react';
import axios from "axios";

const Genres = ({
    genres,
    selectedGenres,
    setSelectedGenres,
    setGenres,
    setPage,
    type
 }) => {

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    }

    const handleRemove = (genre) => {
        setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
        setGenres([...genres, genre]);
        setPage(1);
    }
    
    const api_key = "7134239c71fa2170eb85f46cda23d323";
    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${api_key}&language=en-US`);

        setGenres(data.genres);
        // console.log(data.genres); я создавал это чтобы видеть Эрроры
    }

    useEffect(() => {
    fetchGenres();
    
    }, [])
    

  return (
    <div style = {{padding: "6px 0"}}>
        {selectedGenres.map((genre) => (
            <Chip
                style = {{margin: 2}}
                key = {genre.id}
                label = {genre.name}
                color = "secondary"
                size = "small"
                clickable
                onDelete={() => handleRemove(genre)}
            />
        ))}
        {genres.map((genre) => (
            <Chip
                style = {{margin: 2}}
                key = {genre.id}
                label = {genre.name}
                size = "small"
                clickable
                onClick = {() => handleAdd(genre)}
            />
        ))}
    </div>
  )
}

export default Genres