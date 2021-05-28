import React from 'react';
import { makeStyles, Card, CardActions, Grid, CardContent, Typography, Container, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  
  btnColor: {
    // backgroundColor: "#F68F67",
    // '&:hover': {
    //   backgroundColor: "#ca6d49",
    background: "linear-gradient(78deg,rgb(255, 132, 103) 0%, rgb(255, 174, 93) 100%) 0% 0% no-repeat padding-box padding-box transparent"

  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  price: {
    color: "#FF5805"
  },
  btnSecondColor: {
    // 
    background: "linear-gradient(78deg,rgba(255, 161, 65, 1) 0%, rgb(rgb(255, 88, 5) 100%) 0% 0% no-repeat padding-box padding-box transparent"
  },

  boxStyle: {

    width: "10px",
    height: "0",
    borderBottom: "100px solid red",
    borderRight: "100px solid transparent",

  },
  boxstyle: {
    color: "red"
  }
}));

export default function BuyingCard() {
  const classes = useStyles();
  return (
    // <Container maxWidth="md">
    <>

      <Grid container spacing={2} justify="center">
        <Grid item xs >
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h4">
                <i class="fas fa-handshake" style={{ color: "#FF5805" }}></i>   Buying Price
        </Typography>
              <Typography variant="h5" component="h5" className={classes.price}>
                0.1491 USDT
        </Typography>
            </CardContent>
            {/* <CardActions>
              <Button className={classes.btnColor} fullWidth variant="contained" color="primary">BUY JPHPT</Button>
            </CardActions> */}
          </Card>
        </Grid>

        <Grid item xs >
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h4">
                <i class="fas fa-handshake" style={{ color: "#FF5805" }}></i>    Selling Price
        </Typography>
              <Typography variant="h5" component="h5" className={classes.price}>
                0.15 USDT
        </Typography>
            </CardContent>
            {/* <CardActions>
              <Button className={classes.btnSecondColor} fullWidth variant="contained" color="primary">BUY JPHPT</Button>
            </CardActions> */}
          </Card>
        </Grid>

      </Grid>
    </>
    // </Container>
  );
}
