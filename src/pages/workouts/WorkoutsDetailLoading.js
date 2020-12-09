import React from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner
} from "reactstrap";

import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";

const WorkoutsDetailLoading = () => (
  <Container fluid>
    <Header >
      <HeaderTitle>
        <Spinner color="dark" type="grow" size="sm" className="mr-2" />
          <Spinner
            color="primary"
            type="grow"
            size="sm"
            className="mr-2"
          />
      </HeaderTitle>
      <Breadcrumb>
      <BreadcrumbItem>
        <Link to="/dashboard">Dashboard</Link>
      </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/workouts">Workouts</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Detail</BreadcrumbItem>
        <BreadcrumbItem active>
          <Spinner color="dark" type="grow" size="sm" className="mr-2" />
            <Spinner
              color="primary"
              type="grow"
              size="sm"
              className="mr-2"
            />
        </BreadcrumbItem>
      </Breadcrumb>
    </Header>


    <Row>
      <Col xs="12" className="col-xxl-3">
        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0">
            <Spinner color="dark" type="grow" size="sm" className="mr-2" />
              <Spinner
                color="primary"
                type="grow"
                size="sm"
                className="mr-2"
              />
            </CardTitle>
          </CardHeader>


        </Card>


      </Col>

      <Col xs="12" className="col-xxl-9">

        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0">
            <Spinner color="dark" type="grow" size="sm" className="mr-2" />
              <Spinner
                color="primary"
                type="grow"
                size="sm"
                className="mr-2"
              />
            </CardTitle>
          </CardHeader>

        </Card>



      </Col>

    </Row>

  </Container>
);

export default WorkoutsDetailLoading;
