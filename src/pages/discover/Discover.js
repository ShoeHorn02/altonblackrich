import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import Loader from "../../components/Loader";
import FollowingLazy from './FollowingLazy'
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
} from "reactstrap";

class Discover extends React.Component {



  componentDidMount() {

  }

  constructor(props) {
    super(props);
    this.state = {
      api_discover_profiles : [],
      api_discover_profiles_loading: true,
      follow_change_flag: 0,
    };
  }

  handler = (val) => {
    this.setState({
      follow_change_flag: val
    })
  }

  render() {
    if (this.props.user_status == null) {
      return <Loader />
    }

    return (

      <Container fluid>
        <Header>
          <HeaderTitle> Athletes</HeaderTitle>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard">Discover</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Athletes</BreadcrumbItem>
          </Breadcrumb>


        </Header>


      <FollowingLazy
      list = {"discover"}
        />

        </Container>
  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Discover);
