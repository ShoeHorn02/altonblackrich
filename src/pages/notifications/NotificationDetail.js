import React from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  CardTitle,
  Table
} from "reactstrap";
import { connect } from 'react-redux';
import ProfilePhoto from '../../components/Social/ProfilePhoto/ProfilePhoto'
import { MoreVertical, RefreshCw } from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faUser,
  faThumbsUp
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
