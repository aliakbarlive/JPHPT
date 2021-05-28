import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router,Route , Switch} from "react-router-dom";
import Defbuying from "./Component/DefBuying/Defbuying";
import GridDef from "./Component/GridDef";
import Header from "./Component/Header";
import { UserDataAction } from "./redux/Actions/index"
import Approve from './Component/Auth/Approve.jsx';
import Allowed from "./Component/Auth/Allowed";
import TronHelper from './utils/TronHelper'
export default function MainApp() {
  
//  const {sellingOrders}= useSelector((state)=>state.UserReducers)

  const [tronWeb, setTronWeb] =  useState();
  const dispatch = useDispatch();

  useEffect(() => {

    const tronLoader = setInterval(() => {
      if (window.tronWeb && window.tronWeb.ready) {
        setTronWeb(window.tronWeb);
        clearInterval(tronLoader);
      }
    }, 500);
  }, []);

  useEffect(() => {
    if (tronWeb) {
      dispatch(UserDataAction(tronWeb.defaultAddress.base58, tronWeb));
    }
  }, [tronWeb]);

  return (
    <>
      <Switch>
        <Route exact path="/"  >

          <Allowed tronWeb={tronWeb}/>
        </Route>
        <Route exact path="/allow" component={Approve} />
        <Route exact path="/home" component={Header}/>
        <Route  path="/Order/:index" component={GridDef} />
        <Route exact path="/buy-def/:id" component={Defbuying}/>
      </Switch>

    </>
  );
}
