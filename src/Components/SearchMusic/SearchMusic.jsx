import React, { useState } from "react";
import EditMusic from '../EditMusic/EditMusic';
import axios from "axios";
import styles from "./SearchMusic.module.css";

function SearchMusic({ musicData, setMusicData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [songToEdit, setSongToEdit] = useState(null); // New state variable


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

  const handleEdit = (song) => {
    setSongToEdit(song);
  };

  const handleDelete = async (id) => {
    // Add confirm later
      try {
        // Delete the song and update the song list
        await axios.delete(`http://localhost:8000/api/music/${id}/`);
        const response = await axios.get("http://localhost:8000/api/music/");
        setMusicData(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
  };

  return (
    <div className={styles.formContainer}>
      <EditMusic songToEdit={songToEdit} setSongToEdit={setSongToEdit} setMusicData={setMusicData} /> {/* Modal popup, not actually rendered at top */}
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
  
      <div className="music-container">
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
                  <td><button onClick={() => handleEdit(song)}>Edit</button></td>
                  <td><button onClick={() => handleDelete(song.id)}>Delete</button></td>
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
    </div>
  );
  
}

export default SearchMusic;
