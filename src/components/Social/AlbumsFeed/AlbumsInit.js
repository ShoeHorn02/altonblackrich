import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
 } from "reactstrap";
import classnames from "classnames";
import AlbumsCapped from "./AlbumsCapped";
import { connect } from 'react-redux';


import {
  Camera,
} from "react-feather";


class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "Albums"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }







  renderAlbums = () => {
    if (this.props.albums_count === 0 && this.props.user_id === this.props.user_status.pk) {
      return(
        <div className="text-center pr-2 pl-2 pb-2">
          <h4 className="tab-title">Albums</h4>
          <Camera width={54} height={54} style={{border:"1px solid black", "borderRadius": "50%", padding: "10px"}} />
          <p className="mt-1 mb-1">
            You'll see all your albums here.
          </p>
        </div>
      )
    }
    else if (this.props.albums_count === 0 && this.props.user_id !== this.props.user_status.pk) {
      return(
        <div className="text-center pr-2 pl-2 pb-2">
          <h4 className="tab-title">Albums</h4>
          <Camera width={54} height={54} style={{border:"1px solid black", "borderRadius": "50%", padding: "10px"}} />
          <p className="mt-1 mb-1">
            {this.props.first_name} has no Albums yet.
          </p>
        </div>
      )
    }
      return(
        <AlbumsCapped
          albums = {this.props.albums}
          albums_count = {this.props.albums_count}
          user_id = {this.props.user_id}
          />
      )

  }




  render() {
    const { className } = this.props;
    return (
      <div className={"tab " + className}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "Albums" })}
              onClick={() => {
                this.toggle("Albums");
              }}
            >
              {this.props.albums_count} Albums
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="pl-0 pr-0 mr-0 ml-0 pb-0 mb-0">
          <TabPane tabId="Albums">
            { this.renderAlbums() }
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
