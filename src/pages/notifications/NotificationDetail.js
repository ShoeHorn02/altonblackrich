import React from "react";
import { loginFlag } from '../../redux/actions/auth';
import store from "../../redux/store/index";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  Media,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  CardTitle,
  Table,
  Badge
} from "reactstrap";
import UnfollowButton from "../../components/Social/Buttons/UnfollowButton"
import FollowButton from "../../components/Social/Buttons/FollowButton"
import { connect } from 'react-redux';
import ProfilePhoto from '../../components/Social/ProfilePhoto/ProfilePhoto'
import { MoreVertical, RefreshCw } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";
import { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../../assets/img/avatars/avatar-5.jpg";

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





class Following extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      referrer: null,
    };
  }

  componentDidMount() {
    console.log(this.props.api_notification)
  }

  test(x) {
    console.log(x)
  }

  render() {
  const {referrer} = this.state;
  if (referrer) {
     return <Redirect to={referrer} />;
   }
   else if (this.props.api_notification.length === 0){
     return(
       null
     )
   }
    return (

      <Card>
        <CardHeader>
          <div className="card-actions float-right">
            <span className="cursor-pointer mr-1">
              <RefreshCw />
            </span>{" "}
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle tag="a">
                <MoreVertical />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <CardTitle tag="h5" className="mb-0">
          {this.props.title} ({this.props.api_notification.length})
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table className="mb-0" hover>
            <tbody>
            {this.props.api_notification.map((x,y) =>
              <tr>
                <td onClick={() => this.test(2)}>

                  <ProfilePhoto
                    avatar_image={x.avatar_image}
                    avatar_color = {x.avatar_color}
                    avatar_letter = {x.avatar_letter}
                    avatar_size={"32px"}
                    letter_size={"18px"}
                    active_user_id = {this.props.active_user_id }
                    user_id = {x.user_id}
                    />

                </td>
                <td>
                { x.event === 1 ?
                    <FontAwesomeIcon icon={faUser} className="text-danger" />
                  :
                   x.event === 2 ?
                   <FontAwesomeIcon icon={faThumbsUp} className="text-primary" />
                  :
                  x.event === 3 ?
                  <FontAwesomeIcon icon={faComments} className="text-success" />
                  :
                  null
                  }
                </td>
                <td onClick={() => this.test(3)}>
                  {x.memo}
                </td>
                <td onClick={() => this.test(3)} className="float-right">
                  {x.historic_time}
                </td>
              </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

    );
  }
}

const mapStateToProps = (state) => ({
  user_id: state.auth.user.pk,
  user_status: state.auth.user,
});
export default connect(mapStateToProps, {  })(Following);
