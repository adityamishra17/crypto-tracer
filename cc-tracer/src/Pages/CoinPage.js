import { Button, LinearProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import CoinInfo from '../components/CoinInfo';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from "../components/CoinsTable";
import HTMLReactParser from 'html-react-parser';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';



const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  }

  useEffect(() => {
    fetchCoins();
  }, []);

  const useStyles = makeStyles()((theme) => {

    return {
      container: {
        display: "flex",
        [theme.breakpoints.down("md")]: { //responsive styles
          flexDirection: "column",
          alignItems: "center",
        },
      },
      sidebar: {
        width: "35%",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        margin: 25


      },
      headingCoin: {
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: "Montserrat",
        textAlign: "center",


      },

      heading: {
        marginBottom: 20,
        fontFamily: "Montserrat",
        textAlign: "center",


      },
      description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
        color: 'white'
      },
      marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",

        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        
        [theme.breakpoints.down("md")]: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
        color: 'white'
      },
    }

  });

  /* variable to check coin is added to watchlist or not */
  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid );
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const { classes } = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "#388E3C" }} />;

  return (

    <div className={classes.container}>

      {/* sidebar */}

      <div className={classes.sidebar}>
        <Paper elevation={24} className='gradient'>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20, marginTop: 20, marginLeft: 130 }}
          />
          <Typography variant="h3" className={classes.headingCoin} style={{ color: '#F5F3F8', opacity: '0.8' }}>
            {coin?.name}
          </Typography>

          <Typography variant="subtitle1" className={classes.description} >
            {HTMLReactParser(coin?.description.en.split(". ")[0])}.
          </Typography>

          <div className={classes.marketData}>

            {/* For Rank */}
            <span style={{ display: 'flex' }}>
              <Typography variant='h5' className={classes.heading} style={{ color: '#388E3C', fontWeight: 'bold' }}>
                Rank :
              </Typography>

              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat"
                }}
              >
                {numberWithCommas(coin?.market_cap_rank)}
              </Typography>
            </span>

            {/* Current Price */}
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading} style={{ color: '#388E3C', fontWeight: 'bold' }}>
                Current Price:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
              </Typography>
            </span>

            {/* Market Cap */}
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading} style={{ color: '#388E3C', fontWeight: 'bold' }}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography
                variant="h5"
                style={{
                  fontFamily: "Montserrat",
                }}
              >
                {symbol}{" "}
                {
                  numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6))
                }
                M
              </Typography>
            </span>
            
            {/* button will be visible if user is logged in */}
            {user && (
              <Button
                variant="outlined"
                style={{
                  width: "100%",
                  height: 40,
                  color: inWatchlist ? "black" : "white",
                  backgroundColor: inWatchlist ? "#EEBC1D" : "#388E3C",
                }}
                onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
              >
              
                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
            )}

          </div>
        </Paper>
      </div>


      {/* Chart */}

      <CoinInfo coin={coin} />


    </div>

  )
}

export default CoinPage