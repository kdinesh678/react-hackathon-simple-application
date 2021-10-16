import React from "react";
import "./App.css";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LoginPage } from "./pages/login-page/login-page";
import { PageContainer } from "./pages/page-container/page-container";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/ideas">
            <PageContainer />
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
