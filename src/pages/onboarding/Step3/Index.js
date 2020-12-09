import React from "react";
import Loader from "./Loader";
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import {
  API_ONBOARDING_IMAGES
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';
import User from '../../../components/Social/UserCard/User';
import LayoutPicture from '../LayoutPicture';
import {
  Row,
  Col,
} from "reactstrap";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

class Default extends React.Component {

  fetchInitial = () =>  {
    axios.get(`${API_ONBOARDING_IMAGES}${"1"}`, keyConfig(store.getState)).then(res => {
      this.setState({
        background_photo: res.data[Math.floor(Math.random() * res.data.length)].cover_image,
        background_photo_loading: false
      });
    });
  }



  handlerPhotoChange = (val) => {
    this.setState({
      change_flag_photo: val
    })
  }

  componentDidMount() {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
    }
    this.fetchInitial();
  }


  componentDidUpdate() {
    if (this.state.change_flag_photo !== 0) {
      this.setState({
        avatar_image: 1,
        change_flag_photo: 0,
      })

    }

  }

  constructor(props) {
    super(props);
    this.state = {
      change_flag_photo: 0,
      avatar_image: null,
    };
  }



  render() {
    const mystyle = {
      'box-shadow': '3px 3px 3px 3px #f2f2f2'
    };
    if ( this.props.user_status === null ) {
      return <Loader />
    }
    else if (!this.props.user_status.onboarding_complete) {
      return <Redirect to="/onboarding/step1" />;
    }
    else if ( this.state.avatar_image !== null ) {
      return <Redirect to="/workouts/Home" />;
    }
    return (
      <div className="container-fullwidth m-0 p-0" style={{height: '100%', width: '100%', 'overflowX':'hidden', 'overflowY':'auto'}}>
      <Row className="min-vh-100" >
        <Col md="4" lg="6" xl="7"  className="d-none d-md-block" data-aos="fade-right" data-aos-delay="100">
          <LayoutPicture background_photo={this.state.background_photo} />
        </Col>
        <Col md="8" lg="6" xl="5" className="d-flex align-items-center" data-aos="fade-left" data-aos-delay="100">


              <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
                <span className="float-right"> 3/4 </span>
                <div className="text-center mt-4"  >
                  <h1 className="h2">Upload A Profile Picture...</h1>
                  <p className="lead text-center">
                    And share your lifing progression
                  </p>
                </div>
                  <User
                    username={this.props.user_status.username}
                    avatar_color={this.props.user_status.avatar_color}
                    avatar_letter={this.props.user_status.avatar_letter}
                    email_lower={this.props.user_status.email_lower}
                    avatar_image={this.props.user_status.avatar_image}
                    photo_change_flag = {this.handlerPhotoChange}
                    location_flag = {false}
                    style={mystyle}
                  />

                  <div className="text-center mt-4">
                    <p className="lead  text-muted text-center">
                      Want to upload it later? &nbsp;
                      <Link to="/workouts/Home">
                          <p >
                              Skip Ahead.
                          </p>
                      </Link>
                    </p>
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
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
