import React, { useState } from "react";
import axios from "axios";
import styles from "./AddMusic.module.css";

/**
 * A component that allows the user to add new music.
 * @param {function} setMusicData - The setter function for the music data.
 * @returns {React.JSX.Element}
 */
function AddMusic({ setMusicData }) {
  // Mostly passed these from App.JS rather than setting them in each component last time.
  // Added a lot of needless passing of props. Trying differently here.
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");

  /**
   * A handler for input changes.
   * @param {Event} event - The input change event.
   * @param {function} setStateFunc - The setter function for the input state (Title, Artist, etc.).
   */
  const handleInputChange = (event, setStateFunc) => {
    setStateFunc(event.target.value);
  };

  /**
   * A function for adding new music.
   */
  const addMusic = async () => {
    try {
      await axios.post("http://localhost:8000/api/music/create/", {
        title: title,
        artist: artist,
        album: album,
        release_date: releaseDate,
        genre: genre,
      });
      // Fetches data again after a song is added. Updates music table.
      const response = await axios.get("http://localhost:8000/api/music/");
      setMusicData(response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <label htmlFor="titleInput">Title:</label>
      <input
        id="titleInput"
        type="text"
        value={title}
        onChange={(event) => handleInputChange(event, setTitle)}
      />
      <br />

      <label htmlFor="artistInput">Artist:</label>
      <input
        id="artistInput"
        type="text"
        value={artist}
        onChange={(event) => handleInputChange(event, setArtist)}
      />
      <br />

      <label htmlFor="albumInput">Album:</label>
      <input
        id="albumInput"
        type="text"
        value={album}
        onChange={(event) => handleInputChange(event, setAlbum)}
      />
      <br />

      <label htmlFor="releaseDateInput">Release Date:</label>
      <input
        id="releaseDateInput"
        type="date"
        value={releaseDate}
        onChange={(event) => handleInputChange(event, setReleaseDate)}
      />
      <br />

      <label htmlFor="genreInput">Genre:</label>
      <input
        id="genreInput"
        type="text"
        value={genre}
        onChange={(event) => handleInputChange(event, setGenre)}
      />
      <br />

      <button className={styles.submitButton} onClick={addMusic}>
        Add Music
      </button>
    </div>
  );
}

export default AddMusic;
