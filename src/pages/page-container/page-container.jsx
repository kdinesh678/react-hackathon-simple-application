import { Button } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router";
import { logout } from "../../external/external-proxy";
import { getUserDetails } from "../../util";
import { CreateIdeasPage } from "../create-idea-page/create-idea-page";
import { IdeasPage } from "../ideas-page/ideas-page";
import "./page-container.css";

export function PageContainer() {
  const { userId } = getUserDetails();
  const { path, url } = useRouteMatch();
  let history = useHistory();
  const { username } = useMemo(() => getUserDetails(), []);
  const goToCreatePage = useCallback(() => {
    history.push(`${url}/create`);
  }, [history, url]);

  const goBack = useCallback(() => {
    history.push(url);
  }, [history, url]);

  const logoutCallback = useCallback(() => {
    logout();
    history.push("/");
  }, [history]);

  return (
    <div className="page-container">
      <div className="header">
        <span className="left">Hack Ideas</span>
        <span className="right">
          <span className="logout" onClick={logoutCallback}>
            Logout
          </span>
          {username}
        </span>
      </div>
      <div className="content">
        <Switch>
          <Route path={`${path}/create`}>
            {userId ? (
              <CreateIdeasPage goBack={goBack} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path={`${path}/`}>
            {userId ? (
              <IdeasPage goToCreatePage={goToCreatePage}></IdeasPage>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </div>
  );
}
