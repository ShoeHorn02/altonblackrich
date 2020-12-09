import React from "react";
import Landing from "../landing/Landing";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from "../../components/Loader"
import { SOCKET_URL } from '../../redux/actions/API'

class LandingMain extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      socketState: null,
    }
  }

  componentDidMount() {
      this.waitForSocketConnection();
    }



  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function() {
      if (component.state.socketState === 1) {
        console.log("Connection is made");
        //callback();
        return;
      } else {
        console.log("wait for connection...");
        component.connect();
      }
    }, 500);
  }

  connect(chatUrl) {
    const path = `${SOCKET_URL}/ws/notifications/wordcounter/`;
    console.log(path)
    this.socketRef = new WebSocket(path);
    //this.socketRef.close();
    if (this.socketRef.readyState === 1) {
      return;
    }
    console.log(path)
    this.socketRef.onopen = () => {
      console.log('WebSocket open');
      this.setState({
        socketState: 1,
      });
    };
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
      //console.log(e.data)
    };
    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.waitForSocketConnection();
    };
  }

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
