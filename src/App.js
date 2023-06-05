import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMusic from "./Components/AddMusic/AddMusic";
import SearchMusic from "./Components/SearchMusic/SearchMusic";
import styles from "./App.module.css";
import Header from "./Components/Header/Header";

function App() {
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

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <AddMusic setMusicData={setMusicData} />
        <SearchMusic musicData={musicData} />
      </div>
    </div>
  );
}

export default App;
