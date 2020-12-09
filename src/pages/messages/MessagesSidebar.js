import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as navActions from "../../redux/actions/nav";
import * as messageActions from "../../redux/actions/chats";


import {
  Badge,
  Container,
  Input,
  ListGroupItem,
  Media,
} from "reactstrap";
import avatar5 from "../../assets/img/avatars/avatar-5.jpg";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";



class MessageSidebar extends Component {

  state = {
    loginForm: true,
  };

  waitForAuthDetails() {
    const component = this;
    setTimeout(function() {
      if (
        component.props.token !== null &&
        component.props.token !== undefined
      ) {
        component.props.getUserChats(
          component.props.username,
          component.props.token
        );
        return;
      } else {
        console.log("waiting for authentication details...");
        component.waitForAuthDetails();
      }
    }, 100);
  }

  componentDidMount() {
    this.waitForAuthDetails();
  }

  openAddChatPopup() {
    this.props.addChat();
  }


  render() {

    return (
      <Container fluid className="p-0">

        <div className="px-4 d-none d-md-block">
          <Media className="align-items-center">
            <Media body>
              <Input type="text" className="my-3" placeholder="Search..." />
            </Media>
          </Media>
        </div>


        {this.props.api_open_chats.map((x,y) =>

        <ListGroupItem action tag="a" href="#" className="border-0" tag={Link} to={'/messages/detail/' + x.id }>
          <Badge color="success" className="float-right">
            5
          </Badge>
          <Media>
            <img
              src={avatar5}
              className="rounded-circle mr-1"
              alt="Ashley Briggs"
              width="40"
              height="40"
            />
            <Media body className="ml-3">
              {x.user.username}
              <div className="small">
                <FontAwesomeIcon icon={faCircle} className="chat-online" />{" "}
                Online
              </div>
            </Media>
          </Media>
        </ListGroupItem>

        )}





      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.key !== null,
    token: state.auth.key,
    username: state.auth.user.username,
    loading: state.auth.isLoading,
    chats: state.chats.chats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChat: () => dispatch(navActions.openAddChatPopup()),
    getUserChats: (username, token) =>
      dispatch(messageActions.getUserChats(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageSidebar);
