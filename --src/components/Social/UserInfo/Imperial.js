import React from "react";
import {
  FormGroup,
  Input,
  Label,
  CustomInput
} from "reactstrap";
import { connect } from 'react-redux';


class MeasureType extends React.Component {

  onChange = (e) => {
    //this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name)
    console.log(this.props.is_imperial)
    console.log(e.target.value)
    if ( e.target.name === "customRadio2") {
      this.props.measure_change(false)
    }
    else if ( e.target.name === "customRadio1") {
      this.props.measure_change(true)
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  constructor(props) {
    super(props);
    this.state = {
      is_imperial: this.props.is_imperial,
    };
  }

  render() {

    return (
      <FormGroup>
      <CustomInput
        type="radio"
        id="exampleCustomRadio1"
        name="customRadio1"
        label="Imperial (i.e: lbs, oz)"
        className="mb-2"
        checked={this.state.is_imperial === true}
        onChange={this.onChange}
      />
      <CustomInput
        type="radio"
        id="exampleCustomRadio2"
        name="customRadio2"
        label="Metric (i.e. kg, g)"
        className="mb-2"
        checked={this.state.is_imperial === false}
        onChange={this.onChange}
      />
      </FormGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(MeasureType);
