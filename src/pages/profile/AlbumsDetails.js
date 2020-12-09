import React from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,

} from "reactstrap";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import store from "../../redux/store/index";
import Loader from "../../components/Loader";
import Friends from '/Friends'
import Unknown404 from "../Unknown404";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import User from "../../components/Social/UserCard/User";
import { Link } from "react-router-dom";
import FollowingInit from "../../components/Social/FollowingFeed/FollowingInit";
import Albums from '../Albums';
import PhotosView from '../../components/Social/Albums/PhotosView'
import {
  API_TIMELINE_ALL_USER,
  API_USER_PROFILES_FILTER,
  API_USER_FOLLOWING_MASTER_FILTER_OPEN,
  API_USER_FOLLOWING,
  API_USER_FOLLOWERS,
  API_USER_PHOTOS_ALBUMS_MASTER_NORMAL,
} from '../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../redux/actions/auth';
import { loadUser } from '../../redux/actions/auth';

class Default extends React.Component {

  fetchTimeline = () =>  {
    const memberID = this.props.match.params.memberID;
    axios.get(`${API_TIMELINE_ALL_USER}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_timeline_you_only: res.data,
        api_timeline_you_only_loading: false
      });
    }).catch((err) => {
      this.setState({
        api_user_profiles_username: "error",
        api_timeline_you_only_loading: false,
      });
    });

    axios.get(`${API_USER_PROFILES_FILTER}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_user_profiles: res.data,
        api_user_profiles_username : res.data[0].username,
        api_user_profiles_loading: false,
        photo_change_flag: 0,
      });
    }).catch((err) => {
      this.setState({
        api_user_profiles_username: "error",
        api_user_profiles_loading: false,
      });
    });

    axios.get(`${API_USER_FOLLOWING}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_user_following: res.data,
        api_user_following_loading: false,
      });
    }).catch((err) => {
      this.setState({
        api_user_profiles_username: "error",
        api_user_following_loading: false,
      });
    });

    axios.get(`${API_USER_FOLLOWERS}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_user_followers: res.data,
        api_user_followers_loading: false,
      });
    }).catch((err) => {
      this.setState({
        api_user_profiles_username: "error",
        api_user_followers_loading: false,
      });
    });

    axios.get(`${API_USER_FOLLOWING_MASTER_FILTER_OPEN}?user_id_xref=${store.getState().auth.user.pk}&followed_user=${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_following_this_user: res.data,
        api_following_this_user_length: res.data.length,
        api_following_this_user_loading: false,
        follow_change_flag: 0,
      });
    }).catch((err) => {
      this.setState({
        api_user_profiles_username: "error",
        api_following_this_user_loading: false,
      });
    });

    const albumID = this.props.match.params.albumID;
    axios.get(`${API_USER_PHOTOS_ALBUMS_MASTER_NORMAL}${albumID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_albums_master: res.data,
        api_albums_master_loading: false,
      });
    console.log(res.data.photos)
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
    }
    if (this.props.match.params.memberID !== this.state.currentMemberID) {
      this.setState({
        currentMemberID: this.props.match.params.memberID,
        api_timeline_you_only_loading: true,
        api_user_profiles_loading: true,
        api_user_following_loading: true,
        api_user_followers_loading: true,
        api_following_this_user_loading: true,
      });
      this.fetchTimeline();
    }
    if (this.state.follow_change_flag !== 0) {
      this.fetchTimeline();
    }
    if (this.state.photo_change_flag !== 0) {
      this.fetchTimeline();
    }
  }

  componentDidMount() {
    this.fetchTimeline();
    document.body.style.overflow = 'unset';
  }

  constructor(props) {
    super(props);
    this.state = {
      currentMemberID: null,
      follow_change_flag: 0,
      photo_change_flag: 0,

      api_timeline_you_only:[],
      api_timeline_you_only_loading: true,

      api_user_profiles : [],
      api_user_profiles_loading: true,
      api_user_profiles_username:null,

      api_user_following: [],
      api_user_following_loading: true,

      api_user_followers: [],
      api_user_followers_loading: true,

      api_following_this_user: [],
      api_following_this_user_loading: true,

      api_albums_master: [],
      api_albums_master_loading: true,
    };
  }

  handlerFollowStatus = (val) => {
    this.setState({
      follow_change_flag: val
    })
  }

  handlerPhotoChange = (val) => {
    this.setState({
      photo_change_flag: val
    })
  }


  renderHeaderTitle = () => {
    if (store.getState().auth.user.pk === this.props.match.params.memberID) {
      return(
          <HeaderTitle> My Profile </HeaderTitle>
      )
    }
    else if (store.getState().auth.user.pk !== this.props.match.params.memberID) {
      return(
          <HeaderTitle> {this.state.api_user_profiles[0].first_name + ' ' + this.state.api_user_profiles[0].last_name}'s Profile</HeaderTitle>
      )
    }

  }



  renderHeader = () => {
      return(
        <Header >
          {this.renderHeaderTitle()}
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/workouts">Members</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.state.api_user_profiles[0].first_name + ' ' + this.state.api_user_profiles[0].last_name}</BreadcrumbItem>
            <BreadcrumbItem active> Albums </BreadcrumbItem>
            <BreadcrumbItem active> {this.state.api_albums_master.album_name_normal} </BreadcrumbItem>
          </Breadcrumb>
        </Header>
      )
  }


  renderUser = () => {
      return(
          <User
            username={this.state.api_user_profiles_username}
            first_name={this.state.api_user_profiles[0].first_name}
            last_name={this.state.api_user_profiles[0].last_name}
            avatar_letter={this.state.api_user_profiles[0].avatar_letter}
            avatar_color={this.state.api_user_profiles[0].avatar_color}
            profile_photo={this.state.api_user_profiles[0].profile_photo}
            heading={this.state.api_user_profiles[0].heading}
            active_user_id = {store.getState().auth.user.pk}
            user_id = {this.props.match.params.memberID}
            api_following_this_user_length = {this.state.api_following_this_user_length}
            api_following_this_user = {this.state.api_following_this_user}
            change_flag = {this.handlerFollowStatus}
            photo_change_flag = {this.handlerPhotoChange}
          />
      )
  }

  renderFollowingCapped = () => {
      return(
        <FollowingInit
          api_user_following = {this.state.api_user_following}
          api_user_following_count = {this.state.api_user_following.length}
          api_user_followers = {this.state.api_user_followers}
          api_user_followers_count = {this.state.api_user_followers.length}
          user_id = {this.props.match.params.memberID}
          username={this.state.api_user_profiles_username}
          first_name={this.state.api_user_profiles[0].first_name}
          last_name={this.state.api_user_profiles[0].last_name}
          />
      )
  }





  renderAlbumView= () => {
      return(
        <Row>
           {this.state.api_albums_master.photos.map((x,y) =>
             <Col md="6" lg="6">
          <PhotosView
             photo_data = {x}
             url = {"/profile/" + this.props.match.params.memberID + /albums/ + x.album_xref + '/' + x.id}
             source = {"profile"}
             />
             </Col>
          )}
          </Row>

      )
  }







  renderLeft = () => {
    return(
        <div>
          {this.renderUser()}
          {this.renderFollowingCapped()}
          </div>
        )
      }

  renderRight = () => {
    return(
      <div> {this.renderAlbumView()} </div>
    )
  }





  render() {
    if (
      this.props.user_status === null ||
      this.state.api_timeline_you_only_loading ||
      this.state.api_user_profiles_loading ||
      this.state.api_user_following_loading ||
      this.state.api_user_followers_loading ||
      this.state.api_following_this_user_loading ||
      this.state.api_albums_master_loading
    ) {
      return <Loader />
    }

    else if (!this.props.user_status.onboarding_complete) {
      return <Redirect to="/onboarding/step1" />;
    }

    else if (this.state.api_user_profiles_username === "error") {
      return <Unknown404 />
    }


      return       (
          <Container fluid>
              {this.renderHeader()}
            <Row>
              <Col lg="4" xl="3">
              { this.renderLeft() }
              </Col>
              <Col lg="8" xl="9">
              { this.renderRight() }
              </Col>
            </Row>
          </Container>
          )
        }
      }


const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
