import React from "react";


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
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown
} from "reactstrap";




import { MoreVertical, RefreshCw } from "react-feather";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

import avatar1 from "../../../assets/img/avatars/avatar.jpg";

import store from "../../../redux/store/index";
import Loader from "../../../components/Loader";

import PublicInfo from './PublicInfo'
import PrivateInfo from './PrivateInfo'

import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";
import User from "../../../components/Social/UserCard/User";
import { Link } from "react-router-dom";
import FollowingInit from "../../../components/Social/FollowingFeed/FollowingInit";
import {
  API_TIMELINE_ALL_USER,
  API_USER_PROFILES_FILTER,
  API_USER_FOLLOWING_MASTER_FILTER_OPEN,
  API_USER_FOLLOWING,
  API_USER_FOLLOWERS,
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';


class Default extends React.Component {



  render() {
    return       (

      <Card>
        <CardHeader>
          <div className="card-actions float-right">
            <span className="cursor-pointer mr-1">
              <RefreshCw />
            </span>{" "}
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle tag="a">
                <MoreVertical />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <CardTitle tag="h5" className="mb-0">
            Private info
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="1234 Main St"
              />
            </FormGroup>
            <FormGroup>
              <Label for="address2">Address 2</Label>
              <Input
                type="text"
                name="address2"
                id="address2"
                placeholder="Apartment, studio, or floor"
              />
            </FormGroup>


            <Button color="primary">Save changes</Button>
          </Form>
        </CardBody>
      </Card>

  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
