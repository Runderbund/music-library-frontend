import React, { useState, useEffect } from "react";
import EditMusic from "../EditMusic/EditMusic";
import axios from "axios";
import styles from "./SearchMusic.module.css";

/**
 * A component that handles search, filter and sorting of music data.
 * @param {Array} musicData - The array of music data.
 * @param {function} setMusicData - The setter function for the music data.
 * @returns {React.JSX.Element}
 */
function SearchMusic({ musicData, setMusicData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [songToEdit, setSongToEdit] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "ascending",
  }); // Default sorting is by Song Title

  /**
   * A handler for updating the search term.
   * @param {Event} event - The input change event.
   */
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * A handler for updating the filter category.
   * @param {Event} event - The select change event.
   */
  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  /**
   * A function for updating the sorting configuration.
   * @param {string} key - The key for sorting (Title, Artist, Album, Release Date, Genre)
   */
  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    let sortedData = [...musicData]; // Makes shallow array copy, leaves musicData untouched
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1; // checks if sort direction is ascending or descending
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    let filtered = sortedData.filter((song) => {
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
  }, [searchTerm, filterCategory, sortConfig, musicData]);

  const handleEdit = (song) => {
    setSongToEdit(song);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/music/${id}/`);
      const response = await axios.get("http://localhost:8000/api/music/");
      setMusicData(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <EditMusic
        songToEdit={songToEdit}
        setSongToEdit={setSongToEdit}
        setMusicData={setMusicData}
      />

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
          <option value="All">Search by all categories</option>
          <option value="Title">Search by Title</option>
          <option value="Artist">Search by Artist</option>
          <option value="Album">Search by Album</option>
          <option value="Genre">Search by Genre</option>
        </select>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.musicTable}>
          <thead>
            <tr>
              <th onClick={() => sortData("title")}>Title</th>{" "}
              {/* Sorts/reverses sort on button click. Needs a visual cue to make this obvious. */}
              <th onClick={() => sortData("artist")}>Artist</th>
              <th onClick={() => sortData("album")}>Album</th>
              <th onClick={() => sortData("release_date")}>Release Date</th>
              <th onClick={() => sortData("genre")}>Genre</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Ternary operation - {filteredData.length > 0 ? (map music) : ("No Data Found"}
                Hard to read when spaced out like below. */}
            {filteredData.length > 0 ? (
              filteredData.map((song) => (
                <tr key={song.id}>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.album}</td>
                  <td>{song.release_date}</td>
                  <td>{song.genre}</td>
                  <td>
                    <button onClick={() => handleEdit(song)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(song.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.noData}>
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchMusic;
