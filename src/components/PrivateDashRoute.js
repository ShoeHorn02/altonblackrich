import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardLayout from "../layouts/Dashboard";
import LandingList from "../pages/landing/LandingList"
import Loader from "./Loader";
import { Container } from "reactstrap";


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (auth.isLoading) {
        return <Container> <Loader />
                </Container>
      }
      else if (auth.isAuthenticated) {
        return <DashboardLayout><Component {...props} /></DashboardLayout>;
      }
      else {
        return <LandingList />
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
