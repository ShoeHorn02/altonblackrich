import React from "react";
import { toastr } from "react-redux-toastr";
import Loader from "../../../components/Loader";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
} from "reactstrap";
import { userFirstLastName } from '../../../redux/actions/social';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import FirstNameLastName from '../../../components/Social/UserInfo/FirstNameLastName'

import {
  API_USER_PROFILES,
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';
import { loadUserSocial } from '../../../redux/actions/auth';




async function UpdatePublicInfo(userid, firstname,lastname, changeflag, toaster) {
  const result = await store.dispatch(userFirstLastName(userid, firstname,lastname));
  await store.dispatch(loadUserSocial());
  if (result.status === 200 || result.status === 201) {
      await toaster(firstname,lastname);
  }
 }



class Default extends React.Component {



  showToastr = (firstName, lastName) => {
    const options = {
      timeOut: parseInt(this.state.timeOut),
      showCloseButton: this.state.showCloseButton,
      progressBar: this.state.progressBar,
      position: this.state.position
    };

    const toastrInstance =
      this.state.type === "info"
        ? toastr.info
        : this.state.type === "warning"
        ? toastr.warning
        : this.state.type === "error"
        ? toastr.error
        : toastr.success;

    toastrInstance(
      this.state.title,
      this.state.message || "Successfully changed name to '" + firstName + ' ' + lastName + "'",
      options
    );
  }


  fetchInitial = () =>  {
    const user_id = this.props.user_status.pk
    axios.get(`${API_USER_PROFILES}${user_id}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_first_name : res.data.first_name,
        api_last_name : res.data.last_name,
        api_first_name_last_name_loading: false,
      });
      console.log(res.data)
    })
  }


  componentDidMount() {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
    }
    this.fetchInitial();
  }



  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    UpdatePublicInfo(
      this.props.user_status.pk,
      this.state.firstName,
      this.state.lastName,
      this.state.heading,
      this.showToastr
    );
  }

  handlerFirstNameChange = (val) => {
    this.setState({
      firstName: val
    })
  }

  handlerLastNameChange = (val) => {
    this.setState({
      lastName: val
    })
  }

  handlerHeadingChange = (val) => {
    this.setState({
      heading: val
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      heading: null,
      api_first_name: null,
      api_last_name: null,
      api_first_name_last_name_loading: true,

      title: "",
      message: "",
      type: "success",
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right"
    };
  }


  render() {
    if ( this.state.api_first_name_last_name_loading || this.state.api_heading_loading || this.props.user_status === null) {
      return <Loader />
    }

    return(

      <Card>
        <CardHeader className="mb-0 mr-sm-0 mb-sm-0">
          <CardTitle tag="h5">Name: <span className="text-muted">{this.props.user_status.first_name + ' ' + this.props.user_status.last_name}</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onSubmit}>

            <FirstNameLastName
              size = {"md"}
              first_name = {this.state.api_first_name}
              last_name = {this.state.api_last_name}
              firstname_change = {this.handlerFirstNameChange}
              lastname_change = {this.handlerLastNameChange}
              />

            <Button color="primary" >Update</Button>

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
