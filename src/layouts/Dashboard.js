import React from "react";
import { connect } from "react-redux";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar/Sidebar";
import Main from "../components/Main";
import Navbar from "../components/Navbar/Navbar";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Dashboard = ({ sidebar, children }) => (
  <React.Fragment>
    <Wrapper>
      {!sidebar.isOnRight && <Sidebar />}
      <Main>
        <Navbar />
        <Content>{children}</Content>
        <Footer />
      </Main>
      {sidebar.isOnRight && <Sidebar />}
    </Wrapper>
  </React.Fragment>
);


const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  sidebar: state.sidebar
});

export default connect(mapStateToProps, {  })(Dashboard);
