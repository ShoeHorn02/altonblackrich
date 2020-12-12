import React from "react";
import ReduxToastr from "react-redux-toastr";
import store from "./redux/store/index";
import Routes from "./routes/Routes";
import { loadUser } from './redux/actions/auth';
import { connect } from "react-redux";




class App extends React.Component {
  componentDidMount() {
    // Remove `active` className from `.splash` element in `public/index.html`
    !document.querySelector(".splash") ||
      document.querySelector(".splash").classList.remove("active");
  }



  render() {
    return (
      <div>
          <Routes />
          <ReduxToastr
            timeOut={5000}
            newestOnTop={true}
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
