import React from "react";
import { Link } from "react-router-dom";
import store from "../../../redux/store/index";
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import {
  Home,
} from "react-feather";
import UnfollowButton from "../Buttons/UnfollowButton"
import FollowButton from "../Buttons/FollowButton"
import { connect } from 'react-redux';
import UploadProfilePicture from '../UploadProfilePhoto/Index'
import ProfilePhoto from '../ProfilePhoto/ProfilePhoto'




class Default extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imagecropped: null,
    }
  }



  renderUserButtons = () => {
    if (this.props.active_user_id === this.props.user_id && (this.props.avatar_image === null || this.props.avatar_image==="None" || !this.props.avatar_image) ){
      return(
        <UploadProfilePicture
          photo_change_flag = {this.props.photo_change_flag}
          profile_picture_status = {this.props.user_status.avatar_image}
        />
      )
    }

    else if (this.props.api_following_this_user_length >= 1) {
      return(
        <UnfollowButton
          followingid = {this.props.api_following_this_user[0].followed_user.derived__following_id}
          myid = {store.getState().auth.user.pk}
          user_id = {this.props.api_following_this_user[0].followed_user.id}
          currentTime = {this.props.api_following_this_user[0].derived__current_time}
          change_flag = {this.props.change_flag}
        />
      )
    }

    else if (this.props.active_user_id !== this.props.user_id) {
      return(
        <FollowButton
          myid = {store.getState().auth.user.pk}
          user_id = {this.props.user_id}
          change_flag = {this.props.change_flag}
          />
        )
      }
    }


  render() {
    return (
      <Card>
        <CardBody className="text-center">
            <ProfilePhoto
              avatar_image={this.props.avatar_image}
              avatar_color = {this.props.avatar_color}
              avatar_letter = {this.props.avatar_letter}
              avatar_size={"128px"}
              letter_size={"56px"}
              photo_change_flag = {this.props.photo_change_flag}
              active_user_id = {this.props.active_user_id }
              user_id = {this.props.user_id}
              />

          <CardHeader tag="h3" className="mb-0 mt-0 pb-0 pt-2 text-muted">
            {this.props.first_name} {this.props.last_name}
          </CardHeader>

          <div className="text-muted mt-0 pt-0 mb-2">{this.props.heading}</div>


          {this.props.location_flag === true ?
          <ul className="list-unstyled mb-0">
            <li className="mb-1">
              <Home width={14} height={14} className="mr-1" /> Lives in{" "}
              <Link to="/dashboard/default">San Francisco, SA</Link>
            </li>
          </ul>
          :
          null
        }

          <div className="mt-1">
            {this.renderUserButtons()}
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
