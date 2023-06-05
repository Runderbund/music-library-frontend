import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EditMusic.module.css';

function EditMusic({ songToEdit, setSongToEdit, setMusicData }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");

  // Fills the modal form with the song data whenever songToEdit is updated
  useEffect(() => {
    if(songToEdit) {
      setTitle(songToEdit.title);
      setArtist(songToEdit.artist);
      setAlbum(songToEdit.album);
      setReleaseDate(songToEdit.release_date);
      setGenre(songToEdit.genre);
    }
  }, [songToEdit]);

  const handleInputChange = (event, setStateFunc) => {
    setStateFunc(event.target.value);
  };

  const updateMusic = async () => {
    if(songToEdit) {
      try {
        await axios.put(`http://localhost:8000/api/music/update/${songToEdit.id}`, {
          title: title,
          artist: artist,
          album: album,
          release_date: releaseDate,
          genre: genre,
        });
        // Fetch the data again after a song is updated
        const response = await axios.get("http://localhost:8000/api/music/");
        setMusicData(response.data);
        setSongToEdit(null); // Close the modal
      } catch (error) {
        console.error("There was an error!", error);
      }
    }
  };

  // Only render the modal if there's a song to edit
  if(songToEdit) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={() => setSongToEdit(null)}>&times;</span>
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
          <button onClick={() => setSongToEdit(null)}>Cancel</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default EditMusic;
