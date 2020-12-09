import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
} from "reactstrap";
import { connect } from 'react-redux';
import {
  MapPin,
} from "react-feather";



class Default extends React.Component {





  render() {
    return (
      <Card>
      <CardBody>
        <CardTitle tag="h5">About</CardTitle>
        <ul className="list-unstyled mb-0">
          <li className="mb-1">
            <MapPin width={14} height={14} className="mr-1" /> From{" "}
            <Link to="/dashboard/default">{this.props.location}</Link>
          </li>
        </ul>
      </CardBody>
      </Card>

    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
