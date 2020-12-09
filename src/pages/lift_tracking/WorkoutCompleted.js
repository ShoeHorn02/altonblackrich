import React from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import StatusNew from "../dashboards/Default/StatusNew"



const WorkoutNotFound = (props) => (
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
            <h1 className="display-1 font-weight-bold">Champ!</h1>
            <p className="h2 font-weight-normal mt-3 mb-4">
               {props.workout}...is done
            </p>
            <Link to="/dashboard">
              <Button tag={Link} to="/workouts/All" color="primary" outline className="btn-pill mr-1 mb-1" size="lg">
                Keep On Lifiting
              </Button>
            </Link>
          </div>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="my-2">&nbsp;</div>
        </CardBody>
      </Card>
    </Col>
  </Row>

  <Header >
      <HeaderTitle className="mb-0" style={{color: "black",}}>Popular Workouts:</HeaderTitle>
      </Header>

    <Row >


      <Col md="6" lg="4">
        <StatusNew />
      </Col>

    </Row>
  </Container>


);

export default WorkoutNotFound;
