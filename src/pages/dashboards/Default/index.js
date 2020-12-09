import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";


import ToolkitProvider from "react-bootstrap-table2-toolkit";
import Area from "./Area"

import NextWorkoutTable from "./NextWorkoutTable"
import Status from "./Status";
import ReadBlog from "./ReadBlog";
import StatusNew from "./StatusNew";
import Completed from "./Completed";


import store from "../../../redux/store/index";

import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";
import HeaderSubtitle from "../../../components/HeaderSubtitle";
import Loader from "./Loading";

import {
  API_DASHBOARD_GRAPH,
  API_DASHBOARD_TABLE,
  API_LIFT_TRACKER_INPUT }
  from '../../../redux/actions/API'

import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser, loginFlag } from '../../../redux/actions/auth';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

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

class Default extends React.Component {

  fetchLiftData = () =>  {
    axios.get(`${API_DASHBOARD_GRAPH}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_dashboard_graph: res.data,
        api_dashboard_graph_loading: false,
      });
    });
    axios.get(`${API_DASHBOARD_TABLE}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_dashboard_table: res.data,
        api_dashboard_table_loading: false,
      });
    });
    axios.get(`${API_LIFT_TRACKER_INPUT}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_dashboard_lti: res.data,
        api_dashboard_lti_loading: false
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.user_status == null) {
      store.dispatch(loadUser());
    }
  }

  componentDidMount() {
    this.fetchLiftData();
    document.body.style.overflow = 'overflowY';
  }

  constructor(props) {
    super(props);
    this.state = {
      api_dashboard_graph: [],
      api_dashboard_graph_loading: true,
      api_dashboard_table: [],
      api_dashboard_table_loading: true,
      api_dashboard_lti:[],
      api_dashboard_lti_loading: true,
      referrer: null,
    };
  }

  renderTable = () => {
    return(
      <Card>
        <ToolkitProvider
          keyField="name"
          data={this.state.api_dashboard_table}
          columns={
          [
            {
              dataField: "exercise_xref.exercise",
              text: "Exercise",
              sort: true,
            },
            {
              dataField: "exercise_xref.table_data.0.last",
              text: "Last",
              sort: true,
            },
            {
              dataField: "exercise_xref.table_data.0.current",
              text: "current",
              sort: true,
            },
            {
              dataField: "exercise_xref.table_data.0.change",
              text: "change",
              sort: true,
            },
          ]
        }
          hover={true}
          rowEvents={ {
            style: { cursor: 'pointer'},
            onClick: (e, row) => { this.setState({referrer: `/exercises/detail/${row.exercise_xref.id}`}) }
          }}
          bootstrap4
          bordered={false}
          pagination={paginationFactory({
            sizePerPage: 5,
            sizePerPageList: [5, 10, 25, 50]
          })}
            exportCSV
          >
            {(props) => (
              <div>
                <CardHeader>
                  <div className="float-right pull-right">
                    <MyExportCSV {...props.csvProps} />
                  </div>
                  <CardTitle tag="h5">Other Exercise</CardTitle>
                </CardHeader>
                <CardBody>
                  <BootstrapTable
                    {...props.baseProps}
                    keyField="exercise_xref.exercise"
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

      )
  }

  renderNewUser = () => {
    return(
      <Row>
        <Col lg="4" className="d-flex">
          <section>
            <StatusNew />
            <ReadBlog />
          </section>
        </Col>
        <Col lg="8" className="d-flex">
          <section className="flex-fill w-100">
            <Area data={this.state.api_dashboard_graph} />
            {this.renderTable()}
          </section>
        </Col>
      </Row>
      )
    }

  renderLiftingUserNext = () => {
    if (!this.state.api_dashboard_lti[0].routine_xref.enroll_history[0].completed_workout) {
      return(
          <NextWorkoutTable next_workout_data = {this.state.api_dashboard_lti[0].full_quick} next_workout_title = {this.state.api_dashboard_lti[0].day_title} workout_id={this.state.api_dashboard_lti[0].routine_xref.id}/>
      )
    }
    return(
        <Completed style={{border:"1px solid red"}}/>
    )

  }

  renderLiftingUser = () => {
    return(
      <Row>
        <Col lg="4" className="d-flex" >
          <section>
            <Status data={this.state.api_dashboard_lti} />
            {this.renderLiftingUserNext()}
          </section>
        </Col>
        <Col lg="8" className="d-flex">
          <section className="flex-fill w-100">
            <Area data={this.state.api_dashboard_graph} />
            {this.renderTable()}
          </section>
        </Col>
      </Row>
    )
  }

  render() {
    const {referrer} = this.state;

    if (
      this.props.user_status == null ||
      this.state.api_dashboard_lti_loading ||
      this.state.api_dashboard_graph_loading ||
      this.state.api_dashboard_table_loading) {
        return <Loader />
      }

    else if (!this.props.user_status.onboarding_complete) {
      return <Redirect to="/onboarding/step1" />;
    }

    else if (referrer) {
       return <Redirect to={referrer} />;
     }

    return (
      <Container fluid style={{'overflowY': 'auto'}}>
        <Header>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubtitle>
            {this.props.user_status.firstname_lastname}
          </HeaderSubtitle>
        </Header>
        {this.state.api_dashboard_lti.length > 0 ?
          this.renderLiftingUser()
          :
          this.renderNewUser()
        }
      </Container>
  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
