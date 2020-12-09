import React from "react";
import { Link, Redirect } from "react-router-dom";
import { keyConfig } from '../../redux/actions/auth';
import axios from "axios";
import store from "../../redux/store/index";
import { API_WORKOUTS_CATEGORY } from '../../redux/actions/API'
import { connect } from 'react-redux';
import Default from '../dashboards/Social/index'
import { loginFlag } from '../../redux/actions/auth';
import { loadUser } from '../../redux/actions/auth';
import Loader from "../../components/Loader";
import {
  Badge,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Progress,
  Row,
} from "reactstrap";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const CardLifted = (props) => (
  <Card>
  <Link to={"/workouts/detail/" + props.workout_details.id} >
    <CardImg top src={props.workout_details.cover_image} alt="Card image cap" />

    <CardHeader className="px-4 pt-4">

      <CardTitle tag="h5" className="mb-0">
        {props.workout_details.routine}
      </CardTitle>
      <Badge className="my-2" color={props.workout_details.enroll_history[0].derived__progress_bar_bootstrap_color}>
        {props.workout_details.enroll_history[0].derived__status_memo}
      </Badge>
    </CardHeader>
    </Link>
    <CardBody className="px-4 pt-1 pb-0" >
      <p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris.</p>
    </CardBody>
    <ListGroup flush >
      <ListGroupItem className="px-4 pb-4">
        <Progress color={props.workout_details.enroll_history[0].derived__progress_bar_bootstrap_color}
        value={props.workout_details.enroll_history[0].derived__workout_progress_int} className="pl-0 pr-0 mr-0 ml-0">
          {props.workout_details.enroll_history[0].derived__workout_progress_pct}
        </Progress>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

const CardNeverLifted = (props) => (
  <Card>
    <Link to={"/workouts/detail/" + props.workout_details.id} >
      <CardImg top src={props.workout_details.cover_image} alt="Card image cap" />
        <CardHeader className="px-4 pt-4">
          <CardTitle tag="h5" className="mb-0">
            {props.workout_details.routine}
          </CardTitle>
          <Badge className="my-2" color="info">
            Never Lifted
          </Badge>
        </CardHeader>
    </Link>
    <CardBody className="px-4 pt-1 pb-0" >
      <p>Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris.</p>
    </CardBody>
    <ListGroup flush >
      <ListGroupItem className="px-4 pb-4">
        <p className="mb-2 ">
          <span className="float-right pt-1 ml-1">0%</span>
        </p>
        <Progress value="0" className="p-0 m-0">
          0
        </Progress>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

class WorkoutsList extends React.Component {

  fetchWorkouts = () =>  {
    const categoryID = this.props.match.params.categoryID;
    this.setState({category_id: categoryID})
    axios.get(`${API_WORKOUTS_CATEGORY}${categoryID}/`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_workouts_category: [res.data],
        api_workouts_category_loading: false,
      });
    });
  }

  componentDidMount() {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
    }
    this.fetchWorkouts();
  }

  componentDidUpdate() {
    const categoryID = this.props.match.params.categoryID;
    if (categoryID === 'All') {
  }
    if (categoryID !== this.state.category_id) {
      store.dispatch(loginFlag());
      this.fetchWorkouts();
  }
}

  constructor(props) {
    super(props);
    this.state = {
      api_workouts_category: [],
      api_workouts_category_loading: true,
      category_id: null,
    };
  }

  render() {
    if (this.props.user_status === null) {
      return <Loader />;
    }
    else if (!this.props.user_status.onboarding_complete) {
      return <Redirect to="/onboarding/step1" />;
    }
    else if (this.props.loginflag) {
      return <Default />;
    }
    else if (this.state.api_workouts_category_loading) {
      return <Loader />
    }
    return (

      <Container fluid>
        <Header>
          <HeaderTitle> Workouts
            <Button color="info" className="float-right mt-n1">
              <FontAwesomeIcon icon={faPlus} /> Create Workout
            </Button>
          </HeaderTitle>
          <Breadcrumb>
            <BreadcrumbItem active>
              Discover
            </BreadcrumbItem>
            <BreadcrumbItem active>Workouts</BreadcrumbItem>
            <BreadcrumbItem active>{this.props.match.params.categoryID}</BreadcrumbItem>
          </Breadcrumb>
        </Header>




        {this.state.api_workouts_category.map( (test,z) =>
           <Row key={z}>
              {test.workouts.map( (dummy,y) =>
             <Col md="6" lg="4" key={y}>
              {dummy.enroll_history.length > 0 ?
               <CardLifted workout_details={dummy}/>
               :
               <CardNeverLifted workout_details = {dummy}/>
             }
             </Col>
             )}
           </Row>
        )}

      </Container>

    );
  }
}

const mapStateToProps = (state) => ({
  loginflag: state.auth.loginFlag,
  user_status: state.auth.user,
});

export default connect(mapStateToProps)(WorkoutsList);
