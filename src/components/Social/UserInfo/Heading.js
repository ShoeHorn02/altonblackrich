import React from "react";
import {
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { connect } from 'react-redux';


class Heading extends React.Component {

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if ( e.target.name === "heading") {
      this.props.heading_change(e.target.value)
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
  }


  render() {

    return (
      <FormGroup>
        <Label for="inputBio">{this.props.title? this.props.title : "Heading" }</Label>
        <Input
          type="text"
          rows="2"
          id="inputBio"
          name="heading"
          onChange={this.onChange}
          bsSize={this.props.size}
          required
          placeholder="Say something that will grab attention"
        />
      </FormGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Heading);
