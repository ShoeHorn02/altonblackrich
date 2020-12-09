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
import {
  API_BASE_MEDIA_URL
} from '../../../redux/actions/API';

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

  renderAlbumAvatar = (x, user_id) => {
    return(
      <Media>
        <Link to={"/profile/" + user_id + "/albums/" + x.id}>
        <img
          src={API_BASE_MEDIA_URL + x.cover_image}
          width="56"
          height="56"
          className=" mr-2"
          alt="Chris Wood"
        />
        </Link>
        <Media body>
          <p className="my-1">
            <strong>{x.album_name}</strong>
          </p>
          <span> sum </span>
        </Media>
      </Media>
      )
  }



  renderAlbums = (input_data, cap, user_id) => {
      return(
        <div>
          {input_data.map((x,y,arr) =>
            <div key={y}>
              {y< cap ?
                <div>
                  {this.renderAlbumAvatar(x, user_id)}
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
          to={"/profile/" + user_id + "/albums"}
          >
          See All
        </Button>
      )
    }
  }

  render() {
      return (
        <CardBody>
          {this.renderAlbums(this.props.albums, this.state.cap, this.props.user_id)}
          {this.renderSeeAllButton(this.props.albums_count, this.props.user_id, this.state.cap)}
        </CardBody>
      );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.currentTheme,
});

export default connect(mapStateToProps, { followUser })(FollowingCapped);
