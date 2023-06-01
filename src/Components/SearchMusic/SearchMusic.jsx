import React, { useState } from "react";
import styles from "./SearchMusic.module.css";

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
      SearchMusic Placeholder
    </div>
  );
}

export default AddMusic;
