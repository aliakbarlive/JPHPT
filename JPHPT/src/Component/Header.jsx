import {
  Container,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  Box,
  CardMedia,
  Button
} from "@material-ui/core";
import React from "react";
import BuyDef from "./BuyDef";
import SimpleCard1 from "./Cards";
import GridDef from "./GridDef";


const useStyles = makeStyles((theme) => ({
  headingText: {
    color: "#FFA141",
    padding: "1rem",
    margin: "-1rem 1em",
    [theme.breakpoints.down("md")]: {
      margin: "0",
    },
  },
  container: {
    padding: "2rem 0rem 0rem",
    [theme.breakpoints.down("md")]: {
      padding: "0rem 2rem 0rem 2rem",
    },
  },
  hImage: {
    display: "inline",
    width: "20%",
    marginTop: "-1em",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  btn1: {color:"white"},
  text: {
    fontSize: "2.5rem",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
  },
  textPrice: {
    fontSize: "1.5rem",
    textAlign: "center",
    margin: "1em 0",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  textPrice1: {
    fontSize: "2.1rem",
    textAlign: "center",
    margin: "1em 0",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
  },
  textPrice2: {
    fontSize: "1.2rem",
    textAlign: "center",
    margin: "1em 0",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  Secondtext: {
    fontSize: "3rem",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
  },
  paragraph: {
    color: "white",
    textAlign: "center",
    fontSize: "1rem",
  },
  paragraph1: {
    color: "white",
  },

  boxHeading: {
    width: "30%",
    height: "0",
    color: "white",
    borderBottom: "30px solid #283546",
    borderRight: "40px   solid transparent",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid>
        <img src="/img/7718026.png" className={classes.hImage} />
      </Grid>
    <Grid className={classes.headingText}>
        <Typography className={classes.text}>
        JPHPT DEX OTC Exchange
        </Typography>
        <Typography className={classes.textPrice}>
        Current MARKET Price JPHPT/USDT : $0.10
        </Typography>
        <Typography className={classes.textPrice1}>
        Welcome to JPHPT Decentralized OTC Exchange
        </Typography>
        {/* <Typography className={classes.textPrice}>
        INTRODUCING A CROWDFUNDING SMART CONTRACT THAT OFFERS PROFITS, EQUITY AND INCOME TO EVERY MEMBER
        </Typography> */}
        <a href="https://payone.pro" target="_blank">
        <Button variant="contained" color="secondary" className={classes.btn1}>
        Access JPHPT Exchange
        </Button>
        </a>

    <Typography className={classes.textPrice2}>
    Buy/Sell Your JPHPT Token in this platform
    </Typography>
    {/* <img  src="/img/7718029.png" style={{width:"80%"}}/> */}
    
    </Grid>
    <Grid>
        <Typography className={classes.paragraph1}>
            JPHPT OTC is the most reliable and profitable OTC cryptocurrency
            exhange. Our exnhange has an extensive trading system, So you can now
            buy and sell JPHPT at the best prices in seconds!
        </Typography>
        <br />
    </Grid>
    <Grid>
        <Box className={classes.boxHeading}>
            <Typography style={{ color: "white" , padding: " .1rem 0rem 0rem .3rem" }}>
                JPHPT/USDT
            </Typography>
        </Box>
    </Grid>

    <Grid style={{ marginTop: ".5rem" }}>
        <SimpleCard1 />
    </Grid>
    <Grid className={classes.headingText}>
        <Typography className={classes.Secondtext}>
            Create your Crypto portfolio
        </Typography>
    </Grid>

    <Grid>
        <Typography className={classes.paragraph}>
            JPHPT OTC has a variety of buying and selling options for you to start
            trading
        </Typography>
        <br />
    </Grid>

      <Grid>
          <BuyDef />
      </Grid>
      
</Container>
  );
}
