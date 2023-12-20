import { Button, Tab, Tabs, TextField } from '@material-ui/core'
import { React, useState, useEffect } from 'react'
import axios from "axios";
import SingleContent from '../SingleContent/SingleContent';
import Pagination from '../Pagination/Pagination';
import SearchIcon from '@material-ui/icons/Search'

const Search = () => {

  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const api_key = "7134239c71fa2170eb85f46cda23d323";
  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${api_key}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);

  setContent(data.results);
  setNumOfPages(data.total_pages);
  // console.log(data.results); чтобы отслеживать ошибки

  };

  useEffect(() => {
    window.scroll(0,0);
    fetchSearch();
  }, [type, page, searchText]);
  
  

  return (
    <div>
      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          style={{ flex: 1 }}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchText(e.target.value)} />

        <Button variant="contained" style={{ marginLeft: 10 }} onClick={fetchSearch} >
          <SearchIcon />
        </Button>
      </div>
      <Tabs value = {type} indicatorColor = "primary" textColor = "primary" style = {{paddingBottom: 8}}
       onChange = {(event,newValue) => {
         setType(newValue);
          setPage(1)}}>
          <Tab style = {{ width: "50%"}} label = "Search Movies"/>
          <Tab style = {{ width: "50%"}} label = "Search TV series"/>
      </Tabs>
      <div className="trending">
        {content && 
          content.map((search) => 
            <SingleContent 
            key = {search.id}
            id = {search.id}
            poster = {search.poster_path}
            title = {search.title || search.name}   
            date = {search.first_air_date || search.release_date}   
            media_type = {type ? "tv" : "movie"}   
            vote_average = {search.vote_average}
            /> )}
            {searchText && !content && 
            (type ? <p> No Series Found</p> : <p>No Movies Found</p>)}  
         
        </div>
        {numOfPages > 1 && (
          <Pagination setPage = {setPage} numOfPages={numOfPages}/>
        )} 

    </div>
  )
}

export default Search