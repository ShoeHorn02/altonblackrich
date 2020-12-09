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
import Birthday from '../../../components/Social/UserInfo/Birthday'

import {
  API_USER_BIRTHDAY,
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';
import { postBirthday,  } from '../../../redux/actions/social';


async function UpdatePublicInfo(userid, birthMonth,birthYear, changeflag, toaster) {
  const result = await store.dispatch(postBirthday(userid, birthMonth,birthYear));
  await changeflag(1)
  if (result.status === 200 || result.status === 201) {
      await toaster(birthMonth, birthYear);
  }
 }


class Default extends React.Component {

  showToastr = (birthMonth, birthYear) => {
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
      this.state.message || "Successfully updated profile birtday",
      options
    );
  }



  fetchInitial = () =>  {
    axios.get(`${API_USER_BIRTHDAY}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_birthday : res.data[0],
        api_birthday_loading: false,
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
      this.state.birthMonth,
      this.state.birthYear,
      this.handlerChangeFlag,
      this.showToastr
    );
  }


  handlerChangeFlag = (val) => {
    this.setState({
      form_change_flag: val
    })
  }


  handlerBirthYearChange = (val) => {
    this.setState({
      birthYear: val
    })
  }

  handlerBirthMonthChange = (val) => {
    this.setState({
      birthMonth: val
    })
  }

  handlerBirthYearChange = (val) => {
    this.setState({
      birthYear: val
    })
  }



  constructor(props) {
    super(props);
    this.state = {
      birthMonth: null,
      birthYear: null,
      api_birthday: [],
      api_birthday_loading: true,

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
    if ( this.state.api_birthday_loading ||  this.props.user_status === null) {
      return <Loader />
    }

    return(

      <Card>
        <CardHeader className="mb-0 mr-sm-0 mb-sm-0">
          <CardTitle tag="h5">Birthday:<span className="text-muted"> {this.state.api_birthday.birthday_normal}</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onSubmit}>

            <Birthday
              size = {"md"}
              currentbirthMonth = {this.state.api_birthday.month_normal}
              currentbirthYear = {this.state.api_birthday.year_normal}
              birthmonth_change = {this.handlerBirthMonthChange}
              birthyear_change = {this.handlerBirthYearChange}
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
