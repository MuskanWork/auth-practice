import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import PrivateRoute from "./PrivateRoute";
import PageDenied from "./Pages/PageDenied";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new ApolloClient({
  uri: "http://localhost:8080/api",
  cache: new InMemoryCache(),
});

const AuthService = {
  isAuthenticated: () => {
    return localStorage.getItem('authToken') !== null;
  },
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/register" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <PrivateRoute path="/" element={<Home />} /> */}
          <Route path="/" element={AuthService.isAuthenticated() ? <Home/>:  <PageDenied />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
