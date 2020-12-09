import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/auth';
import { createMessage } from '../../redux/actions/messages';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";



import {
  Button,
  Card,
  CardBody,
  FormGroup
} from "reactstrap";

import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


export class SignUp extends Component {


  render() {
    const mystyle = {
      background:"none",
     "justifyContent":"center"
    };
    return(
      <React.Fragment >
      <div className="text-center mt-4">
        <h1 className="h2">Get Lifting</h1>
        <p className="lead">
          Start creating the best possible body changing experience for yourself
        </p>
      </div>
        <Card style={mystyle} className="align-middle">
        <CardBody >


        <FormGroup className="form-group customSocial_btn_btn">
          <Button color="facebook" size="lg" type="submit" className="mr-1 btn-block">
            <FontAwesomeIcon icon={faFacebook} className="align-middle float-left" />{" "}
            Sign up in using <b>Facebook</b>
          </Button>
        </FormGroup>



        <FormGroup className="form-group customSocial_btn_btn">
          <Button color="google" size="lg" type="submit" className="mr-1 btn-block">
          <FontAwesomeIcon icon={faGoogle} className="align-middle float-left" />{" "}
            Sign up using <b>Google</b>
          </Button>
        </FormGroup>

        <div className="customSeperator"><i style={mystyle}>or</i></div>

                    <Button
                      color="primary"
                      htmltype="submit"
                      size="lg"
                      className="btn-block"
                      style={{"justifyContent":"space between"}}
                      tag={Link}
                      to="/auth/sign-up"
                      rel="noreferrer noopener"
                    >
                    <FontAwesomeIcon icon={faEnvelope} className="align-middle float-left" />{" "}
                    Sign up using email
                    </Button>




        </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(SignUp);
