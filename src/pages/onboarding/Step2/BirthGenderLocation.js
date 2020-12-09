import React from "react";
import Loader from "../../../components/Loader";
import {
  Button,
  Card,
  CardBody,
  Form,
} from "reactstrap";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import Location from '../../../components/Social/UserInfo/Location'
import Birthday from '../../../components/Social/UserInfo/Birthday'
import Gender from '../../../components/Social/UserInfo/Gender'
import { postBirthday, postGender, postProfileLocation } from '../../../redux/actions/social';
import { loadUser, onboardComplete } from '../../../redux/actions/auth';


async function UpdatePublicInfo(userid, birthMonth,birthYear, gender, changeflag) {
  await store.dispatch(postBirthday(userid, birthMonth,birthYear));
  await store.dispatch(postGender(userid, gender));
  await store.dispatch(onboardComplete(userid,"true"))
  await store.dispatch(loadUser())
  await changeflag(1)
 }

 async function UpdatePublicInfoLocation(userid, birthMonth,birthYear, gender, location, changeflag) {
   await store.dispatch(postBirthday(userid, birthMonth,birthYear));
   await store.dispatch(postGender(userid, gender));
   await store.dispatch(postProfileLocation(userid, location));
   await store.dispatch(onboardComplete(userid,"true"))
   await store.dispatch(loadUser())
   await changeflag(1)
  }

class BirthGenderLocation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      birthMonth: 1,
      birthYear: 85,
      gender: 3,
      location: null,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.location === null) {
      UpdatePublicInfo(
        this.props.user_status.pk,
        this.state.birthMonth,
        this.state.birthYear,
        this.state.gender,
        this.props.change_flag);
    }
    else if (this.state.location !== null) {
      UpdatePublicInfoLocation(
        this.props.user_status.pk,
        this.state.birthMonth,
        this.state.birthYear,
        this.state.gender,
        this.state.location,
        this.props.change_flag);
    }

  }

  handlerBirthMonthChange = (val) => {
    this.setState({
      birthMonth: val
    })
  }

  handlerBirthYearChange = (val) => {
    this.setState({
      birthYear: val
    })
  }

  handlerGenderChange = (val) => {
    this.setState({
      gender: val
    })
  }

  handlerLocationChange = (val) => {
    this.setState({
      location: val
    })
  }

  render() {
    const mystyle = {
      'box-shadow': '3px 3px 3px 3px #f2f2f2'
    };
    if ( this.props.user_status === null) {
      return <Loader />
    }
      return (
        <Form onSubmit={this.onSubmit}>
          <Card className="ml-0 mr-0 pl-2 pr-2" style={mystyle}>
            <CardBody className="ml-0 mr-0 pl-0 pr-0">
              <div className="m-sm-4">
                <Birthday
                  birthmonth_change = {this.handlerBirthMonthChange}
                  birthyear_change = {this.handlerBirthYearChange}
                />
                <Gender
                  gender_change={this.handlerGenderChange}
                />
                <Location
                  location_change={this.handlerLocationChange}
                />
              </div>
            </CardBody>
          </Card>
        <Button size="md" color="primary" style={{float:'right'}}>Continue</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(BirthGenderLocation);
