import { Container, Paper, Typography } from '@mui/material';
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import Carousel from './Carousel';
import '../../Pages/MyStyle.css'

const useStyles = makeStyles()(() => {
    return {
        bannerContent: {
            height: 400,
            display: "flex",
            flexDirection: "column",
            paddingTop: 20,
            justifyContent: "space-around",
        },
        tagline: {
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        }
    };
});

const Banner = () => {
    const { classes } = useStyles();

    return (
        <div>
            <Container style={{marginTop: 30, marginBottom:20}}>
                <Paper sx={{ backgroundColor: "#230053"}} elevation={24} className={classes.bannerContent} >

                    <div className={classes.tagline}>
                        <Typography
                            variant="h2"
                            style={{
                                fontWeight: "bold",
                                fontSize: 68,
                                marginBottom: 15,
                                fontFamily: "Montserrat",
                                color: "White",
                                opacity: '0.7'
                            }}
                        >
                            Crypto Trail
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            style={{
                                color: "#388E3C",
                                textTransform: "capitalize",
                                fontFamily: "Montserrat",
                                fontWeight: "bold"
                            }}
                        >
                            Your final destination for Cryptocurrency Information
                        </Typography>
                    </div>

                    <Carousel />
                </Paper>
            </Container>
        </div>
    )
}

export default Banner