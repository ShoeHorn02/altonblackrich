import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { keyConfig } from '../../../redux/actions/auth';
import axios from "axios";
import store from "../../../redux/store/index";
import { API_USER_PHOTOS_PHOTOS } from '../../../redux/actions/API'
import { connect } from 'react-redux';
import { loadUser } from '../../../redux/actions/auth';
import Loader from "../../../components/Loader";
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardImg,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Header from "../../../components/Header";
import HeaderTitle from "../../../components/HeaderTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faAngleRight,
  faAngleLeft,
 } from "@fortawesome/free-solid-svg-icons";
import { deletePhoto } from '../../../redux/actions/album';


async function DeletePhoto(userid, photoID, changeflag) {
  await store.dispatch(deletePhoto(userid, photoID, "false"));
  await changeflag(1)
 }



const colors = [
  {
    name: "Primary",
    value: "primary"
  }
];



const OptionsModal = (props) => {
  const initOpenModals = () => {
    let modals = {};

    colors.forEach((color, index) => {
      modals = Object.assign({}, modals, {[index]: false})
    });

    return modals;
  };

  const [openModals, setOpenModals] = useState(() => initOpenModals());

  const toggle = index => {
    // Toggle selected element
    setOpenModals(openModals => Object.assign({}, openModals, {[index]: !openModals[index]}));
  }

  return (
    <div className="float-right">


        {colors.map((color, index) => (
          <React.Fragment key={index}>



            <Button
              color="danger"
              onClick={() => toggle(index)}
              className="mr-1"
            >

                      <FontAwesomeIcon icon={faMinus} /> Delete Photo

            </Button>



            {props.previousID !== null ?
            <Button
            color="secondary"
            tag={Link}
            to={"/albums/" + props.albumID +"/"+props.previousID}
            >
              <FontAwesomeIcon icon={faAngleLeft} /> Previous
            </Button>
            :
            <Button
            color="secondary"
            tag={Link}
            to={"/albums/" + props.albumID }
            >
            Back to Album
            </Button>
            }



            {props.nextID !== null ?
            <Button
            color="secondary"
            className="ml-1"
            tag={Link}
            to={"/albums/" + props.albumID +"/"+props.nextID}
            >
            Next    <FontAwesomeIcon icon={faAngleRight} />
            </Button>
            :
            <Button
            color="secondary"
            className="ml-1"
            tag={Link}
            to={"/albums/" + props.albumID }
            >
            Back to Album
            </Button>
          }


            <Modal
              isOpen={openModals[index]}
              toggle={() => toggle(index)}
            >
              <ModalHeader toggle={() => toggle(index)}>
                Delete Photo
              </ModalHeader>
              <ModalBody className="text-center m-3">
                <p className="mb-0">
                Are you sure you want to delete this photo? This cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => toggle(index)}>
                  Cancle
                </Button>{" "}
                <Button
                  color="danger"
                    onClick={() => {toggle(index); props.onSubmit()}}
                >
                  Delete Photo
                </Button>
              </ModalFooter>
            </Modal>
          </React.Fragment>
        ))}

    </div>
  );
}

class WorkoutsList extends React.Component {

  fetchPhotos = () =>  {
    const photoID = this.props.match.params.photoID;
    axios.get(`${API_USER_PHOTOS_PHOTOS}${photoID}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_photo: res.data,
        api_photo_loading: false,
      });
    });
  }



  componentDidMount() {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
    }
    this.fetchPhotos();
    document.body.style.overflow = 'unset';
  }


  componentDidUpdate() {
    if (this.state.photo_id !== this.props.match.params.photoID) {
      this.fetchPhotos();
      this.setState({
        photo_id: this.props.match.params.photoID,
      });
    }

  }


  constructor(props) {
    super(props);
    this.state = {
      api_photo: [],
      api_photo_loading: true,
      flag_delete_photo: 0,
      api_album_loading: true,
      api_album: null,
      album_id: this.props.match.params.albumID,
      photo_id : this.props.match.params.photoID
    };
  }


  handlerDeletePhotoChange = (val) => {
    console.log('change flag')
    this.setState({
      flag_delete_photo: val
    })
  }



  onSubmit = (e) => {
    DeletePhoto(
      this.props.user_status.pk,
      this.props.match.params.photoID,
      this.handlerDeletePhotoChange
    );
  }


  render() {
    if (this.props.user_status === null ||
      this.state.api_photo_loading === true
    ) {
      return <Loader />;
    }
    if (this.state.flag_delete_photo === 1 ) {
      return <Redirect to={"/albums/" + this.state.api_photo.album_xref} />;
    }


      return (
        <Container fluid>
        <Header>
          <HeaderTitle> {this.state.api_photo.album_name}


            <OptionsModal
              onSubmit={this.onSubmit}
              albumID={this.state.album_id}
              nextID = {this.state.api_photo.next_photo}
              previousID = {this.state.api_photo.previous_photo}
              />



          </HeaderTitle>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              Albums
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <Link to={"/albums/" + this.state.api_photo.album_xref}>{this.state.api_photo.album_name}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Photo</BreadcrumbItem>
          </Breadcrumb>


        </Header>





              <Card className="float-center">
                <CardImg top width="100%" src={this.state.api_photo.photo} alt="Card image cap" />

              </Card>






        </Container>
      );


  }
}

const mapStateToProps = (state) => ({
  loginflag: state.auth.loginFlag,
  user_status: state.auth.user,
});

export default connect(mapStateToProps)(WorkoutsList);
