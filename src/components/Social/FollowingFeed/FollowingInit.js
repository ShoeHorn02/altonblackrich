import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
 } from "reactstrap";
import classnames from "classnames";
import FollowingCapped from "../../../components/Social/FollowingFeed/FollowingCapped";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";

import {
  User,
} from "react-feather";


class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "Followers"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }







  renderFollowers = () => {
    if (this.props.api_user_followers_count === 0 && this.props.user_id === store.getState().auth.user.pk) {
      return(
        <div className="text-center pr-2 pl-2 pb-2">
          <h4 className="tab-title">Followers</h4>
          <User width={54} height={54} style={{border:"1px solid black", "borderRadius": "50%", padding: "10px"}} />
          <p className="mt-1 mb-1">
            You'll see all the people who follow you here.
          </p>
        </div>
      )
    }
    else if (this.props.api_user_followers_count === 0 && this.props.user_id !== store.getState().auth.user.pk) {
      return(
        <div className="text-center pr-2 pl-2 pb-2">
          <h4 className="tab-title">Followers</h4>
          <User width={54} height={54} style={{border:"1px solid black", "borderRadius": "50%", padding: "10px"}} />
          <p className="mt-1 mb-1">
            {this.props.first_name} has no followers yet.
          </p>
        </div>
      )
    }
      return(
        <FollowingCapped
          user_profiles = {this.props.api_user_followers}
          user_profiles_length = {this.props.api_user_followers_count}
          direction_flag = {"follower"}
          user_id = {this.props.user_id}
          />
      )
  }



  renderFollowing = () => {
    if (this.props.api_user_following_count === 0 && this.props.user_id === store.getState().auth.user.pk) {
      return(
        <div className="text-center pr-2 pl-2 pb-2">
          <h4 className="tab-title">Following</h4>
          <User width={54} height={54} style={{border:"1px solid black", "borderRadius": "50%", padding: "10px"}} />
          <p className="mt-1 mb-1">
            You'll see all the people who you follow here.
          </p>
        </div>
      )
    }
    else if (this.props.api_user_following_count === 0 && this.props.user_id !== store.getState().auth.user.pk) {
      return(
        <div className="text-center pr-2 pl-2 pb-2">
          <h4 className="tab-title">Following</h4>
          <User width={54} height={54} style={{border:"1px solid black", "borderRadius": "50%", padding: "10px"}} />
          <p className="mt-1 mb-1">
            {this.props.first_name} is not following anybody yet.
          </p>
        </div>
      )
    }
      return(
        <FollowingCapped
          user_profiles = {this.props.api_user_following}
          user_profiles_length = {this.props.api_user_following_count}
          direction_flag = {"following"}
          user_id = {this.props.user_id}
          />
      )
  }

  render() {
    const {  className } = this.props;
    return (
      <div className={"tab " + className}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "Followers" })}
              onClick={() => {
                this.toggle("Followers");
              }}
            >
              {this.props.api_user_followers_count} Followers
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "Following" })}
              onClick={() => {
                this.toggle("Following");
              }}
            >
              {this.props.api_user_following_count} Following
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="pl-0 pr-0 mr-0 ml-0 pb-0 mb-0">
          <TabPane tabId="Followers">

            { this.renderFollowers() }


          </TabPane>
          <TabPane tabId="Following">

            { this.renderFollowing() }
          </TabPane>
        </TabContent>
      </div>
  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  general: state.general.isLoading,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Timeline);
