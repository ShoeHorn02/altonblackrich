import React from "react";
import Landing from "../landing/Landing";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from "../../components/Loader"

class LandingMain extends React.Component {


  render() {
    if (this.props.isLoading) {
      return <Loader />;
    }
    else if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Landing />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(LandingMain);
