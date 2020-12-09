import React from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { connect } from 'react-redux';

import PasswordChange from './PasswordChange'
import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";
import { Link } from "react-router-dom";
import Navigation from '../Navigation';


class Default extends React.Component {

  render() {
    return(
      <Container fluid>
      <Header>
        <HeaderTitle>Settings</HeaderTitle>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link >Settings</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Password</BreadcrumbItem>
        </Breadcrumb>
      </Header>

        <Row>
          <Col md="3" xl="2">
            <Navigation activeName = {"password"}/>
          </Col>
          <Col md="9" xl="10">
            <PasswordChange />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {  })(Default);
