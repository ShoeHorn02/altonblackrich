import React from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Spinner
} from "reactstrap";

import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import { clearPosts } from '../../redux/actions/workouts';
import { connect } from 'react-redux';



class Clients extends React.Component {

  render() {

    return (
      <Container fluid>
        <Header>
          <HeaderTitle>Lift Tracking</HeaderTitle>

          <Breadcrumb>
            <BreadcrumbItem active>
              <Spinner color="primary" type="grow" size="sm" className="mr-2" />
              <Spinner color="light" type="grow" size="sm" className="mr-2"/>
            </BreadcrumbItem>
          </Breadcrumb>
        </Header>


        <Card>
        <CardHeader>
          <CardTitle tag="h5">Lift Tracking</CardTitle>
          <h6 className="card-subtitle text-muted">
            Hang on, we are getting your workout...
          </h6>
        </CardHeader>
        <CardBody>
          <div className="mb-2">
            <Spinner color="dark" type="grow" size="sm" className="mr-2" />
            <Spinner color="primary" type="grow" size="sm" className="mr-2"/>
          </div>
        </CardBody>
        </Card>

      </Container>
    );
   }
  }



const mapStateToProps = (state) => ({
  user_id: state.auth.user.pk,
  general: state.general.isLoading,
  posted: state.workouts.isSent,
});

export default connect(mapStateToProps, { clearPosts })(Clients);
