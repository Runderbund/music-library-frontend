import React, { useState } from "react";
import styles from "./SearchMusic.module.css";

function SearchMusic() {
  const [searchTerm, setSearchTerm] = useState("");

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
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Release Date</th>
            <th>Genre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Music data here */}
          <tr>
            <td colSpan="6">No data yet</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SearchMusic;
