import React from "react";
import store from "../../redux/store/index";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Media,
  FormGroup,
  Input
} from "reactstrap";
import UnfollowButton from "../../components/Social/Buttons/UnfollowButton"
import FollowButton from "../../components/Social/Buttons/FollowButton"
import { connect } from 'react-redux';
import ProfilePhoto from '../../components/Social/ProfilePhoto/ProfilePhoto'

class Following extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.lazy_page)
    this.props.flag_click_follow_button_get_page_number(this.lazy_page);
  };



  constructor(props) {
    super(props);
    this.state = {
      lift_tracking_input: [],
      workouts_popular: [],
      title: "",
      message: "",
      type: "success",
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right",
      lazy_index:this.props.index,
      lazy_page: this.props.lazy_page_number +1,
    };
  }


  componentDidMount() {
    console.log('3--' + (this.state.lazy_index+1) +'--' + (20*(this.state.lazy_page-1)))
    if (this.state.lazy_index+1 === 20*(this.state.lazy_page-1)) {
      this.props.flag_lazy_change(1)
      this.props.flag_lazy_page(this.state.lazy_page)
      console.log('xxxxxxxxxx')
    }
  }

  renderButton = (input_data, input_key) => {
    if (this.props.change_flag_value === 1) {
      return(
        <h2> LOADING </h2>
      )
    }

    else if (input_data.derived__is_following === "true") {
      return(
        <FormGroup onSubmit={this.onSubmit} key={input_key} >
          <Input type="hidden" value={Math.ceil((this.props.index+1) /20,1)} ref={(input) => { this.lazy_page = Math.ceil((this.props.index+1) /20,1) }}/>
          <UnfollowButton
            followingid = {input_data.derived__following_id}
            myid = {store.getState().auth.user.pk}
            user_id = {input_data.id}
            currentTime = {input_data.derived__current_time}
            change_flag = {this.props.flag_follow}
          />
        </FormGroup>
      )
    }

    else if (input_data.derived__is_following !== "true") {
      return (
        <FormGroup onSubmit={this.onSubmit} key={input_key} >
          <Input type="hidden" value={Math.ceil((this.props.index+1) /20,1)} ref={(input) => { this.lazy_page = Math.ceil((this.props.index+1) /20,1) }}/>
          <FollowButton
            myid = {store.getState().auth.user.pk}
            change_flag = {this.props.flag_follow}
            user_id = {input_data.id}
            />
        </FormGroup>
      )
    }
  }

  render() {
    return (


      <Card className="flex-fill mb-4">
        <CardBody className="mb-0 pb-0">


              <Media>



              <ProfilePhoto
                avatar_image= {this.props.x.avatar_image}
                avatar_letter = {this.props.x.avatar_letter}
                avatar_color = {this.props.x.avatar_color}
                avatar_size={"56px"}
                letter_size={"25px"}
                />




                <Media body   className="ml-2">
                <Link to={"/profile/" + this.props.x.id + '/home'}>
                    <p className="my-1" style={{color:"black"}}>
                      <strong>{this.props.x.first_name + ' ' + this.props.x.last_name}</strong> {' ' + this.props.x.location}
                    </p>
                  </Link>

                  { this.renderButton(this.props.x,this.props.index) }


                </Media>
              </Media>


        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  user_id: state.auth.user.pk,
  user_status: state.auth.user,
  general: state.general.isLoading,
  theme: state.theme.currentTheme,
});
export default connect(mapStateToProps, {  })(Following);
