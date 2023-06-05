import React, { useState } from "react";
import axios from "axios";
import styles from "./SearchMusic.module.css";

function SearchMusic({ musicData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);

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
          {musicData.length > 0 ? (
            musicData.map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.release_date}</td>
                <td>{song.genre}</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SearchMusic;
