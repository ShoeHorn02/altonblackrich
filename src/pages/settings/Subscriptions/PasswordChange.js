import React from "react";
import { toastr } from "react-redux-toastr";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { acccountPasswordChange } from '../../../redux/actions/social';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";


async function UpdatePassword(current, password1,password2, formchange) {
  const result = await store.dispatch(acccountPasswordChange(current, password1,password2));
  await formchange(result)
 }


class Default extends React.Component {

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'current') {
      this.setState({myValueCurrent: e.target.value})
    }
    else if (e.target.name === 'password1') {
      this.setState({myValuePwd1: e.target.value})
    }
    else if (e.target.name === 'password2') {
      this.setState({myValuePwd2: e.target.value})
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    UpdatePassword(
      this.state.current,
      this.state.password1,
      this.state.password2,
      this.handlerGetResults
    );
  }

  handlerGetResults = (val) => {
    this.setState({
      result: val
    })
  }

  componentDidUpdate() {
    if (this.state.result !== null && this.state.result.response) {
      this.setState({
        result: null,
        success: [],
        errors: Object.keys(this.state.result.response.data).map(field => {
            return {field, message: this.state.result.response.data[field]};
          }),
      });
    }
    else if (this.state.result !== null && this.state.result.detail) {
      this.setState({
        result: null,
        errors: [],
        success: this.state.result.detail
      });
    this.clearData()
    this.showToastr()
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      current: null,
      password1: null,
      password2: null,
      title: "",
      message: "New password has been saved.",
      type: "success",
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right",
      result: null,
      errors: [],
      success: [],
      myValueCurrent: '',
      myValuePwd1: '',
      myValuePwd2: '',
    };
  }

  clearData(){
    this.setState({
      myValueCurrent: '',
      myValuePwd1: '',
      myValuePwd2: ''
    })
  }

  showToastr = (val) => {
    console.log(val)
    const options = {
      timeOut: parseInt(this.state.timeOut),
      showCloseButton: this.state.showCloseButton,
      progressBar: this.state.progressBar,
      position: this.state.position,
    };

    const toastrInstance = toastr.success;

    toastrInstance(
      this.state.title,
      this.state.message,
      options
    );
  }

  renderCurrentPwd = () => {
    if (this.state.errors.length > 0 && this.state.errors[0].field === "old_password") {
      return(
        <FormGroup>
          <Label>Current Password </Label>
          <Input required value={this.state.myValueCurrent} type="password" name="current" placeholder="Type Your Current Password" onChange={this.onChange} className="border-danger"/>
          <p className="text-danger">{this.state.errors[0].message[0] === "Invalid password" ? "Your current password is invalid" : this.state.errors[0].message[0]} </p>
        </FormGroup>
      )
    }
    return(
      <FormGroup>
        <Label>Current Password </Label>
        <Input required value={this.state.myValueCurrent} type="password" name="current" placeholder="Type Your Current Password" onChange={this.onChange} />
      </FormGroup>
    )
  }

  renderNewPwd = () => {
    if (this.state.errors.length > 0 && (this.state.errors[0].field === "new_password1" || this.state.errors[0].field === "new_password2")) {
      return(
        <FormGroup>
          <Label>New Password</Label>
          <Input required value={this.state.myValuePwd1} type="password" name="password1" placeholder="Type Your New Password" onChange={this.onChange} className="border-danger"/>
        </FormGroup>
      )
    }
    return(
      <FormGroup>
        <Label>New Password</Label>
        <Input required value={this.state.myValuePwd1} type="password" name="password1" placeholder="Type Your New Password" onChange={this.onChange}/>
      </FormGroup>
    )
  }

  renderNewPwdConfirm = () => {
    if (this.state.errors.length > 0 && (this.state.errors[0].field === "new_password1" || this.state.errors[0].field === "new_password2")) {
      return(
        <FormGroup>
          <Label>Confirm New Password</Label>
          <Input requried value={this.state.myValuePwd2} type="password" name="password2" placeholder="Comfirm Your New Password" onChange={this.onChange} className="border-danger"/>
          <p className="text-danger">{this.state.errors[0].message[0]} </p>
        </FormGroup>
      )
    }
    return(
      <FormGroup>
        <Label>Confirm New Password</Label>
        <Input required value={this.state.myValuePwd2} type="password" name="password2" placeholder="Comfirm Your New Password" onChange={this.onChange}/>
      </FormGroup>
    )
  }

  render() {
    return(
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Change Password</CardTitle>
          <h6 className="card-subtitle text-muted">
            Keep your account secure and change your password here.
          </h6>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onSubmit}>
            {this.renderCurrentPwd()}
            {this.renderNewPwd()}
            {this.renderNewPwdConfirm()}
            <Button color="primary">Submit</Button>
          </Form>
              {this.state.success ?
                <p className="pt-1 text-success"> {this.state.success}</p>
                :
                null
              }
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
