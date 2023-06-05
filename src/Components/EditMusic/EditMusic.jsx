import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EditMusic.module.css";

/**
 * A component that allows the user to edit existing music.
 * @param {Object} songToEdit - The song to be edited.
 * @param {function} setSongToEdit - The setter function for the song to edit.
 * @param {function} setMusicData - The setter function for the music data.
 * @returns {JSX.Element|null}
 */
function EditMusic({ songToEdit, setSongToEdit, setMusicData }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");

  /**
   * Fills the popup modal form with the song data whenever songToEdit is updated.
   */
  useEffect(() => {
    if (songToEdit) {
      setTitle(songToEdit.title);
      setArtist(songToEdit.artist);
      setAlbum(songToEdit.album);
      setReleaseDate(songToEdit.release_date);
      setGenre(songToEdit.genre);
    }
  }, [songToEdit]);

  /**
   * A handler for input changes.
   * @param {Event} event - The input change event.
   * @param {function} setStateFunc - The setter function for the input state.
   */
  const handleInputChange = (event, setStateFunc) => {
    setStateFunc(event.target.value);
  };

  /**
   * A function for updating the music data.
   */
  const updateMusic = async () => {
    if (songToEdit) {
      try {
        console.log(songToEdit);
        await axios.put(`http://localhost:8000/api/music/${songToEdit.id}/`, {
          title: title,
          artist: artist,
          album: album,
          release_date: releaseDate,
          genre: genre,
        });
        // Fetch the data again after a song is updated
        const response = await axios.get("http://localhost:8000/api/music/");
        setMusicData(response.data);
        setSongToEdit(null);
      } catch (error) {
        console.error("There was an error!", error);
      }
    }
  };

  // Only makes the modal popup if there's a song to edit
  if (songToEdit) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span
            className={styles.close}
            onClick={() => setSongToEdit(null)}
          ></span>
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
          <button onClick={updateMusic}>Update Music</button>
          <br />
          <button onClick={() => setSongToEdit(null)}>Cancel</button>{" "}
          {/* Closes the modal by making if(songToEdit) == false */}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default EditMusic;
