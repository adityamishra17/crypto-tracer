import { Container, createTheme, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import '../Pages/MyStyle.css'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const CoinsTable = () => {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const history = useNavigate();

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState(); //destructuring currency

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FF5722'
      }
    },
  });

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    ))
  }

  const useStyles = makeStyles()(() => {
    return {
      row: {
        backgroundColor: "#230053",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#1B0047",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "#388E3C",
        },
      },
    };
  });

  const { classes } = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>

        {/* heading */}
        <Paper sx={{ backgroundColor: "#f5efff" }} elevation={24}>
          <Typography
            variant="h5"
            style={{ margin: 30, fontFamily: "Montserrat", padding: 10, color: "#230053", fontWeight: "bold" }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
        </Paper>

        {/* SearchBox */}
        <TextField
          label="Search for a CryptoCurrency.."
          variant="outlined" style={{ marginBottom: 20, width: "100%", }}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
        />

        <Paper elevation={24}>
          <TableContainer>
            {
              loading ? (
                <LinearProgress style={{ backgroundColor: "#388E3C" }} />
              ) : (
                <Table>
                  <TableHead style={{ backgroundColor: "#388E3C" }}>
                    <TableRow>
                      {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {handleSearch()
                      .slice((page - 1) * 10, (page - 1) * 10 + 10)
                      .map((row) => {
                        const profit = row.price_change_percentage_24h > 0;

                        return (
                          <TableRow
                            onClick={() => history(`/coins/${row.id}`)}
                            className={classes.row}
                            key={row.name}
                          >

                            {/* First Column content i.e. coin image, symbol and name */}
                            <TableCell
                              component="th"
                              scope="row"
                              style={{
                                display: "flex",
                                gap: 15,
                              }}
                            >
                              <img
                                src={row?.image}
                                alt={row.name}
                                height="50"
                                style={{ marginBottom: 10 }}
                              />

                              <div
                                style={{ display: "flex", flexDirection: "column" }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 22,
                                  }}
                                >
                                  {row.symbol}
                                </span>
                                <span style={{ color: "darkgrey" }}>
                                  {row.name}
                                </span>
                              </div>

                            </TableCell>

                            {/* 2nd Column for price */}
                            <TableCell align="right">
                              {symbol}{" "}
                              {numberWithCommas(row.current_price.toFixed(2))}
                            </TableCell>

                            {/* 3rd Column for 24hrs price change */}
                            <TableCell
                              align="right"
                              style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                              }}
                            >
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </TableCell>

                            {/* 4th Column for 24hrs market cap */}
                            <TableCell align="right">
                              {symbol}{" "}
                              {numberWithCommas(
                                row.market_cap.toString().slice(0, -6) //slice to show upto 6 digits
                              )}
                              M
                            </TableCell>


                          </TableRow>
                        )
                      })}
                  </TableBody>

                </Table>
              )
            }
          </TableContainer>
        </Paper>

        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}

          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />


      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable