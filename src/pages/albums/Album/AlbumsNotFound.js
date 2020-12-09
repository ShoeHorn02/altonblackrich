import React from "react";
import { toastr } from "react-redux-toastr";
import store from "../../../redux/store/index";
import { loginFlag } from '../../../redux/actions/auth';
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";
import { exerciseTracker } from '../../../redux/actions/lift_tracking';
import { connect } from 'react-redux';
import AddAlbumModal from "./AddAlbumModal";
import defaul_image from '../../../assets/img/vector/istockphoto-607290074-1024x1024.jpg'


class WorkoutNotFound extends React.Component {

  componentDidMount() {
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
      button_spinner: 0,
    };
  }


  handlerButtonSpinner = (val) => {
    this.setState({
      button_spinner: val
    })
  }

  showToastr(name) {
    const options = {
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right"
    };

    const toastrInstance = toastr.success

    toastrInstance(
      "Show your progress",
      "Creating Photo Album " + name,
      options
    );
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
          <BreadcrumbItem>
            <Link to="/dashboard">Lift Tracker</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>See Workouts</BreadcrumbItem>
        </Breadcrumb>
      </Header>

      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">
              <div className="text-center">
                <h1 className="display-1 font-weight-bold">Progression...</h1>
                <p className="h2 font-weight-normal mt-3 mb-4">
                  It's not just the charts. Take some before and after pictures and show your progress
                </p>

                <AddAlbumModal
                  album_name = {this.props.album_name}
                  album_name_value = {this.props.album_name_value}
                  onSubmit={this.props.onSubmit}
                  location={"float-center"}
                  size = {"lg"}
                  color={"primary"}
                  outline={"yes"}
                  button_spinner = {this.state.button_spinner}
                  buttonSpinnerFunction = {this.handlerButtonSpinner}
                  showToastr = {this.showToastr}
                  album_name_function = {this.props.album_name_function}
                  album_des_function = {this.props.album_des_function}
                  post_to_timeline_function = {this.props.post_to_timeline_function}
                  />

              </div>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="my-2">&nbsp;</div>
            </CardBody>
          </Card>
        </Col>
      </Row>





            <Card className="float-center">
              <CardImg top width="100%" src={defaul_image} alt="Card image cap" />

            </Card>






      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  theme: state.theme.currentTheme,
});
export default connect(mapStateToProps, { exerciseTracker })(WorkoutNotFound);
