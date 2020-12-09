import React from "react";
import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Form,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { connect } from 'react-redux';
import LoaderSpin from "./LoaderSpin"
import store from "../../../redux/store/index";
import { unfollowUser, blockUser } from "../../../redux/actions/social";
import {
  Settings,
} from "react-feather";




async function UnFollowUser(a,b,c,d,e,z) {
  await store.dispatch(unfollowUser(a,b,c,d,e));
  await z.change_flag('1')
  }

async function BlockUser(y,z,a) {
  await store.dispatch(blockUser(y,z));
  await a.change_flag('1');
 }

class UnFollowButton extends React.Component {

  onSubmit = async (e) => {
    e.preventDefault();
    UnFollowUser(this.props.followingid,"true", this.props.currentTime,this.props.user_id,this.props.myid, this.props )
    this.setState({
      loadSpin: 1
    });
  };

  onSubmitSettings = async (e) => {
    e.preventDefault();
  };

  onBlock = async (e) => {
    BlockUser(this.props.myid,this.props.user_id, this.props)
  }

  constructor(props) {
    super(props);
    this.state = {
      loadSpin: 0
    };
  }

  render() {
    return (
      <ButtonGroup>

        <Form onSubmit={this.onSubmit}>
        {this.state.loadSpin===0?
          <Button className= "custombutton mr-1" outline color="primary" size="sm"> <span>Following! </span> </Button>
          :
          <Button className= " mr-1" outline color="primary" size="sm" disabled> <LoaderSpin/></Button>
        }
        </Form>

        <Form onSubmit={this.onSubmitSettings}>
          <UncontrolledButtonDropdown  className="mr-1 " size="sm" outline>
            <DropdownToggle  color="primary" outline>
              <Settings width={16} height={16} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => {this.onBlock();}}>Block Athlete</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </Form>

      </ButtonGroup>

    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.currentTheme,
});
export default connect(mapStateToProps, {  })(UnFollowButton);
