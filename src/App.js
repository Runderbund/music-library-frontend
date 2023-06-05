import React, { useState, useEffect } from "react";
import axios from "axios";
import AddMusic from "./Components/AddMusic/AddMusic";
import SearchMusic from "./Components/SearchMusic/SearchMusic";
import styles from "./App.module.css";
import Header from "./Components/Header/Header";

/**
 * Main application component. Fetches data from the backend.
 * @returns {React.JSX.Element}
 */
function App() {
  const [musicData, setMusicData] = useState([]);

  /**
   * Fetches data from backend and initializes it as musicData.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/music/");
        setMusicData(response.data);
      } catch (error) {
        // Error catching not asked for, but always good.
        console.error("There was an error!", error); // Like console.log, but with stack trace.
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <AddMusic setMusicData={setMusicData} />
        <SearchMusic musicData={musicData} setMusicData={setMusicData} />
      </div>
    </div>
  );
}

export default App;

// TODO: SearchMusic - Add filter by release date range. Two date pickers.
// TODO: SearchMusic - Set static sizes for table columns to avoid resizing.
// TODO: SearchMusic - Add arrows to table headers to indicate current sorting.

// TODO: AddMusic - Align input fields vertically
