import React from "react";
import axios from "axios";
import { keyConfig } from '../../redux/actions/auth';
import store from "../../redux/store/index";
import { loginFlag } from '../../redux/actions/auth';
import { API_WORKOUTS_POPULAR } from '../../redux/actions/API'
import { Link } from "react-router-dom";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import { exerciseTracker } from '../../redux/actions/lift_tracking';
import { connect } from 'react-redux';
import StatusNew from "../dashboards/Default/StatusNew"


class WorkoutNotFound extends React.Component {


  fetchData = () =>  {
    axios.get(`${API_WORKOUTS_POPULAR}`, keyConfig(store.getState)).then(res => {
      this.setState({
        workouts_popular: res.data
      });

    });
  }



  componentDidMount() {
    this.fetchData();
    store.dispatch(loginFlag());
  }



  constructor(props) {
    super(props);
    this.state = {
      lift_tracking_input: [],
      workouts_popular: [],
      title: "",
      message: "",
      type: "success",
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right",
    };
  }




  render() {

    return (
      <Container fluid>
      <Header>
        <HeaderTitle>Lift Tracker</HeaderTitle>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/dashboard">Lift Tracker</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Discover Workouts</BreadcrumbItem>
        </Breadcrumb>
      </Header>

      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">
              <div className="text-center">
                <h1 className="display-1 font-weight-bold">Oh...</h1>
                <p className="h2 font-weight-normal mt-3 mb-4">
                  First enroll in a workout and then track your lifts here!
                </p>

                  <Button tag={Link} to="/workouts/All" color="primary" outline className="btn-pill mr-1 mb-1" size="lg">
                    <FontAwesomeIcon icon={faDumbbell} className="mr-3 mt-1 float-left"/> Discover Workouts
                  </Button>

              </div>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="my-1">&nbsp;</div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Header >
          <HeaderTitle className="mb-0" style={{color: "black",}}>Popular Workouts:</HeaderTitle>
          </Header>

        <Row >

          {this.state.workouts_popular.map(x=>
          <Col md="6" lg="4">
            <Card>
            <Link to={"/workouts/detail/" + x.id}>
              <CardImg top width="100%" src={x.cover_image} alt="Card image cap" />
              </Link>
              <CardHeader>
              <Link to={"/workouts/detail/" + x.id}>
                <CardTitle tag="h5" className="mb-0">
                  {x.routine}
                </CardTitle>
                  </Link>
              </CardHeader>
              <CardBody>
                <CardText>
                  Some quick example text to build on the card title and make up the bulk
                  of the card's content.
                </CardText>

                <CardText>
                  {x.derived__user_count} members lifting
                </CardText>

                <Button color="primary" tag={Link} to={"/workouts/detail/" + x.id} >
                  View
                </Button>
              </CardBody>
            </Card>
          </Col>
          )}

          <Col md="6" lg="4">
            <StatusNew />
          </Col>

        </Row>
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  user_id: state.auth.user.pk,
  user_status: state.auth.user,
  general: state.general.isLoading,
  theme: state.theme.currentTheme,
});
export default connect(mapStateToProps, { exerciseTracker })(WorkoutNotFound);
