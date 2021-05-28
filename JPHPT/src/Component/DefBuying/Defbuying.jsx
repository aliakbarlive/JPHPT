import React from 'react';
import { makeStyles,AppBar,Tabs,Tab,Box, Breadcrumbs, Link} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { MatchingFun, NewOrder } from '../../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBarStyle:{
    backgroundColor:"transparent",
    color:"#798fa6",
    
  },
  defStyle:{
    backgroundColor:"#4a87d9",
    padding: "6px 20px",
    borderRadius: "999px",
    textAlign: "center"

  },
  defPriceColor:{
    fontSize: "1rem",
    color: "rgb(255, 117, 85)",
    fontWeight: "bold",
  },

 
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 900,
    backgroundColor:"#242938",
    color:"white",
    marginTop:"3rem"
  },
 
 
  defItem:{
    margin:"0 ",
    padding: "15px 30px",
    cursor: "pointer",
    borderRadius:"5px 5px 0px 0px",

  },
  defBody:{
    backgroundColor:"#2a3246",
    margin:"-1em",
    padding: "1em .5em",
},
   
    defInput:{
    minWidth:"200px",
    background: "0% 0% no-repeat padding-box padding-box rgb(43, 55, 75)",
    border: "1px solid rgb(69, 97, 126)",
    borderRadius: "5px",
    color: "rgb(255, 255, 255)",
    padding: "10px 35px 10px 15px",
    '&:focus':{
      outline:"none"
    }
  },
  defPrice:{
    margin:"0 .5em",
    display:"flex",
    alignItems:"center",
    borderBottom: "1px solid rgb(58, 78, 110)",
    padding: "15px 0px",
    flexDirection:"row",
    [theme.breakpoints.down("md")]:{
      flexDirection:"column",
      fontSize:"16px"
    }
      },
      closeBtn:{
        padding: "11px 35px",
        color: "rgb(255, 255, 255)",
        borderRadius: "5px",
        border: "0px",
        marginTop:"1em"
      } ,

  goBack:{
    position: "relative",
    bottom: "2em",
    right: "1em",
    margin: "1em 1em",
    cursor:"pointer"
  }

}));
 
export default function DefBuying() {
  
  const dispatch=useDispatch()
  const classes = useStyles();
  const history = useHistory();
  const { pathname } =useLocation();
  const transId = parseInt(pathname.replace("/buy-def/", ""));
  
  const Transactions=useSelector((state)=>state.UserReducers.sellingOrders)

  const { buyPrice } = useSelector((state) => state.UserReducers);
  
  let transactionData = Transactions && Transactions.find((uid) => uid.id === transId);
  const {amount,maxAmount,minAmount,id}=transactionData
  
  console.log("amount", amount);
  
  const [totalUsdt, setTotalUsdt] = useState(0);
  
  const [bAmount, setBAmount] = useState(0);
 
  let totalBuyPrice = buyPrice / 100;

  // useEffect(()=>{
  //   let total = totalBuyPrice * bAmount ;
  //   setTotalUsdt(total.toFixed(1))
  // },[bAmount])

   useEffect(()=>{
    if(amount){
      setBAmount(amount)
      let total = totalBuyPrice * amount ;
      setTotalUsdt(total.toFixed(1))
    } 
   },[amount,buyPrice])
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* breadcrumbs */}
        <Grid>
          <Box className={classes.goBack}>
            <Breadcrumbs style={{ color: "#b0beea" }}>
              <Link onClick={() => history.goBack()}>Homepage</Link>
              <Link to="/Order/0" color="#979fb7">
                Matching order
              </Link>
            </Breadcrumbs>
          </Box>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item className={classes.defBody}>
                <Grid>
                  <Typography
                    variant="body2"
                    style={{ margin: "1em", color: "#798fa6" }}
                  >
                    Buying Infomation
                  </Typography>
                </Grid>
                <Grid className={classes.defPrice}>
                  <Typography style={{ flexBasis: "30%" }}>
                  JPHPT price:
                  </Typography>
                  <Typography
                    className={classes.defPriceColor}
                    style={{ flex: "1 1 0%" }}
                  >
                    1 JPHPT = {totalBuyPrice ?totalBuyPrice : 0} USDT
                  </Typography>
                </Grid>

                <Grid className={classes.defPrice}>
                  <Typography style={{ flexBasis: "30%" }}>Limits:</Typography>
                  <Typography className={classes.defStyle}>
                    {maxAmount ? maxAmount : "0"} JPHPT
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "1em",
                      color: "white",
                      padding: "0 1em",
                    }}
                  >
                    -
                  </Typography>
                  <Typography
                    className={classes.defStyle}
                    style={{ flexBasis: "10%" }}
                  >
                    {minAmount ? minAmount : "0"} JPHPT
                  </Typography>
                </Grid>

                <Grid className={classes.defPrice}>
                  <Typography style={{ flexBasis: "30%" }}>Amount:</Typography>
                  <Typography style={{ flex: "1 1 0%" }}>
                    <input
                      type="number"
                      className={classes.defInput}
                      value={bAmount ? bAmount : "0"}
                      onChange={(e) =>
                        setBAmount(e.target.value.replace(/^0+/, ""))
                      }
                    />
                  </Typography>
                </Grid>

                <Grid className={classes.defPrice}>
                  <Typography style={{ flexBasis: "30%" }}>
                  Total USDT:
                  </Typography>
                  <Typography style={{ flex: "1 1 0%" }}>
                    <input
                      type="text"
                      value={totalUsdt ? totalUsdt : 0}
                      className={classes.defInput}
                    />
                  </Typography>
                </Grid>
                <Grid>
                  <Button
                    variant="contained"
                    className={classes.closeBtn}
                    style={{
                      backgroundColor: "#1d75eb",
                      color: "white",
                      margin: "1em 1em",
                    }}
                    onClick={() => dispatch(MatchingFun(id, bAmount))}
                  >
                    Buy
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
