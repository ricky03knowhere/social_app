import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import themeObject from "./utils/theme";
import AuthRoute from "./utils/AuthRoute";

import createTheme from "@material-ui/core/styles/createTheme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

const theme = createTheme(themeObject);

let authenticated;
let token = localStorage.FB_token;

if (token) {
  const decodedToken = jwt_decode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider className="App" store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/" exact component={Home} />
                <AuthRoute
                  path="/login"
                  component={Login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  path="/signup"
                  component={Signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
