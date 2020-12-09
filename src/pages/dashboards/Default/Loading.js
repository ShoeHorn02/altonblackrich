import React from "react";


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



const Clients = () => (
  <Container fluid>
    <Header>
      <HeaderTitle>Dashboard</HeaderTitle>

      <Breadcrumb>
        <BreadcrumbItem active><Spinner color="light" type="grow" size="sm" className="mr-2" /></BreadcrumbItem>
      </Breadcrumb>
    </Header>


    <Card>
    <CardHeader>
      <CardTitle tag="h5">Getting Your Dashboard</CardTitle>
      <h6 className="card-subtitle text-muted">
        Hang on for a sec, we are doing some lifting...
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

export default Clients;
