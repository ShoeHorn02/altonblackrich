import React from "react";
import store from "../../redux/store/index";
import { connect } from 'react-redux';
import SidebarMain from './SidebarMain'
import Loader from '../Loader'
import { loadUser } from '../../redux/actions/auth';

class Sidebar extends React.Component {


  componentDidMount() {
    if (this.props.user_status == null) {
      store.dispatch(loadUser());
    }
  }


  render() {
    if (this.props.user_status == null) {
      return <Loader />
    }
    return (
      <SidebarMain
        avatar_color={this.props.user_status.avatar_color}
        profile_photo={this.props.user_status.profile_photo}
        avatar_letter={this.props.user_status.avatar_letter}
        email_lower={this.props.user_status.email_lower} />
    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Sidebar);
