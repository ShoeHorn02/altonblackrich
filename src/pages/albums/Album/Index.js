import React from "react";
import { toastr } from "react-redux-toastr";
import { Link, Redirect } from "react-router-dom";
import { keyConfig } from '../../../redux/actions/auth';
import axios from "axios";
import store from "../../../redux/store/index";
import { API_USER_PHOTOS_ALBUMS,API_USER_PHOTOS_ALBUMS_EMPTY } from '../../../redux/actions/API'
import { connect } from 'react-redux';
import Default from '../../dashboards/Default/index'
import { loadUser } from '../../../redux/actions/auth';
import Loader from "../../../components/Loader";
import AlbumsNotFound from "./AlbumsNotFound";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  Row,
} from "reactstrap";
import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";
import { postAlbumName } from '../../../redux/actions/album';
import AddAlbumModal from './AddAlbumModal';
import AlbumsView from './AlbumsView'


async function UpdateAlbumName(userid, album_name, album_des, post_to_timelime, changeflag) {
  const resultNewAlbum = await store.dispatch(postAlbumName(userid, album_name, album_des, post_to_timelime, "true"));
  await changeflag(resultNewAlbum.data.id)
 }





class WorkoutsList extends React.Component {


  constructor(props) {
    super(props);
    this.handlerAlbumName = this.handlerAlbumName.bind(this);
    this.state = {
      api_albums: [],
      api_albums_loading: true,
      api_albums_empty: [],
      api_albums_empty_loading: true,
      category_id: null,
      album_name: null,
      album_des: null,
      change_flag: 0,
      new_album_link: null,
      flag_album_length: 0,
      button_spinner: 0,
      post_to_timeline: false,
    };
  }


  showToastr(name) {
    const options = {
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right"
    };

    const toastrInstance = toastr.success

    toastrInstance(
      "Show your progress",
      "Creating Photo Album " + '"' + name + '"',
      options
    );
  }


  fetchAlbumsInitial = () =>  {
    axios.get(`${API_USER_PHOTOS_ALBUMS}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_albums: res.data,
        api_albums_loading: false,
        flag_album_length: res.data.length
      });
    console.log(res.data)
    });
    axios.get(`${API_USER_PHOTOS_ALBUMS_EMPTY}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_albums_empty: res.data,
        api_albums_empty_loading: false,
      });
    });
  }

  componentDidMount() {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
    }
    this.fetchAlbumsInitial();
  }

  componentDidUpdate() {
  if (this.state.change_flag !== 0 && this.state.new_album_link === null) {
    this.fetchAlbumsInitial();
    this.setState({
      new_album_link: this.state.change_flag
    });
  }
}


  handlerAlbumName = (val) => {
    this.setState({
      album_name: val
    })
  }

  handlerPostToTimeline = (val) => {
    this.setState({
      post_to_timeline: val,
    })
  }

  handlerAlbumDes = (val) => {
    this.setState({
      album_des: val,
    })
  }

  handlerReloadChange = (val) => {
    this.setState({
      change_flag: val
    })
  }

  handlerButtonSpinner = (val) => {
    this.setState({
      button_spinner: val
    })
  }

  onSubmit = (e) => {
    UpdateAlbumName(
      this.props.user_status.pk,
      this.state.album_name,
      this.state.album_des,
      this.state.post_to_timeline,
      this.handlerReloadChange
    );
  }

  render() {
    if (this.props.user_status === null ||
      this.state.api_albums_loading === true ||
      this.state.api_albums_empty_loading === true) {
      return <Loader />;
    }
    else if (!this.props.user_status.onboarding_complete) {
      return <Redirect to="/onboarding/step1" />;
    }
    else if (this.state.new_album_link !== null) {
      return <Redirect to={"/albums/" + this.state.new_album_link} />;
    }
    else if (this.state.api_albums.length === 0) {
      return <AlbumsNotFound
        album_name_function = {this.handlerAlbumName}
        album_des_function = {this.handlerAlbumDes}
        album_name_value = {this.state.album_name}
        album_des_value = {this.state.album_des}
        post_to_timeline_function = {this.handlerPostToTimeline}
        post_to_timeline = {this.state.post_to_timeline}
        onSubmit={this.onSubmit} />;
    }
    else if (this.props.loginflag) {
      return <Default />;
    }
    return (

      <Container fluid>
        <Header>
          <HeaderTitle> Albums
          <AddAlbumModal
            album_name_function = {this.handlerAlbumName}
            album_des_function = {this.handlerAlbumDes}
            album_name_value = {this.state.album_name}
            album_des_value = {this.state.album_des}
            post_to_timeline_function = {this.handlerPostToTimeline}
            post_to_timeline = {this.state.post_to_timeline}
            onSubmit={this.onSubmit}
            location={"float-right"}
            size = {"md"}
            color={"secondary"}
            outline={"no"}
            showToastr = {this.showToastr}
            button_spinner = {this.state.button_spinner}
            buttonSpinnerFunction = {this.handlerButtonSpinner}
            />

          </HeaderTitle>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Albums</BreadcrumbItem>
          </Breadcrumb>


        </Header>






                   <Row>
                      {this.state.api_albums.map((x,y) =>
                     <Col md="6" lg="4">
                      <AlbumsView
                        album_details = {x}
                        albums_empty={this.state.api_albums_empty}/>
                     </Col>
                     )}
                   </Row>




      </Container>

    );
  }
}

const mapStateToProps = (state) => ({
  loginflag: state.auth.loginFlag,
  user_status: state.auth.user,
});

export default connect(mapStateToProps)(WorkoutsList);
