import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles()(() => {
    return {
        carousel: {
            height: "50%",
            display: "flex",
            alignItems: "center",
        },
        carouselItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white",
        },
    };
});

//for showing commas in numeric value -> just googled how to put commas between digits -> regex pattern
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}



const Carousel = () => {

    //Creating new state for trending coins
    const [trending, setTrending] = useState([]);

    //class for styles
    const { classes } = useStyles();

    //getting current state from CryptoContext.js
    const { currency, symbol } = CryptoState();

    //fetching data from API
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data);
    };

    //state render
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    //Items(coins) to be shown on carousel
    //All items coming from 'Trending State'
    const items = trending.map((coin) => {

        //calculation of profit and loss of coins
        let profit = coin.price_change_percentage_24h >= 0;

        return (
            //link will help in navigating from one page to another
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`} >

                {/* Style for coin */}
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />

                {/* Span for text below coin */}
                <span>
                    {coin?.symbol}
                    &nbsp;

                    {/* Span for profit change */}
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                        
                    </span>
                </span>

                {/* span for price of coin */}
                {/* Here symbol is from CryptoContext state and it is either $ or ₹ */}
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} 
                    {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>

            </Link>
        )
    });

    //User defined => number of coin to be shown on different screens
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    );
}

export default Carousel