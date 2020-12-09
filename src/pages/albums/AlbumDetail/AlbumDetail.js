import React from "react";
import { toastr } from "react-redux-toastr";
import { Link, Redirect } from "react-router-dom";
import { keyConfig } from '../../../redux/actions/auth';
import axios from "axios";
import store from "../../../redux/store/index";
import { API_USER_PHOTOS_ALBUMS } from '../../../redux/actions/API'
import { connect } from 'react-redux';
import Default from '../../dashboards/Default/index'
import { loadUser } from '../../../redux/actions/auth';
import Loader from "../../../components/Loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  Row,
} from "reactstrap";
import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";
import Upload from './Upload'
import PhotosView from '../../../components/Social/Albums/PhotosView'
import OptionsModal from './OptionsModal'






class AlbumDetails extends React.Component {

  fetchPhotos = () =>  {
    const albumbID = this.props.match.params.albumID;
    axios.get(`${API_USER_PHOTOS_ALBUMS}${albumbID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_album: res.data,
        api_photos: res.data.photos,
        api_photos_loading: false,
        upload_count: 0,
      });
    });
  }

  reloadPhotos = () =>  {
    const albumbID = this.props.match.params.albumID;
    axios.get(`${API_USER_PHOTOS_ALBUMS}${albumbID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_album: res.data,
        api_photos: res.data.photos,
        api_photos_loading: false,
        upload_count: 0,
        flag_loader: 0,
      });
    });
  }


  componentDidMount() {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
    }
    this.fetchPhotos();
     document.addEventListener("keydown", this.escFunction, false);
  }

  componentDidUpdate() {
    if (this.state.refresh === 1) {
      this.reloadPhotos();
      this.setState({
        refresh: 0,
      });
    }
    else if (this.state.flag_loader === 2) {
      this.reloadPhotos();
      this.setState({
        flag_loader: 0,
      });
    }

    else if (this.state.flag_delete_album === 1) {

    }
  }


  handlerDeleteAlbumChamge = (val) => {
    this.setState({
      flag_delete_album: val
    })
  }

  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
    this.state = {
      api_photos: [],
      api_photos_loading: true,
      api_album: [],
      category_id: null,
      albumbID: this.props.match.params.albumID,
      flag_loader: 0,
      flag_delete_album: 0,
      scroll_right_count: 0,
      scroll_left_count: 0,
      upload_count: 0,
      upload_total: 0,
      myValueParent:'',
    };
  }


  showToastr(title,event,type) {
    const options = {
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right"
    };

    const toastrInstance =
      type === "info"
        ? toastr.info
        : type === "warning"
        ? toastr.warning
        : type === "error"
        ? toastr.error
        : toastr.success;

    toastrInstance(
      title,
      event,
      options
    );
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



   handlerUploadCount = async (val,val2) => {
     await this.setState({
       upload_count: this.state.upload_count + val,
       upload_total: val2,
     })
     if (this.state.upload_count === val2){
       await this.setState({
         refresh: 1
       })
     }
   }


  handlerLoaderFlag = (val) => {
    this.setState({
      flag_loader: val
    })
  }

handlermyValueParent = (val) => {
  this.setState({
    myValueParent: val
  })
}



  render() {
    if (this.props.user_status === null || this.state.api_photos_loading) {
      return <Loader />;
    }
    else if (!this.props.user_status.onboarding_complete) {
      return <Redirect to="/onboarding/step1" />;
    }
    else if (this.state.flag_delete_album === 1) {
      return <Redirect to="/albums/" />;
    }
    else if (this.props.loginflag) {
      return <Default />;
    }
    return (

      <Container fluid>
        <Header>
          <HeaderTitle> {this.state.api_album.album_name_normal}
          <OptionsModal
            album_name = {this.state.api_album.album_name}
            api_album = {this.state.api_album}
            handlerDeleteAlbumChamge = {this.handlerDeleteAlbumChamge}
            />

          </HeaderTitle>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active  >Albums</BreadcrumbItem>
            <BreadcrumbItem active>{this.state.api_album.album_name_normal}</BreadcrumbItem>
          </Breadcrumb>


        </Header>





                <Upload
                  albumid = {this.props.match.params.albumID}
                  albumb_name = {this.state.api_album.album_name_normal}
                  userid = {this.props.user_status.pk}
                  handlerLoaderFlag = {this.handlerLoaderFlag}
                  flag_loader = {this.state.flag_loader}
                  upload_count = {this.state.upload_count}
                  upload_total = {this.state.upload_total}
                  handlerUploadCount = {this.handlerUploadCount}
                  />







                   <Row>
                      {this.state.api_photos.map((x,y) =>
                     <Col md="6" lg="4" key={y}>
                      <PhotosView
                      photo_data = {x}
                      photo_index_id = {y}
                      album_data = {this.state.api_photos}
                      album_count = {this.state.api_photos.length}
                      source = {'album'}
                      change_flag = {this.handlerLoaderFlag}
                      album_name = {this.state.api_album.album_name}
                      time_history = {this.state.api_album.time_history}
                      scroll_right_count = {this.state.scroll_right_count}
                      scroll_left_count = {this.state.scroll_left_count}
                      user_data = {this.state.api_album.user_id_xref[0]}
                      handlermyValueParent = {this.handlermyValueParent}
                      />

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

export default connect(mapStateToProps)(AlbumDetails);
