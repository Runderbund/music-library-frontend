import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SearchMusic.module.css";

function SearchMusic() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [musicData, setMusicData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/music/");
        setMusicData(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleSearch = () => {
    let filtered = musicData.filter((song) => {
      let searchString = "";
      switch (filterCategory) {
        case "All":
          searchString =
            song.title.toLowerCase() +
            song.artist.toLowerCase() +
            song.album.toLowerCase() +
            song.genre.toLowerCase();
          break;
        case "Title":
          searchString = song.title.toLowerCase();
          break;
        case "Artist":
          searchString = song.artist.toLowerCase();
          break;
        case "Album":
          searchString = song.album.toLowerCase();
          break;
        case "Genre":
          searchString = song.genre.toLowerCase();
          break;
        
      }
      return searchString.includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.searchContainer}>
        <input
          id="searchInput"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />

        <select
          id="filterCategory"
          value={filterCategory}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Title">Title</option>
          <option value="Artist">Artist</option>
          <option value="Album">Album</option>
          <option value="Genre">Genre</option>
        </select>

        <button id="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>

      <table className={styles.musicTable}>
        <thead>
          <tr>
            {/* Replace these with sorting buttons */}
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Release Date</th>
            <th>Genre</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Ternary operation - {musicData.length > 0 ? (map music) : ("No data yet"}
        Hard to read when spaced out like below. */}
          {musicData.length > 0 ? (
            musicData.map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.release_date}</td>
                <td>{song.genre}</td>
                <td>Edit</td> {/* Change after making buttons */}
                <td>Delete</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data yet</td>{" "}
              {/* Change after making buttons */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SearchMusic;
