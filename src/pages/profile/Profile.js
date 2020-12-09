import React from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
  CardBody,
} from "reactstrap";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import store from "../../redux/store/index";
import Loader from "../../components/Loader";
import Friends from './Friends'
import Unknown404 from "./Unknown404";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import User from "../../components/Social/UserCard/User";
import About from "../../components/Social/AboutCard/About";
import { Link } from "react-router-dom";
import TimelineLazy from "../../components/Social/Timeline/TimelineLazy";
import StatusNew from './StatusNew';
import FollowingInit from "../../components/Social/FollowingFeed/FollowingInit";
import AlbumsInit from "../../components/Social/AlbumsFeed/AlbumsInit";
import AlbumsView from '../albums/Album/AlbumsView';
import PhotosView from '../../components/Social/Albums/PhotosView'
import AlbumPhotoOptions from './AlbumPhotoOptions';
import WorkoutDetailGraph from "../../components/Social/Graph/Area";
import WorkoutSubDetail from './WorkoutSubDetail'
import OptionsModal from '../albums/AlbumDetail/OptionsModal'



import {
  API_USER_PROFILES_FILTER,
  API_USER_FOLLOWING_MASTER_FILTER_OPEN,
  API_USER_FOLLOWING,
  API_USER_FOLLOWERS,
  API_USER_PHOTOS_ALBUMS_MASTER,
  API_USER_PHOTOS_ALBUMS_MASTER_NORMAL,
  API_USER_PHOTOS_PHOTOS_MASTER,
  API_TIMELINE_ALL_USER_NORM
} from '../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../redux/actions/auth';
import { loadUser } from '../../redux/actions/auth';

class Default extends React.Component {

  fetchTimeline = () =>  {
    const memberID = this.props.match.params.memberID;

    axios.get(`${API_USER_PROFILES_FILTER}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_user_profiles: res.data,
        api_user_profiles_username : res.data[0].username,
        api_user_profiles_first_name : res.data[0].first_name_std,
        api_user_profiles_last_name : res.data[0].last_name_std,
        api_user_profiles_location : res.data[0].location_city_std,
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

    axios.get(`${API_USER_FOLLOWING_MASTER_FILTER_OPEN}?user_id_xref=${this.props.user_status.pk}&followed_user=${memberID}`, keyConfig(store.getState)).then(res => {
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


    axios.get(`${API_USER_PHOTOS_ALBUMS_MASTER}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_albums_master: res.data,
        api_albums_master_loading: false,
      });
    });
  }



  fetchAlbums = () =>  {
    const memberID = this.props.match.params.memberID;
    axios.get(`${API_USER_PHOTOS_ALBUMS_MASTER}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_albums_master: res.data,
        api_albums_master_loading: false,
      });
    });
  }

  fetchUser = () =>  {
    const memberID = this.props.match.params.memberID;
    axios.get(`${API_USER_PROFILES_FILTER}${memberID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_user_profiles: res.data,
        api_user_profiles_username : res.data[0].username,
        api_user_profiles_first_name : res.data[0].first_name,
        api_user_profiles_last_name : res.data[0].last_name,
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

    axios.get(`${API_USER_FOLLOWING_MASTER_FILTER_OPEN}?user_id_xref=${this.props.user_status.pk}&followed_user=${memberID}`, keyConfig(store.getState)).then(res => {
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



  }

  fetchAlbumDetails = () =>  {
    const albumID = this.props.match.params.albumID;
    axios.get(`${API_USER_PHOTOS_ALBUMS_MASTER_NORMAL}${albumID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_albums_details: res.data,
        api_albums_details_loading: false,
      });
    });
  }

  fetchAlbumPhotoDetails = () =>  {
    const photoID = this.props.match.params.photoID;
    axios.get(`${API_USER_PHOTOS_PHOTOS_MASTER}${photoID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_albums_photo_details: res.data,
        api_albums_photo_details_loading: false,
      });
    });
  }


  fetchTimelineID = () =>  {
    const workoutID = this.props.match.params.workoutID;
    console.log('rrriiiaaaddd')
    console.log(`${API_TIMELINE_ALL_USER_NORM}${workoutID}`)
    axios.get(`${API_TIMELINE_ALL_USER_NORM}${workoutID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_workout_detail: res.data,
        api_workout_detail_loading: false,
      });
      console.log(res.data)
    });
  }





  componentDidMount() {
    console.log(this.props.match.params.pathID)
    this.fetchTimeline();
    if (this.props.match.params.pathID === "albums") {
      this.fetchAlbums();
      this.setState({
        api_albums_master_loading: true,
      });
      console.log('1111')
    }
    if (this.props.match.params.albumID && !this.props.match.params.photoID) {
      this.fetchAlbumDetails();
      this.setState({
        api_albums_details_loading: true,
      });
      console.log('2222')
    }
    if (this.props.match.params.photoID) {
      this.fetchAlbumPhotoDetails();
      this.setState({
        api_albums_photo_details_loading: true,
        album_photo_id: this.props.match.params.photoID,
      });
      console.log('3333')
    }
    if (this.props.match.params.workoutID) {
      console.log('4444')
      this.fetchTimelineID();
    }
   document.addEventListener("keydown", this.escFunction, false);
  }


  componentDidUpdate(prevProps) {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
      console.log('1')
    }
    if (this.state.album_photo_id !== this.props.match.params.photoID && this.props.match.params.photoID) {
      this.fetchAlbumPhotoDetails();
      this.setState({
        api_albums_photo_details_loading: true,
        album_photo_id: this.props.match.params.photoID,
      });
      console.log('2')
    }
    if (this.props.match.params.memberID !== this.state.currentMemberID) {
      this.setState({
        currentMemberID: this.props.match.params.memberID,
        api_user_profiles_loading: true,
        api_user_following_loading: true,
        api_user_followers_loading: true,
        api_following_this_user_loading: true,
      });
      this.fetchTimeline();
      console.log('3')
    }
    if (this.state.follow_change_flag !== 0) {
      this.fetchUser();
      this.setState({
        follow_change_flag: 0,
      });
      console.log('4')
    }
    if (this.state.photo_change_flag !== 0) {
      this.fetchTimeline();
      console.log('5')
    }
    if (this.state.workoutdetail_change_flag === 1) {
      this.fetchTimelineID();
      this.setState({
        workoutdetail_change_flag: 0,
      });
      console.log('6')
    }
    if (this.state.album_reload_flag !==0) {
      this.fetchAlbumDetails();
      this.setState({
        album_reload_flag: 0,
      });
      console.log('7')
    }

  }



  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      currentMemberID: this.props.match.params.memberID,
      follow_change_flag: 0,
      photo_change_flag: 0,
      flag_delete_album: 0,
      workoutdetail_change_flag:0,
      album_reload_flag: 0,

      api_user_profiles : [],
      api_user_profiles_loading: true,
      api_user_profiles_username:null,

      api_workout_detail: [],
      api_workout_detail_loading: true,

      api_user_following: [],
      api_user_following_loading: true,

      api_user_followers: [],
      api_user_followers_loading: true,

      api_following_this_user: [],
      api_following_this_user_loading: true,

      api_albums_master: [],
      api_albums_master_loading: true,

      album_photo_id:null,
      api_albums_details_loading: null,
      api_albums_photo_details_loading: null,

      scroll_right_count: 0,
      scroll_left_count: 0,
      myValueParent:'',
    };
  }




  escFunction(event){
    const myValue = this.state.myValueParent
     if(event.keyCode === 39 && myValue === '') {
       this.setState({
         scroll_right_count: this.state.scroll_right_count + 1
       })
     }
     if(event.keyCode === 37 && myValue === '') {
       this.setState({
         scroll_left_count: this.state.scroll_left_count + 1
       })
     }
   }


   handlermyValueParent = (val) => {
     this.setState({
       myValueParent: val
     })
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

  handlerWorkoutDetailChange = (val) => {
    this.setState({
      workoutdetail_change_flag: val
    })
  }

  handlerDeleteAlbumChamge = (val) => {
    this.setState({
      flag_delete_album: val
    })
  }



  renderHeaderTitle = () => {
    if (this.state.api_user_profiles_loading || this.state.api_albums_photo_details_loading) {
      return (null)
    }
    else if (this.props.user_status.pk === this.props.match.params.memberID && !this.props.match.params.photoID) {
      return(
          <HeaderTitle> My Profile
            {this.props.match.params.albumID && !this.state.api_albums_details_loading ?
              <OptionsModal
                api_album = {this.state.api_albums_details}
                handlerDeleteAlbumChamge = {this.handlerDeleteAlbumChamge}
                />
                :
                null
              }

            </HeaderTitle>
      )
    }
    else if (this.props.user_status.pk === this.props.match.params.memberID && this.props.match.params.photoID) {
      return(
        <HeaderTitle> My Profile
          <AlbumPhotoOptions
            onSubmit={this.onSubmit}
            albumID={this.props.match.params.albumID}
            nextID = {this.state.api_albums_photo_details.next_photo}
            previousID = {this.state.api_albums_photo_details.previous_photo}
            profileID = {this.props.match.params.memberID}
            showDelete = {this.props.match.params.memberID===this.props.user_status.pk ? "yes" : "no"}
            />
        </HeaderTitle>
      )
    }
    else if (this.props.user_status.pk !== this.props.match.params.memberID  && !this.props.match.params.photoID) {
      return(
          <HeaderTitle> {this.state.api_user_profiles[0].first_name_std + ' ' + this.state.api_user_profiles[0].last_name_std}</HeaderTitle>
      )
    }
    else if (this.props.user_status.pk !== this.props.match.params.memberID  && this.props.match.params.photoID) {
      return(
          <HeaderTitle> {this.state.api_user_profiles[0].first_name_std + ' ' + this.state.api_user_profiles[0].last_name_std}
          <AlbumPhotoOptions
            onSubmit={this.onSubmit}
            albumID={this.props.match.params.albumID}
            nextID = {this.state.api_albums_photo_details.next_photo}
            previousID = {this.state.api_albums_photo_details.previous_photo}
            profileID = {this.props.match.params.memberID}
            showDelete = {this.props.match.params.memberID===this.props.user_status.pk ? "yes" : "no"}
            />
          </HeaderTitle>
      )
    }

  }

  renderHeaderPath3 = () => {
    if (this.state.api_user_profiles_loading) {
      return (null)
    }
    else if (this.props.match.params.pathID === "home" ) {
      return(
            <BreadcrumbItem active> Profile </BreadcrumbItem>
      )
    }
    else if (this.props.match.params.pathID === "following") {
      return(
            <BreadcrumbItem active> Following </BreadcrumbItem>
      )
    }
    else if (this.props.match.params.pathID === "albums" && !this.props.match.params.albumID) {
      return(
            <BreadcrumbItem active> Albums </BreadcrumbItem>
      )
    }
    else if (this.props.match.params.albumID && this.props.match.params.albumID) {
      return(
        <BreadcrumbItem active> Albums</BreadcrumbItem>
      )
    }
  }


  renderHeaderPath4 = () => {
    if (this.state.api_user_profiles_loading) {
      return (null)
    }
    else if (this.state.api_albums_details_loading || this.state.api_albums_master_loading) {
      return(
        <Loader/>
      )
    }
    else if (this.props.match.params.albumID && this.props.match.params.albumID) {
      return(
        <BreadcrumbItem active> xxx </BreadcrumbItem>
      )
    }
    else {
      return(
        null
      )
    }
  }

  renderHeader = () => {
    if (this.state.api_user_profiles_loading) {
      return (null)
    }
      return(
        <Header >
          {this.renderHeaderTitle()}
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/workouts">Members</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{this.state.api_user_profiles[0].first_name_std + ' ' + this.state.api_user_profiles[0].last_name_std}</BreadcrumbItem>
            {this.renderHeaderPath3()}
            {this.renderHeaderPath4()}
          </Breadcrumb>
        </Header>
      )
  }


  renderUser = () => {
    if (this.state.api_user_profiles_loading || this.state.api_following_this_user_loading ) {
      return (<Card> <Loader /> </Card>)
    }
      return(
          <User
            username={this.state.api_user_profiles_username}
            first_name={this.state.api_user_profiles[0].first_name_std}
            last_name={this.state.api_user_profiles[0].last_name_std}
            avatar_color={this.state.api_user_profiles[0].avatar_color}
            avatar_letter={this.state.api_user_profiles[0].avatar_letter}
            avatar_image={this.state.api_user_profiles[0].avatar_image}
            heading={this.state.api_user_profiles[0].heading}
            active_user_id = {this.props.user_status.pk}
            user_id = {this.props.match.params.memberID}
            api_following_this_user_length = {this.state.api_following_this_user_length}
            api_following_this_user = {this.state.api_following_this_user}
            change_flag = {this.handlerFollowStatus}
            photo_change_flag = {this.handlerPhotoChange}
          />
      )
  }

  renderAbout = () => {
      return(
          <About
            location = {this.state.api_user_profiles_location}
          />
      )
  }


  renderFollowingCapped = () => {
    if (  this.state.api_user_following_loading || this.state.api_user_followers_loading || this.state.api_user_profiles_loading ){
      return( <Card> <Loader /> </Card>)

    }
      return(
        <FollowingInit
          api_user_following = {this.state.api_user_following}
          api_user_following_count = {this.state.api_user_following.length}
          api_user_followers = {this.state.api_user_followers}
          api_user_followers_count = {this.state.api_user_followers.length}
          user_id = {this.props.match.params.memberID}
          username={this.state.api_user_profiles_username}
          first_name={this.state.api_user_profiles[0].first_name_std}
          last_name={this.state.api_user_profiles[0].last_name_std}
          />
      )
  }


  renderAlbumsList = () => {
    if (this.state.api_user_profiles_loading) {
      return (null)
    }
      return(
        <AlbumsInit
          albums = {this.state.api_albums_master}
          albums_count = {this.state.api_albums_master.length}
          user_id = {this.props.match.params.memberID}
          username={this.state.api_user_profiles_username}
          first_name={this.state.api_user_profiles[0].first_name_std}
          last_name={this.state.api_user_profiles[0].last_name_std}
          />
      )
  }


  renderAlbumView= () => {
      return(
        <Row>
           {this.state.api_albums_master.map((x,y) =>
             <Col md="6" lg="6">
              <AlbumsView
                 album_details = {x}
                 albums_empty={this.state.api_albums_empty}
                 url = {"/profile/" + this.props.match.params.memberID + /albums/ + x.id}
                 source = {"profile"}
                 />
           </Col>
          )}
        </Row>

      )
  }




  handlerLoaderAlbumFlag = (val) => {
    console.log('hheysio')
    this.setState({
      album_reload_flag: null
    })
  }



    renderAlbumDetails= () => {
      if(this.state.api_albums_master_loading ) {
        return (<Loader />)
      }
      return(
        <Row>
           {this.state.api_albums_details.photos.map((x,y) =>
             <Col md="6" lg="6" key={y}>
              <PhotosView
                 photo_data = {x}
                 photo_index_id = {y}
                 album_data = {this.state.api_albums_details.photos}
                 album_count = {this.state.api_albums_details.photos.length}
                 album_name = {this.state.api_albums_details.album_name}
                 time_history = {this.state.api_albums_details.time_history}
                 source = {"profile"}
                 scroll_right_count = {this.state.scroll_right_count}
                 scroll_left_count = {this.state.scroll_left_count}
                 user_data = {this.state.api_albums_details.user_id_xref[0]}
                 handlermyValueParent = {this.handlermyValueParent}
                 change_flag = {this.handlerLoaderAlbumFlag}
             />
             </Col>
          )}
          </Row>

      )
  }



  renderAlbumPhotoDetails= () => {
    if (this.state.api_albums_photo_details_loading || this.state.api_albums_master_loading) {
      return (<Loader />)
    }
      return(
        <Card className="float-center">
          <CardBody className="">
            <CardImg top width="100%" src={this.state.api_albums_photo_details.photo} alt="Card image cap" />
          </CardBody>
        </Card>

      )
  }



  renderTimelineFeed = () => {
      return(
        <TimelineLazy
          list = {"member_only"}
          member_id = {this.state.currentMemberID}
          member_first_name = {this.state.api_user_profiles_first_name}
          />
      )
  }


  renderWorkoutDetail = () => {
    if (this.state.api_workout_detail_loading) {
      return(
        <Loader/>
      )
    }
      return(
        <WorkoutDetailGraph
          data={this.state.api_workout_detail.exercises[0].user_exercise_tracker_xref.workout_day_xref.full_quick}
          />
      )
  }


  renderWorkoutSubDetail = () => {
    if (this.state.api_workout_detail_loading) {
      return(
        <Loader/>
      )
    }
      return(
        <WorkoutSubDetail
          exercise_data={this.state.api_workout_detail.exercises[0].user_exercise_tracker_xref}
          user_data={this.state.api_workout_detail.user_id_xref[0]}
          comments={this.state.api_workout_detail.comments}
          likes={this.state.api_workout_detail.likes}
          data = {this.state.api_workout_detail}
          workoutdetail_change_flag = {this.handlerWorkoutDetailChange}
          timeline_id = {this.props.match.params.workoutID}
          />
      )
  }


  renderStatusNew= () => {
      return(
        <StatusNew username = {this.state.api_user_profiles_username} active_user_id ={this.props.user_status.pk } actual_user_id = {this.props.match.params.memberID}/>
      )
  }

  renderFollowingAll= () => {
      return(
        <Friends
          api_user_following = {this.state.api_user_following}
          api_user_followers = {this.state.api_user_followers}
          />
      )
  }



  renderLeft = () => {
    if (this.props.match.params.pathID === "home") {
      return(
        <div>
          {this.renderUser()}
          {this.renderAbout()}
          {this.renderFollowingCapped()}
          {this.renderAlbumsList()}
          </div>
      )
    }
    else if (this.props.match.params.pathID === "following") {
      return(
        <div>
          {this.renderUser()}
          {this.renderAlbumsList()}
        </div>
      )
    }
    else if ((this.props.match.params.pathID === "albums" || !this.props.match.params.albumID) && !this.props.match.params.workoutID) {
      return(
        <div>
          {this.renderUser()}
          {this.renderFollowingCapped()}
        </div>
      )
    }
    else if (this.props.match.params.pathID === "albums" || this.props.match.params.albumID) {
      return(
        <div>
          {this.renderUser()}
          {this.renderFollowingCapped()}
          {this.renderAlbumsList()}
        </div>
      )
    }
    if (this.props.match.params.workoutID) {
      return(
        <div>
          {this.renderWorkoutSubDetail()}
          </div>
      )
    }
  }


  renderRight = () => {
    if (this.state.api_albums_photo_details_loading || this.state.api_albums_details_loading) {
      return(
        <Loader/>
      )
    }
    else if (this.props.match.params.pathID === "home") {
      return(
        <div> {this.renderTimelineFeed()}</div>
      )
    }


    else if (this.props.match.params.pathID === "following") {
      return(
        <div> {this.renderFollowingAll()} </div>
      )
    }
    else if (this.props.match.params.pathID === "albums") {
      return(
        <div> {this.renderAlbumView()} </div>
      )
    }
    else if (this.props.match.params.workoutID) {
      return(
        <div> {this.renderWorkoutDetail()} </div>
      )
    }
    else if (this.props.match.params.albumID && !this.props.match.params.photoID) {
      return(
        <div> {this.renderAlbumDetails()} </div>
      )
    }
    else if (this.props.match.params.albumID && this.props.match.params.photoID) {
      return(
        <div> {this.renderAlbumPhotoDetails()}</div>
      )
    }

  }


  render() {
    if (
      this.props.user_status === null
    ) {
      return <Loader />
    }

    else if (!this.props.user_status.onboarding_complete) {
      return <Redirect to="/onboarding/step1" />;
    }

    else if (this.state.flag_delete_album === 1) {
      return <Redirect to="/albums/" />;
    }

    else if (this.state.api_user_profiles_username === "error") {
      return <Unknown404 />
    }

    else if (
      this.props.match.params.pathID === "home" ||
      this.props.match.params.pathID === "following" ||
      this.props.match.params.pathID === "albums" ||
      this.props.match.params.albumID ||
      this.props.match.params.workoutID
    ) {
      return       (
          <Container fluid>
              {this.renderHeader()}
            <Row>
              <Col lg="4" xl="4">
              { this.renderLeft() }
              </Col>
              <Col lg="8" xl="8">
              { this.renderRight() }
              </Col>
            </Row>
          </Container>
          )
        }

    return (
      <Unknown404 />
  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
