import React, { Component } from 'react';
import store from "../../redux/store/index";
import { connect } from 'react-redux';
import WebSocketInstance from '../../services/WebSocket'
import {
  Form,
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
} from "reactstrap";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";


import { Phone, Video, MoreHorizontal } from "react-feather";

const ChatMessage = ({ position, avatar, name, children, time }) => (
  <div className={`chat-message-${position} pb-4`}>
    <div>
      <img
        src={avatar}
        className="rounded-circle mr-1"
        alt={name}
        width="40"
        height="40"
      />
      <div className="text-muted small text-nowrap mt-2">{time}</div>
    </div>
    <div
      className={`flex-shrink-1 bg-light rounded py-2 px-3 ${
        position === "right" ? "mr-3" : "ml-3"
      }`}
    >
      <div className="font-weight-bold mb-1">{name}</div>
      {children}
    </div>
  </div>
);


class MessageDetails extends Component {
  state = { message: "" };

  initialiseChat() {
    this.waitForSocketConnection(() => {
      WebSocketInstance.fetchMessages(
        this.props.username,
        this.props.chatID
      );
    });
    WebSocketInstance.connect(this.props.chatID);
  }

  constructor(props) {
    super(props);
    this.initialiseChat();
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function() {
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100);
  }

  messageChangeHandler = event => {
    this.setState({ message: event.target.value });
  };

  sendMessageHandler = e => {
    e.preventDefault();
    const messageObject = {
      from: store.getState().auth.user.pk,
      content: this.state.message,
      chatId: this.props.chatID
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({ message: "" });
  };

  renderTimestamp = timestamp => {
    let prefix = "";
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    );
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = "just now...";
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`;
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`;
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
    } else {
      prefix = `${new Date(timestamp)}`;
    }
    return prefix;
  };

  renderMessages = messages => {
    const currentUser = store.getState().auth.user.username;
    return messages.map((message, i, arr) => (
      <ChatMessage
        key={message.id}
        position={message.author === currentUser ? 'right' : 'left'}
        name={message.author === currentUser ? 'You' : message.author}
        avatar={avatar1}
        time={this.renderTimestamp(message.timestamp)}
      >
        { message.content }
      </ChatMessage>
    ));
  };





  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }



  render() {
    return (
      <Container fluid className="p-0" style={{"min-height":"600px", }}>

      <div className="py-2 px-4 border-bottom d-none d-lg-block">
        <Media className="align-items-center py-1">
          <div className="position-relative">
            <img
              src={avatar3}
              className="rounded-circle mr-1"
              alt="Bertha Martin"
              width="40"
              height="40"
            />
          </div>
          <Media body className="pl-3">
            <strong>Bertha Martinnnn</strong>
            <div className="text-muted small">
              <em>Typing...</em>
            </div>
          </Media>
          <div>
            <Button size="lg" color="primary" className="px-3 mr-2">
              <Phone className="feather" />
            </Button>
            <Button
              size="lg"
              color="info"
              className="mr-2 px-3 d-none d-md-inline-block"
            >
              <Video className="feather" />
            </Button>
            <Button size="lg" color="light" className="px-3 border">
              <MoreHorizontal className="feather" />
            </Button>
          </div>
        </Media>
      </div>





      <div className="messages">
        <ul id="chat-log">
          {this.props.messages && this.renderMessages(this.props.messages)}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </ul>
      </div>



        <div className="flex-grow-0 py-3 px-4 border-top">
          <Form onSubmit={(e) => this.sendMessageHandler(e, this.state.message)} className='form'>
            <InputGroup>
              <Input
                type="text"
                placeholder="Type your message"
                onChange={this.messageChangeHandler}
                value={this.state.message}
                required />
              <InputGroupAddon addonType="append">
                <Button color="primary" className='submit' type='submit' value='Submit'>Send</Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </div>

      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  general: state.general.isLoading,
  username: state.auth.username,
  messages: state.chats.messages,
});

export default connect(mapStateToProps)(MessageDetails);
