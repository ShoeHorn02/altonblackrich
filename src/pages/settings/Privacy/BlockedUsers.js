import React from "react";
import { toastr } from "react-redux-toastr";
import {
  Button,
  Card,
  Media,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  Input,
} from "reactstrap";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import {
  API_USER_BLOCK_MASTER,
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto'
import BlockedUsersDetail from './BlockedUsersDetail'



class Default extends React.Component {



  fetchInitial = () =>  {
    axios.get(`${API_USER_BLOCK_MASTER}`, keyConfig(store.getState)).then(res => {
      this.setState({
        api_blocked_users : res.data,
        api_blocked_users_loading: false,
        form_change_flag: 0,
      });
      console.log(res.data)
    })
  }

  componentDidMount() {
    if (this.props.user_status === null) {
      store.dispatch(loadUser());
    }
    this.fetchInitial();
  }



  handlerUnblockReload = (val) => {
    this.setState({
      reload: val
    })
  }

  componentDidUpdate() {
    if (this.state.reload === 1) {
      this.fetchInitial();
      this.setState({
        reload: 0,
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      current: null,
      password1: null,
      password2: null,
      title: "",
      message: "New password has been saved.",
      type: "success",
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right",
      result: null,
      errors: [],
      success: [],
      myValueCurrent: '',
      myValuePwd1: '',
      myValuePwd2: '',
      api_blocked_users_loading: true,
      reload: 0
    };
  }

  clearData(){
    this.setState({
      myValueCurrent: '',
      myValuePwd1: '',
      myValuePwd2: ''
    })
  }

  showToastr = (val) => {
    console.log(val)
    const options = {
      timeOut: parseInt(this.state.timeOut),
      showCloseButton: this.state.showCloseButton,
      progressBar: this.state.progressBar,
      position: this.state.position,
    };

    const toastrInstance = toastr.success;

    toastrInstance(
      this.state.title,
      val + " has been unblocked",
      options
    );
  }

  renderBlockedUsersList = () => {
    return(
      <div>
        {this.state.api_blocked_users.map((x,y) =>
          <div>
            <Media >
              <ProfilePhoto
                avatar_image= {x.blocked_user[0].avatar_image}
                avatar_letter = {x.blocked_user[0].avatar_letter}
                avatar_color = {x.blocked_user[0].avatar_color}
                avatar_size={"56px"}
                letter_size={"28px"}
                />

                <Media body   className="ml-2">

                    <p className="my-1" style={{color:"black"}}>
                      <strong>{x.blocked_user[0].firstname_lastname}</strong>
                    </p>

                    <p className="my-1 text-muted" style={{color:"black"}}>
                      {x.blocked_user[0].heading}
                    </p>

                </Media>

                <Media>
                  <Form onSubmit={this.onSubmit}>
                    <Input type="hidden" name="routine_xref" value={x.id} ref={(input) => { this.routineInput = input }} />
                    <Button className="float-left"> Unblock </Button>
                  </Form>
                </Media>

            </Media>
            <hr className="my-2" />
          </div>
        )}
      </div>
    )
  }


  render() {
    if (this.state.api_blocked_users_loading) {
      return (
        null
      )
    }
    return(
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Blocked Members</CardTitle>
          <h6 className="card-subtitle text-muted">
            {this.state.api_blocked_users.length === 0 ?
              'You no blcoked any member. Members you block will appear here and they will not beable to view, search or interact with anything on your profile.'
              :
              'Below are members you have Blocked. They cannot view, search nor interact with anything on your profile.'
            }
          </h6>
        </CardHeader>
        <CardBody>
              {this.state.api_blocked_users.map((x,y) =>
          <BlockedUsersDetail
            api_blocked_user = {x.blocked_user[0]}
            data={x}
            handlerUnblockReload={this.handlerUnblockReload}
            showToastr = {this.showToastr}
            />
        )}
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
