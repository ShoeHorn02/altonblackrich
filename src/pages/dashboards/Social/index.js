import React from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import { connect } from 'react-redux';
import TimelineTabs from "./TimelineTabs";
import User from "../../../components/Social/UserCard/User";
import FollowingInit from "../../../components/Social/FollowingFeed/FollowingInit";
import store from "../../../redux/store/index";
import Loader from "../../../components/Loader";
import {
  API_USER_FOLLOWING,
  API_USER_FOLLOWERS,
  API_USER_PHOTOS_ALBUMS_MASTER
 } from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';
import { Redirect } from "react-router-dom";
import AlbumsInit from "../../../components/Social/AlbumsFeed/AlbumsInit";

class TimelineIndex extends React.Component {

  fetchTimelineInitial = () =>  {
    const memberID = store.getState().auth.user.pk
    axios.get(`${API_USER_FOLLOWING}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_user_following: res.data,
        api_user_following_loading: false,
      });
    });
    axios.get(`${API_USER_FOLLOWERS}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_user_followers: res.data,
        api_user_followers_loading: false,
      });
    });
    axios.get(`${API_USER_PHOTOS_ALBUMS_MASTER}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_albums_master: res.data,
        api_albums_master_loading: false,
      });
    });
  }







  handlerPhotoChange = (val) => {
    this.setState({
      photo_change_flag: val
    })
  }



  componentDidUpdate(prevProps) {
    if (this.props.user_status == null) {
      store.dispatch(loadUser());
      console.log('bbb')
    }
    if (this.state.photo_change_flag !== 0) {
      this.fetchTimelineInitial();
    }
  }

  componentDidMount() {
    this.fetchTimelineInitial();
  }

  constructor(props) {
    super(props);
    this.state = {
      photo_change_flag: 0,
      flag_timeline_change: 0,
      flag_lazy_change: 0,
      lazy_page_number: 1,
      api_timeline:[],
      api_timeline_loading: true,
      api_user_following : [],
      api_user_following_loading: true,
      api_user_followers : [],
      api_user_followers_loading: true,
      api_albums_master: [],
      api_albums_master_loading: true,
    };
  }

  render() {
    if (this.props.user_status == null) {
      return <Loader />
    }

    else if (!this.props.user_status.onboarding_complete) {
      return <Redirect to="/onboarding/step1" />;
    }

    else if (
      this.state.api_user_following_loading ||
      this.state.api_user_followers_loading ||
      this.state.api_albums_master_loading
    ) {
      return <Loader />

    }
    return (
      <Container className="p-0">
        <Row>
          <Col lg="9">
            <TimelineTabs
              api_timeline={this.state.api_timeline}

              first_name={this.props.user_status.first_name}
              last_name={this.props.user_status.last_name}
              avatar_color={store.getState().auth.user.avatar_color}
              avatar_letter={store.getState().auth.user.avatar_letter}
              email_lower={store.getState().auth.user.email_lower}

              />
          </Col>
          <Col lg="3">
            <User
              username={this.props.user_status.username}
              first_name={this.props.user_status.first_name}
              last_name={this.props.user_status.last_name}
              avatar_color={this.props.user_status.avatar_color}
              avatar_letter={this.props.user_status.avatar_letter}
              avatar_image={this.props.user_status.avatar_image}
              heading={this.props.user_status.heading}
              photo_change_flag = {this.handlerPhotoChange}
              source = {"timelime"}
            />
            <FollowingInit
              api_user_following = {this.state.api_user_following}
              api_user_following_count = {this.state.api_user_following.length}
              api_user_followers = {this.state.api_user_followers}
              api_user_followers_count = {this.state.api_user_followers.length}
              user_id = {this.props.user_status.pk}
              />
              <AlbumsInit
                albums = {this.state.api_albums_master}
                albums_count = {this.state.api_albums_master.length}
                user_id = {this.props.user_status.pk}
                first_name={this.props.user_status.first_name}
                last_name={this.props.user_status.last_name}
                />
          </Col>
        </Row>
      </Container>
  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  general: state.general.isLoading,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(TimelineIndex);
