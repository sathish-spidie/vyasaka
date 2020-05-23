import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "semantic-ui-css/semantic.min.css";
import { composeWithDevTools } from "redux-devtools-extension";
import decode from "jwt-decode";
import setAuthorizationHeader from "./utils/setAuthorizationHeader"
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./rootReducer";
import { userLoggedIn } from "./actions/auth";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.bookWormJWT) {
  const payload = decode(localStorage.bookWormJWT);
  const user = {
    token: localStorage.bookWormJWT,
    email: payload.email,
    confirmed: payload.confirmed,
  };
  setAuthorizationHeader(localStorage.bookWormJWT)
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
