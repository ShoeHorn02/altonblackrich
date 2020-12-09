import React from "react";
import Select from 'react-select'
import Loader from "../../../components/Loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import { MoreVertical, RefreshCw } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import UploadProfilePicture from "../../../components/Social/UploadProfilePhoto/Index";
import { postFirstLastName } from '../../../redux/actions/social';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto'
import { nameChange } from '../../../redux/actions/auth';
import PublicInfoForm from './PublicInfoForm'




import Header from "../../../components/Header";


import { Link } from "react-router-dom";

import {
  API_LOCATION,
  API_USER_PROFILES,
  API_USER_PROFILES_FILTER,
  API_USER_FIRSTNAME_LASTNAME
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';




const customStyles = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: 14,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    width: '250px',
    background: '#f8f9fa'

  }),



  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(255, 80, 86)' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    fontFamily: 'Arial, Helvetica, sans-serif',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(255, 80, 86)',
  }),
}





async function UpdatePublicInfo(userid, firstname,lastname, changeflag) {
  const resultFollow = await store.dispatch(postFirstLastName(userid, firstname,lastname));
  const changeflagblock = await changeflag('1');
 }



class Default extends React.Component {


    fetchInitial = () =>  {
      const memberID = store.getState().auth.user.pk
      axios.get(`${API_USER_PROFILES_FILTER}${memberID}`, keyConfig(store.getState)).then(res => {
        this.setState({
          api_user_profiles: res.data,
          api_user_profiles_profile_photo : res.data[0].profile_photo,
          api_user_profiles_loading: false,
        });
      })
    }


    fetchPhotoUpload = (x) =>  {
      const memberID = store.getState().auth.user.pk
      axios.get(`${API_USER_PROFILES_FILTER}${memberID}`, keyConfig(store.getState)).then(res => {
        this.setState({
          api_user_profiles_profile_photo : res.data[0].profile_photo,
          photo_change_flag: 0,
        });
      })
    }






    componentDidMount() {
      if (this.props.user_status === null) {
        store.dispatch(loadUser());
      }
      this.fetchInitial();
    }


    componentDidUpdate() {
      if (this.state.photo_change_flag !== 0) {
        this.fetchPhotoUpload();
      }
    }

    constructor(props) {
      super(props);
      this.state = {
        api_user_profiles: [],
        api_user_profiles_loading: true,
        api_user_profiles_profile_photo: null,
        api_first_name_last_name: [],
        api_first_name_last_name_loading: true,
        api_location_search: [],
        selectedOption: null,
        location_typed: "toronto",
        location_before: "tor",
        api_timezone: null,
        current_photo: store.getState().auth.user.profile_photo,
        photo_change_flag: 0,
        form_change_flag: 0
      };
    }





   handlerPhotoChange = (val) => {
     this.setState({
       photo_change_flag: val
     })
   }


   handlerFormChange = (val) => {
     this.setState({
       form_change_flag: val
     })
   }

   onChange = (e) => {
     this.setState({ [e.target.name]: e.target.value });
   }

   onSubmit = (e) => {
     e.preventDefault();
     UpdatePublicInfo(
       this.props.user_status.pk,
       this.state.firstName,
       this.state.lastName,
       this.handlerFormChange);
   }

  render() {
    if (this.props.user_status === null || this.state.api_user_profiles_loading === true) {
      return <Loader />
    }

    return(
      <Card>
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            Public info
          </CardTitle>
        </CardHeader>

        <CardBody>
          <Row>
            <Col md="8">

              <PublicInfoForm formSize = {"md"}/>

            </Col>

            <Col md="4">
              <div className="text-center">
                <ProfilePhoto
                  profile_photo={this.state.api_user_profiles_profile_photo}
                  avatar_letter = {this.state.api_user_profiles[0].avatar_letter}
                  avatar_color = {this.state.api_user_profiles[0].avatar_color}
                  avatar_size={"128px"}
                  letter_size={"64px"}
                  />
                <div className="mt-2">
                  <UploadProfilePicture
                    photo_change_flag = {this.handlerPhotoChange}
                    profile_picture_status = {this.props.user_status.profile_photo}
                  />
                </div>
                <small>
                  For best results, use an image at least 128px by 128px in .jpg
                  format
                </small>
              </div>
            </Col>
          </Row>



        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
