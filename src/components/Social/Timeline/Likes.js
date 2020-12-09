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

  renderProfileDirectional = (x) => {
    return(
        <Media className="d-flex justifyContent-start" >


        <ProfilePhoto
          profile_photo= {x.liking_user_id_xref.profile_photo}
          avatar_letter = {x.liking_user_id_xref.avatar_letter}
          avatar_color = {x.liking_user_id_xref.avatar_color_xref}
          avatar_size={"56px"}
          letter_size={"28px"}
          />



          <Media body className="d-flex justifyContent-start ml-2" >
          <Link to={"/profile/" + x.liking_user_id_xref.id + "/home" }>
            <div>
              <p className="my-1" style={{color:"black"}}>
                <strong>{x.liking_user_id_xref.first_name + ' ' + x.liking_user_id_xref.last_name}</strong>
              </p>
            </div>
            <div>
              <p className="my-1 text-muted" >
                {x.liking_user_id_xref.first_name + ' ' + x.liking_user_id_xref.last_name}
              </p>
              </div>
            </Link>

          </Media>
        </Media>
      )
  }



  renderProfiles = (input_data) => {
      return(
        <div>
          {input_data.map((x,y,arr) =>
                <div>
                  {this.renderProfileDirectional(x)}
                  {y+1 === input_data.length ? null : <hr className="my-2" />}
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
          {this.renderProfiles(this.props.likes)}
        </CardBody>
      );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.currentTheme,
});

export default connect(mapStateToProps, { followUser })(FollowingCapped);
