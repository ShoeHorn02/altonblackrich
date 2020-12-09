import React from "react";
import {
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { connect } from 'react-redux';


class FirstNameLastName extends React.Component {

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if ( e.target.name === "firstName") {
      this.props.firstname_change(e.target.value)
    }
    if ( e.target.name === "lastName") {
      this.props.lastname_change(e.target.value)
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
  }


  render() {

    return (
      <div className="">
        <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">First name</Label>

                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  bsSize={this.props.size}
                  placeholder= "First Name"
                  onChange={this.onChange}
                  required
                  pattern="[a-zA-Z]+"
                  onInvalid="setCustomValidity('Please enter on alphabets only. ')"
                />

              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName">Last name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  bsSize={this.props.size}
                  placeholder= "Last Name"
                  onChange={this.onChange}
                  required
                  pattern="[a-zA-Z]+"
                  onInvalid="setCustomValidity('Please enter on alphabets only. ')"
                />
              </FormGroup>
            </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(FirstNameLastName);
