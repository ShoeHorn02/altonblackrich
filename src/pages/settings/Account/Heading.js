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
import { postProfileHeading } from '../../../redux/actions/social';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import Heading from '../../../components/Social/UserInfo/Heading'
import { loadUser } from '../../../redux/actions/auth';
import { loadUserSocial } from '../../../redux/actions/auth';



async function UpdatePublicInfo(userid, heading, toaster) {
  const result = await store.dispatch(postProfileHeading(userid, heading));
  await store.dispatch(loadUserSocial());
  if (result.status === 200 || result.status === 201) {
      await toaster(heading);
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
      this.state.message || "Successfully changed profile heading to '" + heading + "'",
      options
    );
  }



    componentDidMount() {
      if (this.props.user_status === null) {
        store.dispatch(loadUser());
      }
    }






  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    UpdatePublicInfo(
      this.props.user_status.pk,
      this.state.heading,
      this.showToastr
    );
  }




  handlerHeadingChange = (val) => {
    this.setState({
      heading: val
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      heading: null,
      api_heading: null,


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
          <CardTitle tag="h5">Heading:</CardTitle>
          <h6 className="card-subtitle text-muted">
            {this.props.user_status.profile_heading}
          </h6>
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.onSubmit}>

            <Heading
            heading_change = {this.handlerHeadingChange}
            heading = {this.props.user_status.profile_heading}
            size = {"md"}
            title = {"Say something that will grap attention"}
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
