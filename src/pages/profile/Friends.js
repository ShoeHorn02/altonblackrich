import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
 } from "reactstrap";
import classnames from "classnames";
import FollowingAll from "../../components/Social/FollowingFeed/FollowingAll";
import { connect } from 'react-redux';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { className } = this.props;
    return (
      <div className={"tab " + className}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Following ({this.props.api_user_following.length})
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Followers ({this.props.api_user_followers.length})
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <FollowingAll
              user_profiles = {this.props.api_user_following}
              user_profiles_length = {this.props.api_user_following.length}
              direction_flag = {"following"} />
          </TabPane>
          <TabPane tabId="2">
            <FollowingAll
              user_profiles = {this.props.api_user_followers}
              user_profiles_length = {this.props.api_user_followers.length}
              direction_flag = {"follower"} />
          </TabPane>
          <TabPane tabId="3">
            <h4 className="tab-title">One more</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor tellus eget condimentum rhoncus. Aenean
              massa. Cum sociis natoque penatibus et magnis neque dis parturient
              montes, nascetur ridiculus mus.
            </p>
            <p>
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo.
            </p>
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
