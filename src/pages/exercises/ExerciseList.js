import React from "react";
import { Redirect, Link } from "react-router-dom";
import { keyConfig } from '../../redux/actions/auth';
import axios from "axios";
import store from "../../redux/store/index";
import { API_EXERCISE_LIST } from '../../redux/actions/API';
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

import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { elementLoading, elementLoaded } from '../../redux/actions/general';
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

const { SearchBar } = Search;

class ExerciseList extends React.Component {

  fetchWorkouts = () =>  {
    axios.get(`${API_EXERCISE_LIST}`, keyConfig(store.getState)).then(res => {
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
          <HeaderTitle>Exercises</HeaderTitle>

          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Exercises</BreadcrumbItem>
          </Breadcrumb>
        </Header>

        <Card>
          <ToolkitProvider
            keyField="name"
            data={this.state.exercises_detail}
            columns={
            [
              {
                dataField: "exercise",
                text: "Exercise",
                sort: true,
              },
              {
                dataField: "body_group_xref",
                text: "Body Group",
                sort: true,
              },
              {
                dataField: "muscle_group_xref",
                text: "Body Part",
                sort: true,
              },
              {
                dataField: "push_pull_xref",
                text: "Type",
                sort: true,
              },
              {
                dataField: "modality_xref.modality",
                text: "Modality",
                sort: true,
              },
              {
                dataField: "training_level_xref",
                text: "Level",
                sort: true,
              },
            ]
          }
            exportCSV
            search
          >
            {(props) => (
              <div>
                <CardHeader className="d-flex justify-content-between">
                  <div>
                  <CardTitle tag="h5">Exercise Dictionary</CardTitle>
                  <h6 className="card-subtitle text-muted">
                    Monitor your exercise performances
                  </h6>
                  </div>


                  <div className="d-flex flex-row-reverse" >
                      <div style={{display: 'flex', 'justifyContent': 'center', 'alignItems': 'center'}} className="p-0 ml-1">
                        <MyExportCSV {...props.csvProps} />
                      </div>
                      <div style={{display: 'flex', 'justifyContent': 'center', 'alignItems': 'center'}} className="p-0 mt-3">
                      <SearchBar { ...props.searchProps } className="p-0 m-0"/>
                      </div>
                    </div>
                </CardHeader>
                <CardBody>
                  <BootstrapTable
                    {...props.baseProps}
                    keyField="exercise"
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
