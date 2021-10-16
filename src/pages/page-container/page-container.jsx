import React, { useMemo } from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { getUserDetails } from "../../util";
import { CreateIdeasPage } from "../create-idea-page/create-idea-page";
import { IdeasPage } from "../ideas-page/ideas-page";
import "./page-container.css";

export function PageContainer() {
  const { path } = useRouteMatch();
  const { username } = useMemo(() => getUserDetails(), []);

  return (
    <div className="page-container">
      <div className="header">
        <span class="left">Hack Ideas</span>
        <span class="right">{username}</span>
      </div>
      <div class="content">
        <Switch>
          <Route path={`${path}/`}>
            <IdeasPage></IdeasPage>
          </Route>
          <Route path={`${path}/create`}>
            <CreateIdeasPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
