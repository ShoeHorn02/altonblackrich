import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LandingLayout from "../layouts/Landing";
import AuthLayout from "../layouts/Auth";
import SignIn from "../pages/auth/SignIn";


const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!auth.isAuthenticated) {
        return <LandingLayout><Component {...props} /></LandingLayout>;
      }
      else {
        return <AuthLayout> <SignIn/> </AuthLayout>
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
