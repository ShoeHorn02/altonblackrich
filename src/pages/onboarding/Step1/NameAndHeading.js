import React from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
} from "reactstrap";
import {userFirstLastName } from '../../../redux/actions/social';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import FirstNameLastName from '../../../components/Social/UserInfo/FirstNameLastName'
import Heading from '../../../components/Social/UserInfo/Heading'


async function UpdatePublicInfo(userid, firstname,lastname, heading, change_flag) {
  await store.dispatch(userFirstLastName(userid, firstname,lastname));

  await change_flag(1)
 }


class Default extends React.Component {

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    UpdatePublicInfo(
      this.props.user_status.pk,
      this.state.firstName,
      this.state.lastName,
      this.state.heading,
      this.props.change_flag
    );
  }

  handlerFirstNameChange = (val) => {
    this.setState({
      firstName: val
    })
  }

  handlerLastNameChange = (val) => {
    this.setState({
      lastName: val
    })
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
    };
  }

  render() {
    const mystyle = {
      'box-shadow': '3px 3px 3px 3px #f2f2f2'
    };
    return (
      <Form onSubmit={this.onSubmit}>

        <Card className="ml-0 mr-0 pl-0 pr-0" style={mystyle}>
          <CardBody className="ml-0 mr-0 pl-0 pr-0">

            <div className="m-sm-4">

              <FirstNameLastName
              firstname_change = {this.handlerFirstNameChange}
              lastname_change = {this.handlerLastNameChange}
              size = {"lg"}
              first_name = {"First Name"}
              last_name = {"Last Name"}
              />

            </div>
          </CardBody>
        </Card>

        <Button color="primary" style={{float:'right'}}>Continue</Button>

      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Default);
