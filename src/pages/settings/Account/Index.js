import React from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { connect } from 'react-redux';

import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";
import { Link } from "react-router-dom";
import Navigation from '../Navigation';
import Name from './Name'
import Birthday from './Birthday'
import Gender from './Gender'
import Photo from './Photo'
import Location from './Location'
import Imperial from './Imperial'

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
            <BreadcrumbItem active>Account</BreadcrumbItem>
          </Breadcrumb>
        </Header>

        <Row>
          <Col md="3" xl="2">
            <Navigation activeName = {"account"}/>
          </Col>
          <Col md="9" xl="10">
            <Photo />
            <Name />
            <Imperial />
            <Gender />
            <Birthday />
            <Location />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {  })(Default);
