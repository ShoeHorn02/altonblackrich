import React from "react";
import {
  TabContent,
  Button,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown
 } from "reactstrap";
import TimelineLazy from "../../../components/Social/Timeline/TimelineLazy";
import StartAPostModal from "../../../components/Social/Timeline/StartAPostModal";
import classnames from "classnames";
import { connect } from 'react-redux';


class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "AllActivity"
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
    return (
      <section className="flex-fill w-100">
        <div className="  mb-4" class="d-flex justify-content-between mb-2" style={{'border-bottom':'1px solid white'}}>
          <Nav tabs class="p-2">
            <NavItem >
              <NavLink
              style={this.state.activeTab === "YouOnly"? {color:"#d4d7da", cursor: 'pointer'} : null}
                className={classnames({ active: this.state.activeTab === "AllActivity" })}
                onClick={() => {
                  this.toggle("AllActivity");
                }}
              >
                 All Activity
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink
                style={this.state.activeTab === "AllActivity"? {color:"#d4d7da", cursor: 'pointer'} : null }
                className={classnames({ active: this.state.activeTab === "YouOnly" })}
                onClick={() => {
                  this.toggle("YouOnly");
                }}
              >
                 You Only
              </NavLink>
            </NavItem>
          </Nav>


          <StartAPostModal />

        </div>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="AllActivity">


            <TimelineLazy
            list = {"you_and_following"}
              />


          </TabPane>
        </TabContent>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="YouOnly">

            <TimelineLazy
            list = {"you_only"}
            />


          </TabPane>
        </TabContent>
      </section>
  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  general: state.general.isLoading,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Timeline);
