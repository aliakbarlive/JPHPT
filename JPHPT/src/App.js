import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MainApp from './MainApp';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFA141",
    },
    secondary: {
      main: "#FF5805",
    },
  },
});

 
function App() {
  // const [tronWeb, setTronWeb] =  useState();
  // const dispatch = useDispatch();

  // useEffect(() => {

  //   const tronLoader = setInterval(() => {
  //     if (window.tronWeb && window.tronWeb.ready) {
  //       setTronWeb(window.tronWeb);
  //       clearInterval(tronLoader);
  //     }
  //   }, 500);
  // }, []);

  // useEffect(() => {
  //   if (tronWeb) {
  //     dispatch(UserDataAction(tronWeb.defaultAddress.base58, tronWeb));
  //   }
  // }, [tronWeb]);



  return (
    <>
  <ToastContainer />
  <Provider store={store}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
              <MainApp />
      </BrowserRouter>
      </ThemeProvider>

  </Provider>
    </>
  );
}


export default App;