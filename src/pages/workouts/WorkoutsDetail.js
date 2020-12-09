import React from "react";
import axios from "axios";
import { Redirect, Link } from 'react-router-dom';
import WorkoutsDetailLoading from './WorkoutsDetailLoading'
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  ButtonGroup,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  CardLink,
  Col,
  Container,
  Form,
  Input,
  Row,
  Table,
} from "reactstrap";
import { keyConfig } from '../../redux/actions/auth';
import store from "../../redux/store/index";
import { enrollUser, completeEnroll, resumeEnroll } from "../../redux/actions/workouts";
import { API_WORKOUTS_DETAIL } from '../../redux/actions/API'
import { connect } from 'react-redux';
import { elementLoading, elementLoaded } from '../../redux/actions/general';



const MyExportCSV = props => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button className="btn btn-secondary mt-2" onClick={handleClick}>
        Export
      </button>
    </div>
  );
};

class WorkoutsDetail extends React.Component {

  fetchWorkouts = () =>  {
    const workoutID = this.props.match.params.workoutID;
    axios.get(`${API_WORKOUTS_DETAIL}${workoutID}/`, keyConfig(store.getState)).then(res => {
      this.setState({
        workouts_cat: [res.data]
      });
      store.dispatch(elementLoaded());
    });
  }

  onSubmit_enroll = (e) => {
    e.preventDefault();
    this.props.enrollUser(this.routineInput.props.value,this.userIDInput.props.value,this.currentTimeInput.props.value);
    this.props.history.push('/');
  };

  onSubmit__start_over = (e) => {
    e.preventDefault();
    this.props.completeEnroll(this.routineInput.props.value,this.userIDInput.props.value,this.enrollTimeInput.props.value,this.currentTimeInput.props.value,this.endedWorkoutInput.props.value, this.enrollID.props.value);
    this.props.enrollUser(this.routineInput.props.value,this.userIDInput.props.value,this.currentTimeInput.props.value);
    this.props.history.push('/');
  };

  onSubmit__resume = (e) => {
    e.preventDefault();
    this.props.resumeEnroll(this.enrollID.props.value, this.userIDInput.props.value, this.currentTimeInput.props.value);
    this.props.history.push('/');
  };

  onSubmit__end = (e) => {
    e.preventDefault();
    this.props.completeEnroll(this.routineInput.props.value,this.userIDInput.props.value,this.enrollTimeInput.props.value,this.currentTimeInput.props.value,this.endedWorkoutInput.props.value, this.enrollID.props.value);
    this.props.history.push('/');
  };

  componentDidMount() {
    store.dispatch(elementLoading());
    this.fetchWorkouts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchWorkouts();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      workouts_cat: [],
      referrer: null,
      routine_xref: null,
      user_id_xref: null,
      recorded_enroll_date: null,
      recorded_end_date: null,
      ended_workout: null,
    };

  }

  render() {
    const {referrer} = this.state;
    if (this.props.general) {
      return <WorkoutsDetailLoading />

    }
    else if (referrer) {
      return <Redirect to={referrer} />;
    }

    return (
      <Container fluid>
      {this.state.workouts_cat.map((p,q) =>
        <Header key={q}>
          <HeaderTitle>{p.routine}</HeaderTitle>
          <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/dashboard">Dashboard</Link>
          </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/workouts">Workouts</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Detail</BreadcrumbItem>
            <BreadcrumbItem active>{p.routine}</BreadcrumbItem>
          </Breadcrumb>
        </Header>
      )}

      {this.state.workouts_cat.map((x,k) =>
        <Row key={k}>
          <Col xs="12" className="col-xxl-3">
            <Card>
              <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                  {x.routine}
                </CardTitle>
              </CardHeader>

              <CardBody>
                <Row noGutters>
                  <Col sm="3" xl="12" className="col-xxl-4 text-center">
                    <img
                      src={x.cover_image}
                      alt=""
                      width="64"
                      height="64"
                      className="square-circle mt-2"
                    />
                  </Col>
                  <Col sm="9" xl="12" className="col-xxl-8">
                    <strong>About</strong>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                      commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                      penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    </p>
                  </Col>
                </Row>

                <Table size="sm" className="my-2">
                  <tbody>
                  <tr>
                    <th>Level</th>
                    <td>{x.training_level_xref}</td>
                  </tr>
                  <tr>
                    <th>Days per week</th>
                    <td>{x.days_per_week} days </td>
                  </tr>
                  <tr>
                    <th>Duration</th>
                    <td>{x.duration_weeks} Weeks</td>
                  </tr>
                  <tr>
                    <th>Author</th>
                    <td><a href={x.source} target="blank">{x.author}</a></td>
                  </tr>
                  <tr>
                    <th>Is Split</th>
                    <td>
                    {
                      x.is_split === null ? "No" : "Yes"
                    }
                    </td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                    {
                      x.enroll_history.length === 0 ?
                      <span className="badge badge-secondary">Never Lifted</span>
                      :
                      <span>
                        {x.enroll_history.map((u,v) =>
                          <span>
                          <span className={u.derived__status_memo_boostrap_color_badge}>{u.derived__status_memo}</span>
                        </span>

                        )}</span>
                    }
                    </td>
                  </tr>
                  </tbody>
                </Table>

              </CardBody>

            </Card>
            {x.enroll_history.length === 0 || x.enroll_history[0].completed_workout ?
              <Card>
                <Form onSubmit={this.onSubmit_enroll}>
                  <Input type="hidden" name="routine_xref" value={x.id} ref={(input) => { this.routineInput = input }} />
                  <Input type="hidden" name="user_id_xref" value={this.props.user_id } ref={(input) => { this.userIDInput = input }} />
                  <Input type="hidden" name="recorded_enroll_date" value={x.derived__time_now} ref={(input) => { this.currentTimeInput = input }} />
                  <Button color="primary" className="mr-1 btn-block"  type="submit"><FontAwesomeIcon icon={faSmile} /> {x.enroll_history.length === 0? "Enroll and Track" : "Lift Again!" } </Button>
                </Form>
              </Card>
            :
              <Card>
                {x.enroll_history.map((u,v) =>
                  <Form key={v}>
                    {u.derived__status === "current" ?
                      <Form onSubmit={this.onSubmit__start_over}>
                        <Input type="hidden" name="routine_xref" value={x.id} ref={(input) => { this.routineInput = input }} />
                        <Input type="hidden" name="user_id_xref" value={this.props.user_id } ref={(input) => { this.userIDInput = input }} />
                        <Input type="hidden" name="recorded_enroll_date" value={u.recorded_enroll_date} ref={(input) => { this.enrollTimeInput = input }} />
                        <Input type="hidden" name="recorded_end_date" value={x.derived__time_now} ref={(input) => { this.currentTimeInput = input }} />
                        <Input type="hidden" name="ended_workout" value="true" ref={(input) => { this.endedWorkoutInput = input }} />

                        <Input type="hidden" name="recorded_enroll_date_new" value={u.id} ref={(input) => { this.enrollID = input }} />
                        <Button color="warning" className="btn-block"  type="submit" ><FontAwesomeIcon icon={faExclamation} /> Start Over </Button>
                      </Form>
                    :
                      <ButtonGroup style = {{"display": "flex", "justify-content": "space-around"}}>
                        <Input type="hidden" name="enrollID" value={u.id} ref={(input) => { this.enrollID = input }} />
                        <Input type="hidden" name="user_id_xref" value={this.props.user_id } ref={(input) => { this.userIDInput = input }} />
                        <Input type="hidden" name="recorded_enroll_date_curret" value={x.derived__time_now} ref={(input) => { this.currentTimeInput = input }} />
                        <Input type="hidden" name="routine_xref" value={x.id} ref={(input) => { this.routineInput = input }} />
                        <Input type="hidden" name="recorded_enroll_date" value={u.recorded_enroll_date} ref={(input) => { this.enrollTimeInput = input }} />
                        <Input type="hidden" name="ended_workout" value="true" ref={(input) => { this.endedWorkoutInput = input }} />

                        <Form onSubmit={this.onSubmit__resume}>
                          <Button color="primary" className="mr-1 "  type="submit"><FontAwesomeIcon icon={faSmile} /> Resume </Button>
                        </Form>

                        <Form onSubmit={this.onSubmit__start_over}>

                          <Button color="warning" className=" "  type="submit"><FontAwesomeIcon icon={faExclamation} /> Start Over </Button>
                        </Form>

                        <Form onSubmit={this.onSubmit__end}>
                          <Button color="danger" className="ml-1 "  type="submit"><FontAwesomeIcon icon={faTimes} /> End </Button>
                        </Form>

                      </ButtonGroup>
                    }
                  </Form>
                  )}
              </Card>
            }
          </Col>

          <Col xs="12" className="col-xxl-9">

            <Card>
              <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                  Description
                </CardTitle>
              </CardHeader>
              <CardBody>
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus gravida rhoncus. Quisque dui metus, congue ut sagittis vitae, convallis a ligula. Donec tincidunt nec ex at hendrerit. Vivamus eu leo mauris. Vestibulum vestibulum, enim eu vehicula viverra, nulla ipsum scelerisque nisi, quis luctus justo enim et lorem. Etiam lorem eros, commodo et metus ut, accumsan faucibus arcu. Duis at tellus ut tortor vestibulum lacinia. Nunc commodo ex libero, vitae ultricies ante cursus id. Cras non ornare tortor, sit amet consequat velit. Maecenas vestibulum et urna id hendrerit. Nulla porttitor consequat urna et elementum. Etiam non lobortis mi. Vivamus eu eros dui. Cras gravida nunc id orci consequat tincidunt. Nam placerat magna quis massa mollis, in ornare elit lobortis.

                </CardText>
                <CardLink href="#">Card link</CardLink>
                <CardLink href="#">Another link</CardLink>
              </CardBody>
            </Card>

            {x.quick.map((y,t) =>
              <Card key={t}>
                <ToolkitProvider
                  keyField="name"
                  data={y.full_quick}
                  columns={
                  [
                    {
                      dataField: "exercise_xref.exercise",
                      text: "Exercise",
                      sort: true,
                    },
                    {
                      dataField: "derived__set_count",
                      text: "Sets",
                      sort: true
                    },
                    {
                      dataField: "derived__rep_count",
                      text: "Reps",
                      sort: true
                    },
                  ]
                }
                  exportCSV
                >
                  {(props) => (
                    <div>
                      <CardHeader>
                        <div className="float-right pull-right">
                          <MyExportCSV {...props.csvProps} />
                        </div>
                        <CardTitle tag="h5">{t === 0 ? "The Program" : ""}</CardTitle>
                        <h6 className="card-subtitle text-muted">
                          {y.derived__day_title}
                        </h6>
                      </CardHeader>
                      <CardBody>
                        <BootstrapTable
                          {...props.baseProps}
                          keyField = "exercise_xref.exercise"
                          bootstrap4
                          bordered={false}
                          rowEvents={ {
                            style: { cursor: 'pointer'},
                            onClick: (e, row) => { this.setState({referrer: `/exercises/detail/${row.exercise_xref.id}`}) }
                          }}
                          hover={true}
                        />
                      </CardBody>
                    </div>
                  )}
                </ToolkitProvider>
              </Card>
            )}

          </Col>
        </Row>
      )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user_id: state.auth.user.pk,
  general: state.general.isLoading,
});

export default connect(mapStateToProps, { enrollUser, completeEnroll, resumeEnroll })(WorkoutsDetail);
