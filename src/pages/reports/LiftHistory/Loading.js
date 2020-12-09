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

import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";



const LiftHistory = () => (
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
    <CardHeader>
      <CardTitle tag="h5">Lift History</CardTitle>
      <h6 className="card-subtitle text-muted">
        View and download your entire lift history
      </h6>
    </CardHeader>
    <CardBody>
      <div className="mb-2">
        <Spinner color="dark" type="grow" size="sm" className="mr-2" />
          <Spinner
            color="primary"
            type="grow"
            size="sm"
            className="mr-2"
          />
      </div>
    </CardBody>
    </Card>

  </Container>
);

export default LiftHistory;
