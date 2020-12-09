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
  FormGroup,
  CustomInput,
} from "reactstrap";
import { postProfileMeasurement } from '../../../redux/actions/social';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import { loadUser } from '../../../redux/actions/auth';
import { loadUserSocial } from '../../../redux/actions/auth';



async function UpdatePublicInfo(userid, is_imperial, toaster) {
  const result = await store.dispatch(postProfileMeasurement(userid, is_imperial));
  await store.dispatch(loadUserSocial());
  if (result.status === 200 || result.status === 201) {
      await toaster(is_imperial);
  }
 }



class Default extends React.Component {


  showToastr = (heading) => {
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
      this.state.message || "Successfully updated measurement type",
      options
    );
  }

  componentDidMount() {
      if (this.props.user_status === null) {
        store.dispatch(loadUser());
      }
    }


  onChange = (e) => {

    console.log(e.target.name)
    console.log(this.state.is_imperial)
    console.log(e.target.value)
    if ( e.target.name === "customRadio2") {
      this.setState({ is_imperial: false })
    }
    else if ( e.target.name === "customRadio1") {
      this.setState({ is_imperial: true })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    UpdatePublicInfo(
      this.props.user_status.pk,
      this.state.is_imperial,
      this.showToastr
    );
  }



  constructor(props) {
    super(props);
    this.state = {
      is_imperial: this.props.user_status.usa_imperial,

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
    if ( this.props.user_status === null) {
      return <Loader />
    }
    else if ( this.state.change_flag === 1) {
      return <Loader />
    }

    return(

      <Card>
        <CardHeader className="mb-0 mr-sm-0 mb-sm-0">
          <CardTitle tag="h5">Measurement Type: <span className="text-muted">{this.props.user_status.usa_imperial? 'Imperial (lbs, oz)' : 'Metric (Kilograms)'}</span></CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onSubmit}>

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
