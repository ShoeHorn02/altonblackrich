import React from "react";
import Loader from "../../../components/Loader";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import BirthGenderLocation from './BirthGenderLocation'
import {
  API_USER_BIRTHDAY,
  API_USER_GENDER,
  API_USER_PROFILES,
  API_ONBOARDING_IMAGES
} from '../../../redux/actions/API';
import {
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';
import LayoutPicture from '../LayoutPicture';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();




class Default extends React.Component {

  fetchInitial = () =>  {
    axios.get(`${API_USER_BIRTHDAY}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_birthday: res.data,
        api_birthday_loading: false
      });
    });
    axios.get(`${API_USER_GENDER}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_gender: res.data,
        api_gender_loading: false
      });
    });
    axios.get(`${API_ONBOARDING_IMAGES}${"2"}`, keyConfig(store.getState)).then(res => {
      this.setState({
        background_photo: res.data[Math.floor(Math.random() * res.data.length)].cover_image,
        background_photo_loading: false
      });
    });
  }


  fetchValidation = () =>  {
    const user_id = this.props.user_status.pk
    axios.get(`${API_USER_PROFILES}${user_id}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_first_name : res.data.first_name,
        api_last_name : res.data.last_name,
        api_name_heading_loading: false,
      });
    })
  }


  handlerLoadUser = (val) => {
    this.setState({
      proceed: val
    })
  }


  handlerFormChange = (val) => {
    this.setState({
      form_change_flag: val
    })
  }

  componentDidMount() {
    console.log("a")
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
      this.setState({flag_userloaded: 1});
      console.log("b")
    }
    else if (this.props.user_status !== null) {
      this.fetchValidation();
      this.fetchInitial();
      console.log("c")
    }
  }



  position = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }),
      err => console.log(err),
      console.log('xxxxxxxxxxxxxxxxxxxxxx'),
      console.log(this.state.latitude)
    );
    console.log('xxxxxxxxxxxxxxxxxxxxxx')
    console.log(this.state.latitude)
  }






  componentDidUpdate() {
    console.log("1")
    if (this.props.user_status !== null && this.state.flag_userloaded === 1) {
      this.setState({flag_userloaded: 0});
      this.fetchValidation();
      this.fetchInitial();
      console.log("2")
    }
    else if (this.state.form_change_flag !== 0 && !this.state.api_birthday[0]) {
      this.fetchInitial();
      console.log("3")
    }
    else if (this.state.form_change_flag !== 0 && !this.state.api_gender[0]) {
      this.fetchInitial();
      console.log("4")
    }
//    else if ( (this.props.user_status !== null || !this.props.user_status) && this.props.user_status.onboarding_complete === false && this.state.api_birthday.length > 0 &&  this.state.api_gender.length > 0) {
//      store.dispatch(loadUser());
//      console.log("5")
//    }
    else if ( this.state.form_change_flag === 0 && (this.state.api_birthday.length > 0 ||  this.state.api_gender.length > 0)) {
      store.dispatch(loadUser());
      console.log("6")
    }
    else if ( this.state.api_birthday.length > 0 ||  this.state.api_gender.length > 0) {
      store.dispatch(loadUser());
      console.log("7")
    }

  }

  constructor(props) {
    super(props);
    this.state = {
      api_birthday: [],
      api_birthday_loading: true,
      api_gender: [],
      api_gender_loading: true,
      form_change_flag: 0,
      api_first_name: null,
      api_last_name: null,
      api_name_heading_loading: true,
      proceed: 0,
      latitude: null,
      longitude: null,
    };
  }


  render() {
    if ( this.props.user_status === null ||
      this.state.api_birthday_loading ===true||
      this.state.api_gender_loading === true ||
      this.state.api_name_heading_loading === true
    ) {
      return <Loader />;
    }
    else if ( this.state.api_first_name === null ||  this.state.api_last_name === null ){
      return <Redirect to="/onboarding/step1" />;
    }
    else if ( this.props.user_status.onboarding_complete === false && this.state.api_birthday.length > 0 &&  this.state.api_gender.length > 0) {
      return <Loader />;
    }
    else if ( this.state.api_birthday.length > 0 &&  this.state.api_gender.length > 0) {
      return <Redirect to="/onboarding/step3" />;
    }
    return (

      <div className="container-fullwidth m-0 p-0" style={{height: '100%', width: '100%', 'overflowX':'hidden', 'overflowY':'auto'}}>
      <Row className="min-vh-100" >

        <Col md="8" lg="6" xl="5" className="d-flex align-items-center" data-aos="fade-right" data-aos-delay="100">
        <div className="w-100 py-5 px-md-5 px-xl-6 position-relative" >
          <span className="float-right"> 2/4 </span>
          <div className="text-center mt-4" >
            <h1 className="h2">Making lifting awesome...</h1>
            <p className="lead text-center">
              Discover workouts and share progress
            </p>
          </div>
            <BirthGenderLocation change_flag = {this.handlerFormChange}/>
        </div>
        </Col>

        <Col md="4" lg="6" xl="7"  className="d-none d-md-block" data-aos="fade-left" data-aos-delay="100">
          <LayoutPicture background_photo={this.state.background_photo} />
        </Col>

      </Row>
</div>


    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Default);
