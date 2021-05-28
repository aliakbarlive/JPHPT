import { makeStyles, Grid, Card, Typography, Button, CardContent, CardActions } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApprovedUser } from '../../redux/Actions';

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

export default function Approve() {
  const classes = useStyles()
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(ApprovedUser(10000000000, history));
  }, [])

  const HandleApproveUser = () => {
    dispatch(ApprovedUser(10000000000, history));
  };

  return (<>
    <Grid container spacing={2} justify="center">
      <Grid item  >
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h6" component="h4">
              You must approve JPHT
           </Typography>

          </CardContent>
          <CardActions>
            <Button className={classes.btnColor} fullWidth variant="contained" color="#45617e"
              onClick={HandleApproveUser}
            >Approve</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </>
  )
}
