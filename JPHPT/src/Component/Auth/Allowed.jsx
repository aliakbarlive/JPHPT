import { makeStyles, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import React from 'react'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { environment } from '../../environment';

import { AllowedFun, UserDataAction } from '../../redux/Actions';
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: "50%",
    backgroundColor: "#262e3f",
    color: "white"
  },

  btnColor: {
    background: "#45617e",
    '&:hover': {
      backgroundColor: "#4d7fb2"
    },
    color: "white"
  },

}));
export default function Allowed({ tronWeb }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { userWalletAddress } = useSelector((state) => state.UserReducers)
  const HandleAllowed = () => {
    history.push("/home");
    // dispatch(AllowedFun(userWalletAddress,history));

  };

  React.useEffect(() => {
    if (tronWeb) {
      dispatch(UserDataAction(tronWeb.defaultAddress.base58, tronWeb));
    }
  }, [tronWeb]);

  React.useEffect(() => {

    if (tronWeb) {
      tronWeb
        .contract()
        .at(environment.tokenAddress2)
        .then(async (contract) => {

          if (contract && userWalletAddress) {
            await contract
              .allowance(userWalletAddress, environment.contractAddress)
              .call()
              .then((val) => {

                console.log(val.remaining.toNumber(), "THIS IS THE VALUE OF ")

                  history.push("/home");

                  // toast.error("not approved your token");

              })
          }
        })
    }

  }, [tronWeb, userWalletAddress])

  return (<>
    <Grid container spacing={2} justify="center">
      <Grid item  >
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h6" component="h4">
              You must approve USDT
        </Typography>

          </CardContent>
          <CardActions>
            <Button className={classes.btnColor} fullWidth variant="contained" color="#45617e"
              onClick={HandleAllowed}
            >Verify</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </>
  )
}
