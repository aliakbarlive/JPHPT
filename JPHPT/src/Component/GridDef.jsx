import React from 'react';
import { makeStyles, AppBar, Tabs, Tab, Box, Breadcrumbs, Link } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import { NewOrder, SellOrder } from '../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  AppBarStyle: {
    backgroundColor: "transparent",
    color: "#798fa6",
  },
  icon: {
    width: 20,
    height: 25,
    color: "#bdc6e0",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 900,
    backgroundColor: "#242938",
    color: "white",
    marginTop: "3rem",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  createDef: {
    display: "flex",
    flexDirection: "row",
    margin: "0 1em",
  },
  defItem: {
    margin: "0 ",
    padding: "15px 30px",
    cursor: "pointer",
    borderRadius: "5px 5px 0px 0px",
  },
  defBody: {
    backgroundColor: "#2a3246",
    margin: "-1em",
    padding: "1em .5em",
  },

  defInput: {
    minWidth: "200px",
    background: "0% 0% no-repeat padding-box padding-box rgb(43, 55, 75)",
    border: "1px solid rgb(69, 97, 126)",
    borderRadius: "5px",
    color: "rgb(255, 255, 255)",
    padding: "10px 35px 10px 15px",
    "&:focus": {
      outline: "none",
    },
  },
  defPrice: {
    margin: "0 .5em",
    display: "flex",
    borderBottom: "1px solid rgb(58, 78, 110)",
    padding: "15px 0px",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      fontSize: "1em",
      textAlign: "left",
    },
  },

  closeBtn: {
    padding: "11px 35px",

    color: "rgb(255, 255, 255)",
    borderRadius: "5px",
    border: "0px",
  },
  goBack: {
    position: "relative",
    bottom: "2em",
    right: "1em",
    margin: "1em 1em",
    cursor: "pointer",
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function GridDef() {

  const dispatch = useDispatch()
  const params = useParams()
  const { index } = params;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const [amount, setAmount] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [totalUsdt, setTotalUsdt] = useState(0);
  const [selAmount, setSelAmount] = useState(0);
  const [selMinAmount, setSelMinAmount] = useState(0);
  const [selMaxAmount, setSelMaxAmount] = useState(0);

  const { balance, buyPrice, sellPrice, userWalletAddress } = useSelector(
    (state) => state.UserReducers);

  useEffect(() => {
    const total = buyPrice * amount;
    setTotalUsdt(total)
  }, [amount])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  React.useEffect(() => {
    setValue(Number(index))
  }, [index])

  const NewOrderFunction = () => {
    dispatch(NewOrder(amount, minAmount, maxAmount))
  }

  const SELLINORDER = () => {
    dispatch(SellOrder(selMaxAmount, selMinAmount, selAmount))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid>
          <Box className={classes.goBack}>
            <Breadcrumbs style={{ color: "#b0beea" }}>
              <Link onClick={() => history.goBack()}>Homepage</Link>
              <Link to="/Order/0" color="#979fb7">
                Create order
              </Link>
            </Breadcrumbs>
          </Box>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>

              <Grid>
                <AppBar position="static" className={classes.AppBarStyle}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab
                      label=" I want to buy JPHPT"
                      {...a11yProps(0)}
                      className={value == 0 ? "selected1" : ""}
                    />
                    <Tab
                      label="I want to Sell JPHPT"
                      {...a11yProps(0)}
                      className={value == 0 ? "selected1" : ""}
                    />
                  </Tabs>
                </AppBar>
              </Grid>

              {/* Buy JPHPT*/}
              <TabPanel value={value} index={0}>
                <Grid item className={classes.defBody}>
                  <Grid>
                    <Typography
                      variant="body2"
                      style={{ margin: "1em", color: "#798fa6" }}
                    >
                      Buy JPHPT below
                    </Typography>
                  </Grid>
                  <Grid className={classes.defPrice}>
                    <Typography style={{ flexBasis: "30%" }}>
                      JPHPT price:
                    </Typography>
                    <Typography style={{ flex: "1 1 0%" }}>
                      <input
                        type="text"
                        value={buyPrice ? buyPrice : 0}
                        className={classes.defInput}
                      />
                    </Typography>
                    <Typography
                      style={{ flexBasis: "20%", textAlign: "right" }}
                    >
                      JPHPT price in USDT
                    </Typography>
                  </Grid>

                  <Grid className={classes.defPrice}>
                    <Typography style={{ flexBasis: "30%" }}>
                      Amount:
                    </Typography>
                    <Typography style={{ flex: "1 1 0%" }}>
                      <input
                        type="number"
                        value={amount}
                        className={classes.defInput}
                        onChange={(e) =>
                          setAmount(e.target.value.replace(/^0+/, ""))
                        }
                      />
                    </Typography>
                    <Typography
                      style={{ flexBasis: "20%", textAlign: "right" }}
                    >
                      JPHPT to buy
                    </Typography>
                  </Grid>

                  <Grid className={classes.defPrice}>
                    <Typography style={{ flexBasis: "30%" }}>
                      Limits:
                    </Typography>
                    <Typography style={{ flex: "1 1 0%" }}>
                      <input
                        type="number"
                        value={minAmount}
                        className={classes.defInput}
                        onChange={(e) =>
                          setMinAmount(e.target.value.replace(/^0+/, ""))
                        }
                      />
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "1em",
                        color: "white",
                        flexBasis: "5%",
                      }}
                    >
                      -
                    </Typography>
                    <Typography
                      style={{ flexBasis: "20%", textAlign: "right" }}
                    >
                      <input
                        type="number"
                        value={maxAmount}
                        className={classes.defInput}
                        onChange={(e) =>
                          setMaxAmount(e.target.value.replace(/^0+/, ""))
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
                        value={totalUsdt}
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
                        margin: "0 1em",
                      }}
                      onClick={()=>history.push("/")}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      className={classes.closeBtn}
                      style={{ backgroundColor: "#ffae5d", color: "white" }}
                    >
                      Create a buying order
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* sell JPHPT  */}
              <TabPanel value={value} index={1}>
              <Grid item className={classes.defBody}>
                <Typography
                  variant="body2"
                  style={{ margin: "1em", color: "#798fa6" }}
                >
                  Sell JPHPT below
                  </Typography>
                <Grid className={classes.defPrice}>
                  <Typography style={{ flexBasis: "30%" }}>
                    Balance :
                    </Typography>
                  <Typography
                    style={{
                      flex: "1 1 0%",
                      color: "#ffa143",
                      fontWeight: "bold",
                    }}
                  >
                    {balance ? balance : 0.0} JPHPT
                    </Typography>
                </Grid>
                <Grid className={classes.defPrice}>
                  <Typography style={{ flexBasis: "30%" }}>
                    JPHPT price:
                    </Typography>
                  <Typography style={{ flex: "1 1 0%" }}>
                    <input
                      type="text"
                      value={sellPrice ? sellPrice : 0}
                      className={classes.defInput}
                    />
                  </Typography>
                  <Typography
                    style={{ flexBasis: "20%", textAlign: "right" }}
                  >
                    JPHPT price in USDT
                    </Typography>
                </Grid>

                <Grid className={classes.defPrice}>
                  <Typography style={{ flexBasis: "30%" }}>
                    Limits:
                    </Typography>
                  <Typography style={{ flex: "1 1 0%" }}>
                    <input
                      type="number"
                      value={selMaxAmount}
                      onChange={(e) =>
                        setSelMaxAmount(e.target.value.replace(/^0+/, ""))
                      }
                      className={classes.defInput}
                    />
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "1em",
                      color: "white",
                      flexBasis: "5%",
                    }}
                  >
                    -
                    </Typography>
                  <Typography
                    style={{ flexBasis: "20%", textAlign: "right" }}
                  >
                    <input
                      value={selMinAmount}
                      type="number"
                      onChange={(e) =>
                        setSelMinAmount(e.target.value.replace(/^0+/, ""))
                      }
                      className={classes.defInput}
                    />
                  </Typography>
                </Grid>
                <Grid className={classes.defPrice}>
                  <Typography style={{ flexBasis: "30%" }}>
                    Amount:
                    </Typography>
                  <Typography style={{ flex: "1 1 0%" }}>
                    <input
                      type="number"
                      value={selAmount}
                      onChange={(e) =>
                        setSelAmount(e.target.value.replace(/^0+/, ""))
                      }
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
                        margin: "0 1em",
                      }}
                      onClick={()=>history.push('/')}
                    >
                      Close
                    </Button>
                  <Button
                     
                    variant="contained"
                    className={classes.closeBtn}
                    style={{ backgroundColor: "#ffae5d", color: "white" }}
                  >
                    Create a selling order
                    </Button>
                </Grid>
              </Grid>
              </TabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
