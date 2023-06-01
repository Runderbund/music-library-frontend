import styles from "./App.module.css";
import Header from "./Components/Header/Header";
import AddMusic from "./Components/AddMusic/AddMusic";
import SearchMusic from "./Components/SearchMusic/SearchMusic";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <AddMusic />
        <SearchMusic/>
      </main>
    </div>
  );
}

export default App;
