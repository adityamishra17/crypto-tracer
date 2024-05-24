import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage.js';
import { makeStyles } from 'tss-react/mui';
import './Pages/MyStyle.css';
import Myalert from "./components/Myalert";


function App() {
  const useStyles = makeStyles()(() => {
    return {
      App: {
        color: "white",
        minHeight: "100vh"
      },
    };
  });

  const { classes } = useStyles();

  return (
    <div className='gradient'>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
      <Myalert />
    </div>
  );
}

export default App;