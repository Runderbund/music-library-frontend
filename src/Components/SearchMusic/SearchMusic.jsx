import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SearchMusic.module.css";

function SearchMusic() {
  const [searchTerm, setSearchTerm] = useState("");
  const [musicData, setMusicData] = useState([]);

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

  return (
    <div className={styles.formContainer}>
      <input
        id="searchInput"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button id="searchButton">Search</button>

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
              <td colSpan="7">No data yet</td> {/* Change after making buttons */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SearchMusic;
