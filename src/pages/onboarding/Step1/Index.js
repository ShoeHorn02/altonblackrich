import React from "react";
import Loader from "./Loader";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import NameAndHeading from './NameAndHeading'
import {
  API_USER_PROFILES,
  API_ONBOARDING_IMAGES,
} from '../../../redux/actions/API';
import {
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';
import LayoutPicture from '../LayoutPicture';
import { postuserIP } from '../../../redux/actions/social';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

async function PostIPAddress(userid, ip_address) {
  await store.dispatch(postuserIP(userid, ip_address));
 }



class Default extends React.Component {

  fetchInitial = () =>  {
    const user_id = this.props.user_status.pk
    axios.get(`${API_USER_PROFILES}${user_id}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_first_name : res.data.first_name,
        api_last_name : res.data.last_name,
        api_name_heading_loading: false,
      });
      console.log(res.data)
    })
    axios.get(`${API_ONBOARDING_IMAGES}${"1"}`, keyConfig(store.getState)).then(res => {
      this.setState({
        background_photo: res.data[Math.floor(Math.random() * res.data.length)].cover_image,
        background_photo_loading: false
      });
    });
  }



  getGeoInfo = async () => {
    const publicIp = await require('public-ip');
    const ipv4 = await publicIp.v4()
    await PostIPAddress(this.props.user_status.pk, ipv4)
    console.log("geo")
  };



  handlerFormChange = (val) => {
    console.log('change')
    console.log(val)
    this.setState({
      form_change_flag: val
    })
  }



  componentDidMount = async() => {
    console.log("1")
    if (this.props.user_status === null) {
      await store.dispatch(loadUser());
      await this.setState({flag_userloaded: 1});
      console.log("2")
    }
    else if (this.props.user_status !== null) {
      this.fetchInitial();
      this.getGeoInfo();
      console.log("3")
    }
    document.body.style.overflow = 'overflow';
  }

  componentDidUpdate() {
    if (this.state.form_change_flag !== 0 && (this.state.api_first_name === "" || this.state.api_last_name === "")) {
      this.fetchInitial();
      console.log("a")
    }
    else if (this.props.user_status !== null && this.state.flag_userloaded === 1) {
      this.setState({flag_userloaded: 0});
      this.fetchInitial();
      this.getGeoInfo();
      console.log("b")
    }
  }








  constructor(props) {
    super(props);
    this.state = {
      api_name_heading_loading: true,
      api_first_name: null,
      api_last_name: null,
      background_photo: [],
      background_photo_loading: true,
      form_change_flag: 0,
      flag_userloaded: 0
    };
  }



  render() {
    if ( this.props.user_status === null ||
      this.state.api_name_heading_loading === true ||
      this.state.background_photo_loading === true
    ) {
      return < Loader />;
    }
    else if (this.state.api_first_name !== "" && this.state.api_last_name !== "") {
      return <Redirect to="/onboarding/step2" />;
    }
    return (

      <div className="container-fullwidth m-0 p-0" style={{height: '100%', width: '100%', 'overflow-x':'hidden', 'overflow-y':'auto'}}>
      <Row className="min-vh-100">
        <Col md="4" lg="6" xl="7"  className="d-none d-md-block" data-aos="fade-right" data-aos-delay="100">
          <LayoutPicture background_photo={this.state.background_photo} />
        </Col>
        <Col md="8" lg="6" xl="5" className="d-flex align-items-center customBackgroundAuth m-0 p-0" data-aos="fade-left" data-aos-delay="100">
          <div>
            <div className="row float-right text-right mr-5 pr-5">
              <p>1/4</p>
            </div>

          <div className="w-100 py-5 px-md-5 px-xl-6 position-relative" >
            <div className="text-center mt-4" >
              <h1 className="h2">Listen Bucko...</h1>

              <p className="lead text-center">
              Some quick stuff, we promise!
              </p>
            </div>
            <NameAndHeading change_flag = {this.handlerFormChange}/>
            </div>
          </div>
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
