import React from "react";
import { Redirect, Link } from "react-router-dom";
import { keyConfig } from '../../../redux/actions/auth';
import axios from "axios";
import store from "../../../redux/store/index";
import { API_REPORTS_LIFT_HISTORY } from '../../../redux/actions/API';
import Loading from './Loading'


import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Container,
} from "reactstrap";

import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { elementLoading, elementLoaded } from '../../../redux/actions/general';
import { connect } from 'react-redux';



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


class ExerciseList extends React.Component {

  fetchWorkouts = () =>  {
    axios.get(`${API_REPORTS_LIFT_HISTORY}`, keyConfig(store.getState)).then(res => {
      this.setState({
        exercises_detail: res.data
      });
      store.dispatch(elementLoaded());
    });
  }

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
      exercises_detail: [],
      referrer: null,
    };
  }

  render() {
    const {referrer} = this.state;
    if (this.props.general) {
      return <Loading />
    }
   else if (referrer) {
      return <Redirect to={referrer} />;
    }
    return (

      <Container fluid>
        <Header>
          <HeaderTitle>Lift History</HeaderTitle>

          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Lift History</BreadcrumbItem>
          </Breadcrumb>
        </Header>

        <Card>
          <ToolkitProvider
            keyField="name"
            data={this.state.exercises_detail}
            columns={
            [
              {
                dataField: "exercise_xref.exercise",
                text: "Exercise",
                sort: true,
              },
              {
                dataField: "user_enrollment_history_xref.routine_xref.routine",
                text: "Workout",
                sort: true,
              },
              {
                dataField: "set_xref",
                text: "Set #",
                sort: true,
              },
              {
                dataField: "rep_count",
                text: "Rep Count",
                sort: true,
              },
              {
                dataField: "weight",
                text: "Weight",
                sort: true,
              },
              {
                dataField: "recorded_date",
                text: "Date",
                sort: true,
              },
            ]
          }
            exportCSV
            search
          >
            {(props) => (
              <div>
                <CardHeader>
                  <div className="float-right pull-right">
                    <MyExportCSV {...props.csvProps} />
                  </div>
                  <CardTitle tag="h5">All Lift History</CardTitle>
                  <h6 className="card-subtitle text-muted">
                    View and download your entire lift history
                  </h6>
                </CardHeader>
                <CardBody>
                  <BootstrapTable
                    {...props.baseProps}
                    bootstrap4
                    bordered={false}
                    rowEvents={ {
                      style: { cursor: 'pointer'},
                      onClick: (e, row) => { this.setState({referrer: `/exercises/detail/${row.id}`}) }
                    }}
                    hover={true}
                    pagination={paginationFactory({
                      sizePerPage: 25,
                      sizePerPageList: [5, 10, 25, 50]
                    })}
                  />
                </CardBody>
              </div>
            )}
          </ToolkitProvider>
        </Card>

      </Container>

    );
  }
}


const mapStateToProps = (state) => ({
  general: state.general.isLoading,
});

export default connect(mapStateToProps)(ExerciseList);
