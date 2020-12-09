import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  landing as landingRoutes,
  dashboard as dashboardRoutes,
  page as pageRoutes,
  onboarding as onboardRoutes,
} from "./index";

import DashboardLayout from "../layouts/Dashboard";
import LandingLayout from "../layouts/Landing";
import AuthLayout from "../layouts/Auth";
import Split from "../layouts/Split";
import Page404 from "../pages/auth/Page404";

import ScrollToTop from "../components/ScrollToTop";

import PrivateDashRoute from "../components/PrivateDashRoute.js"
import PrivateLandRoute from "../components/PrivateLandRoute.js"


const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, auth, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              <Component {...props} />
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            <Component {...props} />
          </Layout>
        )}
      />
    )
  );

const PrivateDashchildRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <PrivateDashRoute exact key={index} path={path} component={Component}/>
      ))
    ) : (
      // Route item without children
      <PrivateDashRoute exact key={index} path={path} component={Component}/>
    )
  );

const PrivateLandchildRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <PrivateLandRoute exact key={index} path={path} component={Component}/>
      ))
    ) : (
      // Route item without children
      <PrivateLandRoute exact key={index} path={path} component={Component}/>
    )
  );




  const Routes = () => (
    <Router>
      <ScrollToTop>
        <Switch>
          {PrivateLandchildRoutes(LandingLayout, landingRoutes)}
          {PrivateDashchildRoutes(DashboardLayout, dashboardRoutes)}
          {childRoutes(AuthLayout, pageRoutes)}
          {childRoutes(Split, onboardRoutes)}
          <Route
            render={() => (
              <AuthLayout>
                <Page404 />
              </AuthLayout>
            )}
          />
        </Switch>
      </ScrollToTop>
    </Router>
  );

  export default Routes;
