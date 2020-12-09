import React, { Component }  from "react";
import {
  Container,
  Card,
  Col,
  Row
} from "reactstrap";
import MessagesDetail from './MessagesDetail'
import MessagesSidebar from './MessagesSidebar'


import {API_USER_PROFILES, API_CHATS_RD } from '../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../redux/actions/auth';
import store from "../../redux/store/index";


import * as messageActions from "../../redux/actions/chats";
import { connect } from 'react-redux';
import WebSocketInstance from '../../services/WebSocket'




class MessageMain extends Component {


  fetchUsers = () =>  {
    axios.get(`${API_USER_PROFILES}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_profiles: res.data,
        api_users_loading: false
      });
    });
    axios.get(`${API_CHATS_RD}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_open_chats: res.data[0].participants,
        api_open_chats_loading: false
      });
    console.log(res.data)
    console.log(res.data[0].participants)
    });
  }


  componentDidMount() {
    this.fetchUsers();
  }




  constructor(props) {
    super(props);
    WebSocketInstance.addCallbacks(
      this.props.setMessages.bind(this),
      this.props.addMessage.bind(this)
    );
    this.state = {
      api_profiles : [],
      api_profiles_loading: true,
      api_open_chats : [],
      api_open_chats_loading: true,
    };
  }



  render() {

    return (
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Messages</h1>

        <Card >
          <Row noGutters>
            <Col lg={5} xl={3} className="border-right">
              <MessagesSidebar api_open_chats = {this.state.api_open_chats} usersAPI = {this.state.api_profiles} chatID = {this.props.match.params.chatID}/>
              <hr className="d-block d-lg-none mt-1 mb-0" />
            </Col>
            <Col lg={7} xl={9}>
              <MessagesDetail chatID = {this.props.match.params.chatID}/>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    showAddChatPopup: state.nav.showAddChatPopup,
    authenticated: state.auth.key
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(messageActions.addMessage(message)),
    setMessages: messages => dispatch(messageActions.setMessages(messages))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageMain);
