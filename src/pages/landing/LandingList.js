import React from "react";
import Landing from "../landing/Landing";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from "../../components/Loader"
import { SOCKET_URL } from '../../redux/actions/API'
import {
  Button,
  CardHeader,
  CardTitle,
  Card,
  Col,
  Container,
  Row,
  CardImg,
  CardBody,
  Media,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Form,
} from "reactstrap";
import ReactQuill from "react-quill";
import { Truck, Users, DollarSign, ShoppingCart } from "react-feather";


class LandingMain extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      socketState: null,
      text: null,
      word_count: 0,
      charachter_count: 0,
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



  componentWillUnmount() {
    this.disconnect();
  }


  disconnect() {
    try{this.socketRef.close()} catch(e) { console.error(e); }
  }


  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch(err) {
      console.log(err.message);
    }
  }


  fetchMessages() {
    this.sendMessage({
      command: "count_text",
      text: this.state.text
    });
  }


  componentDidUpdate() {
    if (this.state.socketState === 1 && this.state.text !== null) {
      this.setState({
        text: null,
      });
      this.fetchMessages();
    }
  }


  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    console.log(parsedData)
    this.setState({
      word_count: parsedData.words_count,
      charachter_count: parsedData.charachter_count
    })
  }

  handleChange = (content, delta, source, editor) => {
    const text = editor.getText(content);
    console.log(text)
    this.setState({ text: text })
  }



  renderWordCountCard = () => {
    return(
      <Card>
        <CardBody>
          <Row>
            <Col className="mt-0">
              <CardTitle tag="h5">Word Count</CardTitle>
            </Col>

            <Col className="col-auto">
              <div className="avatar">
                <div className="avatar-title rounded-circle bg-primary-dark">
                  <Truck className="feather align-middle" />
                </div>
              </div>
            </Col>
          </Row>
          <h1 className="display-5 mt-1 mb-3">{this.state.word_count}</h1>
          <div className="mb-0">
            <div className="mb-0 text-muted">
              includes whole words
            </div>
          </div>
        </CardBody>
      </Card>
    )
  }



  renderLetterCountCard = () => {
    return(
      <CardBody>
        <Row>
          <Col className="mt-0">
            <CardTitle tag="h5">Charachter Count</CardTitle>
          </Col>

          <Col className="col-auto">
            <div className="avatar">
              <div className="avatar-title rounded-circle bg-primary-dark">
                <Users className="feather align-middle" />
              </div>
            </div>
          </Col>
        </Row>
        <h1 className="display-5 mt-1 mb-3">{this.state.charachter_count}</h1>
        <div className="mb-0">
          <div className="mb-0 text-muted">
            includes spaces
          </div>
        </div>
      </CardBody>
    )
  }

  renderMain = () => {
    return(
      <section className="landing-intro text-dark pt-5">
        <Container>
          <Row>
            <Col md="7" className="mx-auto text-center">
              <h1 className="landing-intro-title my-4">The #1 app for word counting</h1>

              <p className="landing-intro-subtitle">Count. Grow. Inspire. Change. Be A Words Smith. <br />Becasue Counting Words and Letters Are Awesome.</p>




            </Col>
          </Row>
          <Row>
          <Col md="12">
          <Card>

            <CardBody >
              <ReactQuill
                placeholder="Type something and we will count"
                onChange={this.handleChange}
                />
            </CardBody>
          </Card>

          </Col>
          </Row>
          <Row>
            <Col sm="6">
              {this.renderWordCountCard()}
              </Col>
              <Col sm="6">
              <Card>
              {this.renderLetterCountCard()}
              </Card>
            </Col>

          </Row>
        </Container>


      </section>
    )
  }





  render() {
    if (this.props.isLoading) {
      return <Loader />;
    }
    return (
      <div>
        {this.renderMain()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(LandingMain);
