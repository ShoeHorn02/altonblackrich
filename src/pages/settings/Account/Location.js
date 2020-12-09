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
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import Location from '../../../components/Social/UserInfo/Location'

import {
  API_USER_PROFILES,
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';
import { postProfileLocation,  } from '../../../redux/actions/social';


async function UpdatePublicInfo(userid, location, changeflag, toaster) {
  const result = await store.dispatch(postProfileLocation(userid, location));
  await changeflag(1)
  if (result.status === 200 || result.status === 201) {
      await toaster(location);
  }
 }


class Default extends React.Component {


  showToastr = (location) => {
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
      this.state.message || "Successfully updated profile location",
      options
    );
  }

  fetchInitial = () =>  {
    const user_id = this.props.user_status.pk
    axios.get(`${API_USER_PROFILES}${user_id}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_user_location : res.data.location_city_std,
        api_user_location_loading: false,
        form_change_flag: 0,
      });
    })
  }


  componentDidMount() {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
    }
    this.fetchInitial();
  }


  componentDidUpdate() {
    if (this.state.form_change_flag !== 0) {
      this.fetchInitial();
      this.setState({
        form_change_flag: 0,
      });
    }
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    UpdatePublicInfo(
      this.props.user_status.pk,
      this.state.location,
      this.handlerChangeFlag,
      this.showToastr
    );
  }



  handlerChangeFlag = (val) => {
    this.setState({
      form_change_flag: val
    })
  }



    handlerLocationChange = (val) => {
      this.setState({
        location: val
      })
    }



  constructor(props) {
    super(props);
    this.state = {
      location: null,
      form_change_flag:0,
      api_user_location: [],
      api_user_location_loading: true,

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
    if ( this.state.api_user_location_loading ||  this.props.user_status === null) {
      return <Loader />
    }

    return(

      <Card>
        <CardHeader className="mb-0 mr-sm-0 mb-sm-0">
          <CardTitle tag="h5">Location:<span className="text-muted"> {this.state.api_user_location}</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onSubmit}>

          <Location
            location_change={this.handlerLocationChange}
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
