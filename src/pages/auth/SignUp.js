import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../redux/actions/auth';
import { createMessage } from '../../redux/actions/messages';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pattern1 from "./pattern-1.svg"

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

import {
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";


export class SignUp extends Component {


  state = {
    email: '',
    password1: '',
    password2: '',
    result: null,
    errors: []
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { email, password1, password2 } = await this.state;
      const newUser = await {password1, password2, email};
      const result = await this.props.register(newUser);
      await this.setState({ result: result })
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });



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
  }



  renderEmail = (email) => {
    if (this.state.errors.length > 0 && this.state.errors[0].field === "email") {
      return(
        <FormGroup className="form-group">
          <Label>Email Address</Label>
          <Input bsSize="lg" type="email" name="email" placeholder="Email Address" component={this.renderField} onChange={this.onChange} value={email} required className="border-danger"/>
          <p className="text-danger">{this.state.errors[0].message[0] === "Invalid password" ? "Your current password is invalid" : this.state.errors[0].message[0]} </p>
        </FormGroup>
      )
    }
    return(
      <FormGroup className="form-group">
        <Label>Email Address</Label>
        <Input bsSize="lg" type="email" name="email" placeholder="Email Address" component={this.renderField} onChange={this.onChange} value={email} required/>
      </FormGroup>
    )
  }

  renderNewPwd = (password1) => {
    if (this.state.errors.length > 0 && (this.state.errors[0].field === "password1" || this.state.errors[0].field === "password2" || this.state.errors[0].field === "non_field_errors")) {
      return(
        <FormGroup className="form-group">
          <Label>Password</Label>
          <Input bsSize="lg" type="password" name="password1" placeholder="Password" component={this.renderField} onChange={this.onChange} value={password1} required className="border-danger"/>
        </FormGroup>
      )
    }
    return(
      <FormGroup className="form-group">
        <Label>Password</Label>
        <Input bsSize="lg" type="password" name="password1" placeholder="Password" component={this.renderField} onChange={this.onChange} value={password1} required/>
      </FormGroup>
    )
  }




  renderNewPwdConfirm = (password2) => {
    if (this.state.errors.length > 0 && (this.state.errors[0].field === "password1" || this.state.errors[0].field === "password2" || this.state.errors[0].field === "non_field_errors")) {
      return(
        <FormGroup className="form-group">
          <Label>Confirm Your Password</Label>
          <Input bsSize="lg" type="password" name="password2" placeholder="Confirm Your Password" component={this.renderField} onChange={this.onChange} value={password2} required className="border-danger"/>
          <p className="text-danger">{this.state.errors[0].message[0]} </p>
        </FormGroup>
      )
    }
    return(
      <div>
      <FormGroup className="form-group mb-0">
        <Label>Confirm Your Password</Label>
        <Input bsSize="lg" type="password" name="password2" placeholder="Confirm Your Password" component={this.renderField} onChange={this.onChange} value={password2} required />
      </FormGroup>
      </div>
    )
  }


  renderMemo = () => {
    return(
      <div className="text-center mt-0">
        <p className="lead text-sm text-muted text-center">
          By signing up for you agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    )
  }



  render() {
    if (this.props.user) {
      return <Redirect to="/workouts/Home" />;
    }
    else if (this.props.isAuthenticated) {
      return <Redirect to="/onboarding/step1" />;
    }
    const { email, password1, password2 } = this.state;
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center" style={{'background':'#113261', "background-image": `url(${pattern1})`}}>

      <div >
        <div className="row float-right text-right mr-5 pr-5">
          <Link to="/">
            <p className="customClose text-danger"/>
          </Link>
        </div>

        <div className="text-center mt-4">
          <h1 className="h2 text-light">Sign Up</h1>
          <p className="lead text-light">
          Make the most of your lifting experience
          </p>
        </div>

        <Form onSubmit={this.onSubmit}>
          <Card className="ml-1 mr-1 pl-0 pr-0">
            <CardBody className="ml-0 mr-0 pl-2 pr-2">
              <div className="m-sm-4">

                {this.renderEmail(email)}
                {this.renderNewPwd(password1)}
                {this.renderNewPwdConfirm(password2)}

                  <div className="text-center mt-3">
                    <Button color="primary" htmltype="submit" size="lg" className="mr-1 btn-block">
                      Get Lifting
                    </Button>
                  </div>


                <div className="customSeperator"><i>or</i></div>

                  <FormGroup className="form-group customSocial_btn_btn">
                    <Button color="facebook" size="lg" type="submit" className="mr-1 btn-block" icon="facebook">
                    <FontAwesomeIcon icon={faFacebook} className="align-middle float-left" />{" "}
                      Join with <b>Facebook</b>
                    </Button>
                  </FormGroup>

                  <FormGroup className="form-group customSocial_btn_btn">
                    <Button color="google" size="lg" type="submit" className="mr-1 btn-block" >
                    <FontAwesomeIcon icon={faGoogle} className="align-middle float-left" />{" "}
                      Join with <b>Google</b>
                    </Button>
                  </FormGroup>

                  {this.renderMemo()}
              </div>

            </CardBody>
          </Card>
        </Form>

        <div className="text-center mt-4">
          <p className="lead  text-muted text-center text-dark">
            Already have an account? &nbsp;
            <Link to="/auth/sign-in">

                    Log in!

            </Link>
          </p>
        </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.error) {
    errors = Object.keys(state.auth.error).map(field => {
      return {field, message: state.auth.error[field]};
    });
  }
  return {
    errors,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, { register, createMessage })(SignUp);
