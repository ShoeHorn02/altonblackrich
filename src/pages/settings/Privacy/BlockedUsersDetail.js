import React from "react";
import { toastr } from "react-redux-toastr";
import {
  Button,
  Media,
  Form,
} from "reactstrap";
import { unblockUser } from '../../../redux/actions/social';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto'



async function UnBlock(unblock_id, current_time, handlerUnblockReload, showToastr) {
  const result = await store.dispatch(unblockUser(unblock_id, "true", current_time));
  if (result.status === 200 || result.status === 201) {
      await handlerUnblockReload(1)
      await showToastr;
  }
  console.log('sup')
 }


class Default extends React.Component {




  onSubmit = (e) => {
    e.preventDefault();
    UnBlock(
      this.props.data.id,
      this.props.data.current_time,
      this.props.handlerUnblockReload,
      this.props.showToastr(this.props.api_blocked_user.firstname_lastname)
    );
    console.log()
  }

  handlerGetResults = (val) => {
    this.setState({
      result: val
    })
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
      this.state.message,
      options
    );
  }



  render() {

    return(
      <div>


            <Media >
              <ProfilePhoto
                avatar_image= {this.props.api_blocked_user.avatar_image}
                avatar_letter = {this.props.api_blocked_user.avatar_letter}
                avatar_color = {this.props.api_blocked_user.avatar_color}
                avatar_size={"56px"}
                letter_size={"28px"}
                />

                <Media body   className="ml-2">

                    <p className="my-1" style={{color:"black"}}>
                      <strong>{this.props.api_blocked_user.firstname_lastname}</strong>
                    </p>

                    <p className="my-1 text-muted" style={{color:"black"}}>
                      {this.props.api_blocked_user.heading}
                    </p>

                </Media>

                <Media>
                  <Form onSubmit={this.onSubmit}>
                    <Button className="float-left"> Unblock </Button>
                  </Form>
                </Media>

            </Media>
            <hr className="my-2" />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
