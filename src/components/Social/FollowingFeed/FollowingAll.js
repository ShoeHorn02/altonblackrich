import React from "react";
import { loginFlag } from '../../../redux/actions/auth';
import store from "../../../redux/store/index";
import { followUser } from "../../../redux/actions/social";
import { Link } from "react-router-dom";
import {
  CardBody,
  Media,
} from "reactstrap";
import { connect } from 'react-redux';
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto'

class FollowingAll extends React.Component {

  componentDidMount() {
    store.dispatch(loginFlag());
  }

  constructor(props) {
    super(props);
    this.state = {
      cap: 5
    };
  }

  renderProfileDirectional = (y,x,cap) => {
    return(
      <Media>


      <ProfilePhoto
        avatar_image= {y.avatar_image}
        avatar_letter = {y.avatar_letter}
        avatar_color = {y.avatar_color}
        avatar_size={"56px"}
        />



        <Media body   className="ml-2">
        <Link to={"/profile/" + y.id + "/home" }>
            <p className="my-1" style={{color:"black"}}>
              <strong>{y.username}</strong>
            </p>
          </Link>

        </Media>
      </Media>
      )
  }

  renderProfileAvatar = (direction_flag, x) => {
    if (direction_flag === "following") {
      return(
        <div>
        { this.renderProfileDirectional(x.followed_user, x) }
        </div>
      )
    }
    else if (direction_flag === "follower") {
      return(
        <div>
        { this.renderProfileDirectional(x.user_id_xref, x) }
        </div>
      )
    }
  }

  renderProfiles = (input_data, direction_flag, cap) => {
      return(
        <div>
          {input_data.map((x,y,arr) =>
            <div>
              {this.renderProfileAvatar(direction_flag, x)}
              <hr className="my-2" />
            </div>
          )}
        </div>
      )
  }

  render() {
      return (
        <CardBody>
          {this.renderProfiles(this.props.user_profiles, this.props.direction_flag)}
        </CardBody>
      );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.currentTheme,
});

export default connect(mapStateToProps, { followUser })(FollowingAll);
