import React from "react";
import Select from 'react-select'
import {  withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { toggleSidebar } from "../../redux/actions/sidebarActions";
import { logout } from "../../redux/actions/auth";
import store from "../../redux/store/index";
import { Link } from 'react-router-dom';
import { loadUser } from '../../redux/actions/auth';
import { SOCKET_URL } from '../../redux/actions/API'
import ProfilePhoto from '../Social/ProfilePhoto/ProfilePhoto'
import { toastr } from "react-redux-toastr";
import {
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import {
  PieChart,
  Settings,
  User,
} from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faUser,
  faPlusCircle,
  faEnvelopeOpen,
  faBell,
  faThumbsUp,
  faComment
} from "@fortawesome/free-solid-svg-icons";



import {API_USER_PROFILES } from '../../redux/actions/API';
import { notificationBell } from '../../redux/actions/social';
import axios from "axios";
import { keyConfig } from '../../redux/actions/auth';


async function TurnOffNotificationsBell(userid, fetchMessages) {
  await store.dispatch(notificationBell(userid, "false"));
  await fetchMessages(1)
 }


const NavbarDropdown = ({children, count, header, footer, icon, active, indicator, user_pk, fetchMessages}) => (
  <UncontrolledDropdown nav inNavbar className="ml-lg-1" active={active} onClick={() => TurnOffNotificationsBell(user_pk, fetchMessages)}>
    <DropdownToggle nav className="nav-icon dropdown-toggle position-relative">
      <FontAwesomeIcon icon={icon} className="align-middle"  />
      {indicator ? <span className="indicator" /> : ""}
    </DropdownToggle>
    <DropdownMenu right className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>

        <ListGroup header="true" className="dropdown-menu-footer" tag={Link} to="/notifications">
          <span className="text-muted">{footer}</span>
        </ListGroup>

    </DropdownMenu>
  </UncontrolledDropdown>
);

const NavbarDropdownItem = ({ icon, title, description, time, spacing, link }) => (
  <ListGroupItem tag={Link} to={link}>
    <Row noGutters className="align-items-center">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={spacing ? "pl-2" : null}>
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroupItem>
);

const NavbarToggle = connect(store => ({
  app: store.app
}))(({ dispatch }) => {
  return (
    <span
      className="sidebar-toggle d-flex mr-2"
      onClick={() => {
        dispatch(toggleSidebar());
      }}
    >
      <i className="hamburger align-self-center" />
    </span>
  );
});



const NavbarDropdowns = connect(store => ({
  sidebar: store.sidebar
}))(({ sidebar, dispatch, ...props }) => {
  return (
    <Collapse navbar>
      <Nav className={!sidebar.isOnRight ? "ml-auto" : "mr-auto"} navbar >

      <UncontrolledDropdown nav inNavbar className="ml-lg-1">
        <DropdownToggle nav caret>
          <FontAwesomeIcon icon={faPlusCircle} className="align-middle" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <FontAwesomeIcon
              icon={faUser}
              fixedWidth
              className="mr-2 align-middle"
            />
            Add Workout
          </DropdownItem>
          <DropdownItem>
            <FontAwesomeIcon
              icon={faComments}
              fixedWidth
              className="mr-2 align-middle"
            />
            Add Exercise
          </DropdownItem>


        </DropdownMenu>
      </UncontrolledDropdown>


      <NavbarDropdown
        header="Recent Notifications"
        footer="Show all notifications"
        icon={faBell}
        count={props.new_notification_count}
        indicator = {props.display_notification_flag}
        user_pk = {props.user_pk}
        fetchMessages = {props.fetchMessages}
      >
        {props.notifications1 ? props.notifications1.map((item, key) => {
          let icon = (
            <FontAwesomeIcon icon={faEnvelopeOpen} className="text-warning" />
          );

          if (item.event === 1) {
            icon = <FontAwesomeIcon icon={faUser} className="text-danger" />;
          }

          if (item.event === 2) {
            icon = (
              <FontAwesomeIcon icon={faThumbsUp} className="text-primary" />
            );
          }

          if (item.event === 3) {
            icon = (
              <FontAwesomeIcon icon={faComment} className="text-success" />
            );
          }

          return (
            <NavbarDropdownItem
              key={key}
              icon={icon}
              title={item.title}
              description={item.memo}
              time={item.timestamp}
              link={item.event === 1? "/profile/" + item.user_id + "/home":
                    item.event === 2? "/profile/" + props.user_pk + "/workout/" + item.link_id:
                    item.event === 3? "/profile/" + props.user_pk + "/workout/" + item.link_id:
                null}



            />
          );
        }) : null}
      </NavbarDropdown>


        <UncontrolledDropdown nav inNavbar>
          <div className="d-inline-block d-sm-none">
            <DropdownToggle nav caret>
              <Settings size={18} className="align-middle" />
            </DropdownToggle>
          </div>



          <div className="d-none d-sm-block">
            <DropdownToggle nav caret>

              <span className="d-none d-sm-inline-block">

                  <ProfilePhoto
                    avatar_image={props.avatar_image}
                    avatar_color = {props.avatar_color}
                    avatar_letter = {props.avatar_letter}
                    avatar_size={"32px"}
                    letter_size={"16px"}
                    />

            </span>

          <span

          className="pl-1"
          style={{
            "display": "flex",
            "alignItems": "center",
            "justifyContent": "center",
            "border":"none",
            "fontFamily": "sans-serif",
            "float":"right",
          }}
          >{props.first_name + ' ' + props.last_name} &#9662;</span>
          </DropdownToggle>
          </div>


          <DropdownMenu right>
            <DropdownItem tag={Link} to={'/profile/' + props.user_pk  + '/home'}>
              <User size={18} className="align-middle mr-2" />
              My Profile
            </DropdownItem>
            <DropdownItem>
              <PieChart size={18} className="align-middle mr-2" />
              Analytics
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag={Link} to={'/settings/account'}>
              Settings & Privacy</DropdownItem>
            <DropdownItem>Help</DropdownItem>
            <DropdownItem
            onClick={() => {
              dispatch(logout());
            }}>
            Sign out</DropdownItem>
          </DropdownMenu>

        </UncontrolledDropdown>



      </Nav>
    </Collapse>
  );
});



const customStyles = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: 14,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    width: '250px',
    background: '#f8f9fa'

  }),



  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? '#e9ecef' : 'white',
      color: isFocused ? 'black' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    fontFamily: 'Arial, Helvetica, sans-serif',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'green',
  }),
}

class Navbar_Main extends React.Component {

  fetchInitial = () =>  {
    axios.get(`${API_USER_PROFILES}`, keyConfig(store.getState)).then(res => {
      this.setState({
        user_profiles_api: res.data,
        user_profiles_search_api: res.data.map(({ id,username }) => {return{value: username, label: username, id: id }}),
      });
    });
  }




  componentDidMount() {
    if (this.props.user_status == null) {
      store.dispatch(loadUser());
    }
    if (this.props.user_status !== null && this.props.auth !== null) {
      this.fetchInitial();
      this.waitForSocketConnection();
    }
  }



   componentWillUnmount() {
     this.disconnect();
}



    componentDidUpdate() {
      if (this.state.socketState === 1 && this.state.fetchInitial === 0 && this.props.user_status) {
        this.setState({
          fetchInitial: 1,
        });
        this.fetchMessages();
      }
      if (this.state.display_notification_trigger === 1) {
        this.setState({
          display_notification_trigger: 0,
        });
        this.fetchMessages();
      }
    }


    sendMessage(data) {
      try {
        this.socketRef.send(JSON.stringify({ ...data }));
      }
      catch(err) {
        console.log(err.message);
      }
    }



    fetchMessages() {
      this.sendMessage({
        command: "fetch_latest",
        user_id: this.props.user_status.pk
      });
    }






    waitForSocketConnection(callback) {
      const component = this;
      setTimeout(function() {
        if (component.state.socketState === 1) {
          console.log("Connection is made");
          //callback();
          return;
        } else {
          console.log("wait for connection...");
          component.connect();
        }
      }, 500);
    }


     connect(chatUrl) {
       const path = `${SOCKET_URL}/ws/notifications/${this.props.auth.key}/`;
       this.socketRef = new WebSocket(path);
       //this.socketRef.close();
       if (this.socketRef.readyState === 1) {
         return;
       }
       console.log(path)
       this.socketRef.onopen = () => {
         console.log('WebSocket open');
         this.setState({
           socketState: 1,
         });
       };
       this.socketRef.onmessage = e => {
         this.socketNewMessage(e.data);
         //console.log(e.data)
       };
       this.socketRef.onerror = e => {
         console.log(e.message);
       };
       this.socketRef.onclose = () => {
         console.log("WebSocket closed let's reopen");
         this.waitForSocketConnection();
       };
     }


     socketNewMessage(data) {
       const parsedData = JSON.parse(data);
       this.setState({
         notifications: parsedData.messages,
         new_notification_count: parsedData.new_notification_count,
         display_notification_flag: parsedData.display_notification_flag
       });
       if (this.state.display_notification_initial === 0) {
         this.setState({
           display_notification_initial: 1
         })
       }
       else if (parsedData.display_notification_flag && this.state.display_notification_initial ===1) {
          this.showToastr(parsedData.messages[0].memo)
       }
     }



  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      timeline_api:[],
      user_profiles_api : [],
      user_profiles_search_api: [],
      workouts_popular: null,
      orig_status: null,
      api_timeline_loading: true,
      api_profiles_loading: true,
      api_user_profile_detail_loading: true,
      current_member_id: null,
      selectedOption: null,
      search_value: null,
      socketRef: null,
      socketState: null,
      fetchInitial: 0,
      notifications: [],
      new_notification_count: null,
      display_notification_flag: null,
      display_notification_trigger: 0,
      display_notification_initial: 0,

      title: "",
      message: "",
      type: "info",
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "bottom-right"
    };
  }


  disconnect() {
    try{this.socketRef.close()} catch(e) { console.error(e); }
  }


  showToastr(memo) {
    const options = {
      timeOut: parseInt(this.state.timeOut),
      showCloseButton: this.state.showCloseButton,
      progressBar: this.state.progressBar,
      position: this.state.position
    };

    const toastrInstance =
      this.state.type === "info"
        ? toastr.info
        : this.state.type === "warning"
        ? toastr.warning
        : this.state.type === "error"
        ? toastr.error
        : toastr.success;

    toastrInstance(
      this.state.title,
      this.state.message || memo,
      options
    );
  }




  notificationBell = (val) => {
    this.setState({
      display_notification_trigger: val
    })
}


  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
   // code to make something happen after selecting an option
   this.props.history.push(`/timeline/member/${selectedOption.id}/home`);
}

  handleInputChange = (inputValue: any, actionMeta: any) => {
   this.setState({ search_value: inputValue });
 };


  onKeyDown = e => {
  if (e.keyCode === 13) {
    // do stuff
    this.props.history.push(`/discover/${this.state.search_value}`);
  }
};

  render() {

    if (this.props.user_status == null) {
        return null
      }

    return (
      <Navbar expand className="navbar-theme">
        <React.Fragment>
          <NavbarToggle />
          <Select
            value={this.state.selectedOption}
            options={this.state.user_profiles_search_api}
            onChange={this.handleChange}
            placeholder= "Search people to follow..."
            openMenuOnClick={false}
            styles={customStyles}
            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
            onKeyDown={this.onKeyDown}
            onInputChange={this.handleInputChange}
            noOptionsMessage={() => null}
          />
          <NavbarDropdowns
            email_lower = {this.props.user_status.email_lower}
            avatar_letter = {this.props.user_status.avatar_letter}
            avatar_color = {this.props.user_status.avatar_color}
            avatar_image= {this.props.user_status.avatar_image}
            username = {this.props.user_status.username}
            first_name = {this.props.user_status.first_name}
            last_name = {this.props.user_status.last_name}
            user_pk = {this.props.user_status.pk}
            notifications1 = {this.state.notifications}
            new_notification_count = {this.state.new_notification_count}
            display_notification_flag = {this.state.display_notification_flag}
            fetchMessages = {this.notificationBell}
            />
        </React.Fragment>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  auth: state.auth,
  sidebar: store.sidebar,
});

export default connect(mapStateToProps, {  })(withRouter(Navbar_Main));
