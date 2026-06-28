import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../redux/actions/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pattern1 from "./pattern-1.svg"

import {
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";


import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";




export class SignIn extends Component {


  state = {
    email: '',
    password: '',
    result: null,
    errors: []
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const result = await this.props.login(this.state.email, this.state.password);
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
      if (this.state.errors.length > 0 ) {
        return(
          <FormGroup className="form-group">
            <Label>Email Address</Label>
            <Input bsSize="lg" type="email" name="email" placeholder="Email Address" component={this.renderField} onChange={this.onChange} value={email} required className="border-danger"/>
          </FormGroup>
        )
      }
      return(
        <FormGroup className="form-group">
          <Label>Email Address</Label>
          <Input bsSize="lg" type="email" name="email" placeholder="Email Address" component={this.renderField} onChange={this.onChange} value={email} />
        </FormGroup>
      )
    }

    renderPwd = (password) => {
      if (this.state.errors.length > 0 ) {
        return(
          <FormGroup className="form-group">
            <Label>Password</Label>
            <Input bsSize="lg" type="password" name="password" placeholder="Password" onChange={this.onChange} value={password} required className="border-danger"/>
            <p className="text-danger">{this.state.errors[0].message[0]} </p>
          </FormGroup>
        )
      }
      return(
        <FormGroup className="form-group">
          <Label>Password</Label>
          <Input bsSize="lg" type="password" name="password" placeholder="Password" onChange={this.onChange} value={password} required autoComplete="on"/>
        </FormGroup>
      )
    }


    renderForgotPwd = () => {
      return(
        <small>
          <Link to="/auth/reset-password">Forgot password?</Link>
        </small>
      )
    }





  renderMemo = () => {
    return(
      <div className="text-center mt-0">
        <p className="lead text-sm text-muted text-center">
          By signing up you agree to the Terms and Conditions and Privacy Policy.
        </p>
      </div>
    )
  }



  render() {
    if (this.props.user) {
      return <Redirect to="/dashboard" />;
    }
    else if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    const { email, password } = this.state;
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center" style={{'background':'#113261', "background-image": `url(${pattern1})`}}>

      <div >
        <div className="row float-right text-right mr-5 pr-5">
          <Link to="/">
            <p className="customClose text-danger"/>
          </Link>
        </div>

        <div className="text-center mt-4">
          <h1 className="h2 text-light">Log In</h1>
          <p className="lead text-light">
          Sign in to your account to continue
          </p>
        </div>

        <Form onSubmit={this.onSubmit}>
          <Card className="ml-0 mr-0 pl-0 pr-0">
            <CardBody className="ml-0 mr-0 pl-2 pr-2">
              <div className="m-sm-4">

                {this.renderEmail(email)}
                {this.renderPwd(password)}


                <div className="text-center mt-3">
                  <Button color="primary" htmltype="submit" size="lg" className="mr-1 btn-block">
                    Log in using email
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
          <p className="lead  text-muted text-center">
            Don't have an account? &nbsp;
            <Link to="/auth/sign-up">

                     Sign Up!

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


export default connect(mapStateToProps, { login })(SignIn);
