import React, { useState } from "react";
import styles from "./AddMusic.module.css";

function AddMusic() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");

  const handleInputChange = (event, setStateFunc) => {
    setStateFunc(event.target.value);
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
    </div>
  );
}

export default AddMusic;
