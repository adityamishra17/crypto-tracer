import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';


const useStyles = makeStyles()(() => {
  return {
    title: {
      flex: 1,
      color: "#388E3C",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
    
  };
});

const Header = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#388E3C'
      }
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar  color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} className={classes.title} variant='h5'>
              Crypto Trail
            </Typography>

            <Select
              variant='outlined'
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: '#388E3C'
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"} >USD</MenuItem>
              <MenuItem value={"INR"} >INR</MenuItem>
            </Select>

            { user ? <UserSidebar /> : <AuthModal /> }

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header