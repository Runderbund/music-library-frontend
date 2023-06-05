import React, { useState, useEffect } from "react";
import EditMusic from "../EditMusic/EditMusic";
import axios from "axios";
import styles from "./SearchMusic.module.css";

function SearchMusic({ musicData, setMusicData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [songToEdit, setSongToEdit] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  useEffect(() => {
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
  }, [searchTerm, filterCategory, musicData]);

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
          {/* Could add colgroup to keep widths constant. */}
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
