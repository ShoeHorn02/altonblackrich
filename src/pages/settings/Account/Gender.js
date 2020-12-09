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
import Gender from '../../../components/Social/UserInfo/Gender'

import {
  API_USER_GENDER,
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';
import { postGender,  } from '../../../redux/actions/social';


async function UpdatePublicInfo(userid, gender, changeflag, toaster) {
  const result = await store.dispatch(postGender(userid, gender));
  await changeflag(1)
  if (result.status === 200 || result.status === 201) {
      await toaster(gender);
  }
 }


class Default extends React.Component {


  showToastr = (gender) => {
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
      this.state.message || "Successfully updated profile gender",
      options
    );
  }

  fetchInitial = () =>  {
    axios.get(`${API_USER_GENDER}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_gender : res.data[0],
        api_gender_loading: false,
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
      this.state.gender,
      this.handlerChangeFlag,
      this.showToastr
    );
  }


  handlerChangeFlag = (val) => {
    this.setState({
      form_change_flag: val
    })
  }



  handlerGenderChange = (val) => {
    this.setState({
      gender: val
    })
  }



  constructor(props) {
    super(props);
    this.state = {
      gender: null,
      birthYear: null,
      api_gender: [],
      api_gender_loading: true,

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
    if ( this.state.api_gender_loading ||  this.props.user_status === null) {
      return <Loader />
    }

    return(

      <Card>
        <CardHeader className="mb-0 mr-sm-0 mb-sm-0">
          <CardTitle tag="h5">Gender: <span className="text-muted">{this.state.api_gender.gender_normal}</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onSubmit}>

          <Gender
            gender_change={this.handlerGenderChange}
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
