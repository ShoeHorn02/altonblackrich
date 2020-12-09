import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "reactstrap";
import UploadProfilePicture from "../../../components/Social/UploadProfilePhoto/Index";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto'
import { loadUser } from '../../../redux/actions/auth';




class Default extends React.Component {




    componentDidMount() {
      if (this.props.user_status === null) {
        store.dispatch(loadUser());
      }
    }



    constructor(props) {
      super(props);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.state = {
        api_user_profiles: [],
        api_user_profiles_loading: true,
        api_user_profiles_avatar_image: null,
        //api_user_profiles_profile_photo_id: null,
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



    handleLocationChange = (selectedOption: any,) => {
      this.setState({ selectedOption });
      this.fetchTimeZone(selectedOption)
  };


  handleLocationInputChange = (inputValue: any, actionMeta: any) => {
     this.setState({ search_value: inputValue });
     this.setState({ location_typed: inputValue });
     console.log(this.state.location_typed)
   };



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



  render() {


    return(
      <Card>
        <CardHeader>
          <CardTitle tag="h5" className="mb-0 text-center">
            Profile Picture
          </CardTitle>
        </CardHeader>

        <CardBody>

              <div className="text-center">
                <ProfilePhoto
                  avatar_image={this.props.user_status.avatar_image}
                  avatar_letter = {this.props.user_status.avatar_letter}
                  avatar_color = {this.props.user_status.avatar_color}
                  avatar_size={"128px"}
                  letter_size={"64px"}
                  />
                <div className="mt-2">
                  <UploadProfilePicture
                    photo_change_flag = {this.handlerPhotoChange}
                    profile_picture_status = {this.props.user_status.avatar_image}
                    userid={this.props.user_status.pk}
                  />
                </div>
                <small>
                  For best results, use an image at least 128px by 128px in .jpg
                  format
                </small>
              </div>



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
