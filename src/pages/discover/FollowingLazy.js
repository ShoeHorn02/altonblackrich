import React from "react";
import { connect } from 'react-redux';
import store from "../../redux/store/index";
import LazyLoad from 'react-lazyload';
import Loader from "../../components/Loader";
import Following from './Following'
import {
  API_DISCOVER_PROFILES,
 } from '../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../redux/actions/auth';
import {
  Row, Col
} from "reactstrap";





class TimelineLazy extends React.Component {



  fetchTimelineInitial = () =>  {
    if (this.props.list === "discover") {
      axios.get(`${API_DISCOVER_PROFILES}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_discover_profiles" +"1"]: res.data.results,
          api_discover_profiles: res.data.results,
          api_discover_profiles_loading: false,
          flag_click_follow_button_change: 0,
        });
      });
    }

  }



  fetchTimelineReloadFollow = async (x) =>  {
    var i;
    console.log(x)
    if (this.props.list === "discover") {
      await axios.get(`${API_DISCOVER_PROFILES}?page=${x}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_discover_profiles" +x]: res.data.results,
          api_discover_profiles: res.data.results,
        });
        console.log(x)
        console.log(res.data)
      });
    }


    await
      this.setState({
        api_discover_profiles: this.state["api_discover_profiles1"],
      });


    for (i = 2; i < this.state.lazy_page_number+1; i++) {
      await
      this.setState({
        api_discover_profiles: this.state.api_discover_profiles.concat(this.state["api_discover_profiles"+i]),
      });
    }

     await
      this.setState({
        flag_comment_spinnter: 2,
        flag_like_spinner: 2,
      });


  }



  fetchTimelineNext = async (x) =>  {
    var i;
    console.log(x)
    if (this.props.list === "discover") {
      await axios.get(`${API_DISCOVER_PROFILES}?page=${x}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_discover_profiles" +x]: res.data.results,
        });
        console.log(res.data)
      });
    }

      const initial = await
      this.setState({
        api_discover_profiles: this.state["api_discover_profiles1"],
      });


    for (i = 2; i < this.state.lazy_page_number+1; i++) {
      const append = await
      this.setState({
        api_discover_profiles: this.state.api_discover_profiles.concat(this.state["api_discover_profiles"+i]),
      });
    }



  }



  handlerLazyChange = (val) => {
    this.setState({
      flag_lazy_change: val
    })
  }

  handlerCommentSpinnter = (val) => {
    this.setState({
      flag_comment_spinnter: val
    })
  }


  handlerLikeSpinner = (val) => {
    this.setState({
      flag_like_spinner: val
    })
  }

  handlerLazyPage = (val) => {
    this.setState({
      lazy_page_number: val
    })
    console.log('hey')
  }



  handlerClickFollowButtonGetPageNumber = (val) => {
    console.log(val)
    this.setState({
      flag_click_follow_button_get_page_number: val
    })
    console.log('hh')
    console.log(this.state.flag_click_follow_button_get_page_number)
  }


  handlerClickFollowButtonChange = (val,val1) => {
    if (val > 0) {
      this.setState({
        flag_click_follow_button_change: val
      });
    }
    if (val1 > 0) {
      this.setState({
        flag_click_follow_button_get_page_number: val1
      });
    }

  }

  componentDidMount() {
    this.fetchTimelineInitial();
  }

  componentDidUpdate(prevProps) {
    if (this.state.flag_click_follow_button_get_page_number !==0 && this.state.flag_click_follow_button_change !==0) {
      console.log('kkkkk')
      this.fetchTimelineReloadFollow(this.state.flag_click_follow_button_get_page_number);
      this.setState({
        flag_click_follow_button_get_page_number: 0,
        flag_click_follow_button_change: 0,
      });
    }
    if (this.state.flag_lazy_change === 1) {
      this.fetchTimelineNext(this.state.lazy_page_number);
      this.setState({
        flag_lazy_change: 0,
      });
      console.log('hello')
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      photo_change_flag: 0,
      flag_click_follow_button_get_page_number: 0,
      flag_lazy_change: 0,
      lazy_page_number: 1,
      flag_comment_spinnter: 0,
      flag_like_spinner: 0,
      api_discover_profiles:[],
      api_discover_profiles_loading: true,
      api_user_following : [],
      api_user_following_loading: true,
      api_user_followers : [],
      api_user_followers_loading: true,
      api_user_profiles: [],
      api_user_profiles_loading: true,
      api_albums_master: [],
      api_albums_master_loading: true,
      flag_click_follow_button_change: 0,
    };
  }



  renderLazy = (x,y) => {
    if (y < 20 ) {
      return(
        <Following
          x={x}
          index={y}
          username={store.getState().auth.user.username}

          flag_lazy_change = {this.handlerLazyChange}
          flag_lazy_page = {this.handlerLazyPage}
          lazy_page_number={this.state.lazy_page_number}

          flag_click_follow_button_get_page_number = {this.handlerClickFollowButtonGetPageNumber}

          flag_comment_spinnter={this.handlerCommentSpinnter}
          flag_comment_spinnter_value = {this.state.flag_comment_spinnter}
          member_id = {this.props.member_id}
          flag_like_spinner={this.handlerLikeSpinner}
          flag_like_spinner_value = {this.state.flag_like_spinner}
          flag_follow = {this.handlerClickFollowButtonChange}
          />
      )
    }
    else if (y >= 20) {
      return(
      <LazyLoad once height={0} >
         <Following
           x={x}
           index={y}
           username={store.getState().auth.user.username}

           flag_lazy_change = {this.handlerLazyChange}
           flag_lazy_page = {this.handlerLazyPage}
           lazy_page_number={this.state.lazy_page_number}

           flag_click_follow_button_get_page_number = {this.handlerClickFollowButtonGetPageNumber}

           flag_comment_spinnter={this.handlerCommentSpinnter}
           flag_comment_spinnter_value={this.state.flag_comment_spinnter}
           member_id = {this.props.member_id}
           flag_like_spinner={this.handlerLikeSpinner}
           flag_like_spinner_value = {this.state.flag_like_spinner}
           flag_follow = {this.handlerClickFollowButtonChange}
           />
           </LazyLoad>

      )
    }
  }

  renderData = () => {
    if (this.state.api_discover_profiles.length === 0 && this.props.list === "you_only") {
      return (
        null
      )
    }
    else if (this.state.api_discover_profiles.length === 0 && this.props.list === "you_and_following") {
        return (
        null
        )
    }
    else if (this.state.api_discover_profiles.length === 0 && this.props.list === "member_only") {
        return (
        null
        )
    }
    else if (this.state.api_discover_profiles.length > 0) {
      return (
        <div>

              <Row>
          {this.state.api_discover_profiles.map((x,y)=>


                  <Col md="6" lg="6">

            {this.renderLazy(x,y)}


                  </Col >


        )}
          </Row>

        </div>
      )
    }
}


  render() {
    if (this.state.api_discover_profiles_loading === true) {
      return <Loader />
    }

    return (
      <div>
          {this.renderData()}
      </div>

  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(TimelineLazy);
