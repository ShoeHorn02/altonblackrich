import React from "react";
import LoaderSpin from "./LoaderSpin"
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
import store from "../../../redux/store/index";
import { followUser, blockUser } from "../../../redux/actions/social";
import {
  Settings,
} from "react-feather";



async function FollowUser(y,z,a) {
  await store.dispatch(followUser(y,z));
  await a.change_flag('1');
 }

 async function BlockUser(y,z,a) {
   await store.dispatch(blockUser(y,z));
   try {
     console.log('testtest')
     await a.change_flag('1','2');
   }
   catch(err) {
     console.log('test')
   }
  }


class Following extends React.Component {

  onSubmit = async (e) => {
    e.preventDefault();
    FollowUser(this.props.myid,this.props.user_id, this.props)
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
          <Button className= " mr-1 btn-pill" color="primary" size="sm" > Follow </Button>
          :
          <Button className= " mr-1 btn-pill" color="primary" size="sm" disabled> <LoaderSpin/></Button>
        }
        </Form>

        <Form onSubmit={this.onSubmitSettings}>
          <UncontrolledButtonDropdown  className="mr-1 " size="sm" outline="true">
            <DropdownToggle  color="primary" >
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
export default connect(mapStateToProps, {  })(Following);
