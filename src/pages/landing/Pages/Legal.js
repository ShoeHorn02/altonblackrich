import React from "react";
import classnames from "classnames";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Terms from './Terms'
import Cookie from './Cookie'
import Security from './Security'
import Privacy from './Privacy'
import Header from '../Header'
import Footer from '../Footer'
import { Container, Row, Col,

  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  } from "reactstrap";

class TabsWithTextLabel extends React.Component {
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
    const { name, className } = this.props;

    return (
      <div className={"tab " + className, "text-dark", "mt-4", "vh-100"}  style={{'box-shadow':'0px 0px'}}>
        <Nav tabs className="p-0 m-0 " style={{'box-shadow':'0px 0px'}}>
          <NavItem className>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1"})}
              style={this.state.activeTab === "1" ? {backgroundColor:'bg-light'} : null}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Terms of Service
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Privacy Notice
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              Cookie Policy
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Security Overview
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} style={{'box-shadow':'0px 0px'}}>
          <TabPane tabId="1" className="">
            <h2 className="tab-title mt-5">Terms of Service</h2>
              <Terms />
          </TabPane>
          <TabPane tabId="2">
            <h4 className="tab-title mt-5">Privacy Notice</h4>
              <Privacy />
          </TabPane>
          <TabPane tabId="3">
            <h4 className="tab-title mt-5">Cookie Policy</h4>
              <Cookie />
          </TabPane>
          <TabPane tabId="4">
            <h4 className="tab-title mt-5">Security Overview</h4>
              <Security />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}


class LandingMain extends React.Component {



  renderHeader = () => {
    return(
      <Row className="align-items-center" >

        <Col md="12">

          <h1 class="display-3 mb-2">
            Privacy and Terms
          </h1>
          <hr class="my-3 my-md-4"/>

        </Col>
        <Col className="col-auto">

        </Col>
      </Row>
    )
  }


  renderTerms = () => {
    return(
      <Row className="align-items-center">

        <Col md="12">

          <h1 class="display-4 mb-2">
            Timer Privacy & Terms Overview
          </h1>

          <p class="font-size-lg mb-md-2">

          </p>

          <p class="font-size-lg mb-md-2">
          Thank you for using Timers
          </p>


          <p class="font-size-lg mb-md-2">
          This app does not guarntee anything. Do not use this app for any accuracy. We do not
          </p>





        </Col>
        <Col className="col-auto">

        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div >

      <section className="landing-intro mt-5 pt-5 bg-light vh-100 pb-5 text-dark" style={{overflow:'hidden'}}>
      <Container>
        {this.renderHeader()}
        {this.renderTerms()}



      </Container>
      </section>

      <div className="py-4 font-weight-light bg-gray-800 text-gray-300">
          <Container>
              <Row className="align-items-center">
                  <Col md="12" className="align-items-center text-md-center text-muted">
                      <p className=" mb-md-0">
                          © 2020, Ironroom inc.
                      </p>
                  </Col>
                  <Col md="6">

                  </Col>
              </Row>
          </Container>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(LandingMain);
