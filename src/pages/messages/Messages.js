import React, { Component } from 'react';

import InitChat from './InitChat'
import Chat from './Chat'
import WebSocketInstance from '../../services/WebSocket'
import store from "../../redux/store/index";

import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Container,
} from "reactstrap";

import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import { connect } from 'react-redux';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      loggedIn: false
    };
  }

  handleLoginSubmit = (username) => {
    this.setState({ loggedIn: true, username: username });
    WebSocketInstance.connect();
  }

  render() {
    const {
      loggedIn,
      username
    } = this.state;

    return (
      <Container>
      <Header>
        <HeaderTitle>Exercises</HeaderTitle>

        <Breadcrumb>
          <BreadcrumbItem>

          </BreadcrumbItem>
          <BreadcrumbItem active>Exercises {store.getState().auth.user.username}</BreadcrumbItem>
        </Breadcrumb>
      </Header>

        {
          loggedIn ?
          <Chat
            currentUser={username}
          />
          :
          <InitChat
            onSubmit={this.handleLoginSubmit}
            usernameChangeHandler={this.usernameChangeHandler}
          />
        }
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.auth.user.username
});

export default connect(mapStateToProps)(Messages);
