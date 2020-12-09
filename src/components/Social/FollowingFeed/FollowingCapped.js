import React from "react";
import { loginFlag } from '../../../redux/actions/auth';
import store from "../../../redux/store/index";
import { followUser } from "../../../redux/actions/social";
import { Link } from "react-router-dom";
import {
  Button,
  CardBody,
  Media,
} from "reactstrap";
import { connect } from 'react-redux';
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto'

class FollowingCapped extends React.Component {

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
    console.log(y)
    return(
        <Media >

        <Link to={"/profile/" + y.pk + "/home" } style={{color:"black",'textDecoration':'none'}}>
        <ProfilePhoto
          avatar_image= {y.avatar_image}
          avatar_letter = {y.avatar_letter}
          avatar_color = {y.avatar_color}
          avatar_size={"56px"}
          letter_size={"28px"}
          />
          </Link>


          <Media body   className="ml-2">
          <Link to={"/profile/" + y.pk + "/home" } style={{color:"black",'textDecoration':'none'}}>
              <p className="my-1" style={{color:"black"}}>
                <strong>{y.firstname_lastname}</strong>
              </p>

              <p className="my-1 text-muted" style={{color:"black"}}>
                {y.heading}
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
            <div key={y}>
              {y< cap ?
                <div>
                  {this.renderProfileAvatar(direction_flag, x)}
                  {y+1 === input_data.length ? null : <hr className="my-2" />}
                </div>
              :
                null
              }
            </div>
          )}
        </div>
      )
  }

  renderSeeAllButton = (length,user_id,cap) => {
    if (length > cap) {
      return(
        <Button
          color="primary"
          className = ""
          block
          tag={Link}
          to={"/profile/" + user_id + "/following"}
          >
          See All
        </Button>
      )
    }
  }

  render() {
      return (
        <CardBody>
          {this.renderProfiles(this.props.user_profiles, this.props.direction_flag, this.state.cap)}
          {this.renderSeeAllButton(this.props.user_profiles_length, this.props.user_id, this.state.cap)}
        </CardBody>
      );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.currentTheme,
});

export default connect(mapStateToProps, { followUser })(FollowingCapped);
