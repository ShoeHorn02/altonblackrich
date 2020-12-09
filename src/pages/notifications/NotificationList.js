import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import store from "../../redux/store/index";
import Loader from "../../components/Loader";
import {
  API_NOTIFICATIONS_SHORT,
  API_NOTIFICATIONS_LONG,
 } from '../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../redux/actions/auth';
import { loadUser } from '../../redux/actions/auth';
import NotificationDetail from './NotificationDetail'

import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";

import {
  Breadcrumb,
  Button,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Container,
  Row,
  Col,
} from "reactstrap";

class Discover extends React.Component {

  fetchProfiles = () =>  {
    axios.get(`${API_NOTIFICATIONS_SHORT}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_notification_short: res.data,
        api_notification_short_loading: false,
      });
    });
    axios.get(`${API_NOTIFICATIONS_LONG}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_notification_long: res.data,
        api_notification_long_loading: false,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.user_status == null) {
      store.dispatch(loadUser());
    }
  }

  componentDidMount() {
    this.fetchProfiles();
  }

  constructor(props) {
    super(props);
    this.state = {
      api_notification_short : [],
      api_notification_long : [],
      api_notification_short_loading: true,
      api_notification_long_loading: true,
    };
  }


renderWithData = () => {
  return(
    <Row>
      <Col lg="8" xl="9" >
        <NotificationDetail
          title ={"Recent"}
          api_notification = {this.state.api_notification_short}
          />

        <NotificationDetail
          title ={"Earlier"}
          api_notification = {this.state.api_notification_long}
          />
      </Col>
      <Col lg="4" xl="3">


      <Card className="text-center">
        <CardBody className="d-flex flex-column">
          <div className="mb-1">
            <h3>Notifications</h3>
          </div>

          <p>You’re all caught up! <br/>Check back later for new notifications</p>

          <div>
            <hr className="my-2" />
          </div>

          <p>Improve your notifications</p>


          <div className="mt-auto">
            <Button size="md" color="primary" outline tag={Link} to="/settings/account">
              View Settings
            </Button>
          </div>
        </CardBody>
      </Card>


      </Col>
    </Row>
  )
}


renderWithoutData = () => {
  return(
    <Card className="text-center">
      <CardBody className="d-flex flex-column">
        <div className="mb-1">
          <h3>Notifications</h3>
        </div>

        <p>You’re all caught up! <br/>Check back later for new notifications</p>

        <div>
          <hr className="my-2" />
        </div>

        <p>Improve your notifications</p>


        <div className="mt-auto">
          <Button size="md" color="primary" outline tag={Link} to="/settings/account">
            View Settings
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

renderNotifications = () => {
  if (this.state.api_notification_short.length >0 || this.state.api_notification_long.length >0) {
    return(
      <div>
        {this.renderWithData()}
      </div>
    )
  }
  return(
    <div>
      {this.renderWithoutData()}
    </div>
  )
}


  render() {
    if (this.props.user_status == null ||
      this.state.api_notification_short_loading ||
      this.state.api_notification_long_loading
    ) {
      return <Loader />
    }
    return (

      <Container fluid>
        <Header>
          <HeaderTitle>Notifications</HeaderTitle>

          <Breadcrumb>
            <BreadcrumbItem active>My Notifications</BreadcrumbItem>
          </Breadcrumb>
        </Header>


        {this.renderNotifications()}


        </Container >
  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Discover);
