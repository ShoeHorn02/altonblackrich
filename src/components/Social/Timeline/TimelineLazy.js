import React from "react";
import Loader from "./Loader";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import LazyLoad from 'react-lazyload';
import TimelineFeed from './TimelineFeed'
import StatusNew from './StatusNew'
import StatusNewMember from './StatusNewMember'
import StatusNewYouAndFollowers from './StatusNewYouAndFollowers'
import {
  API_TIMELINE,
  API_TIMELINE_YOU_AND_FOLLOWING,
  API_TIMELINE_ALL_USER,
 } from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';


class TimelineLazy extends React.Component {

  fetchTimelineInitial = () =>  {
    if (this.props.list === "you_only") {
      axios.get(`${API_TIMELINE}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_timeline" +"1"]: res.data.results,
          api_timeline: res.data.results,
          api_timeline_loading: false,
        });
      });
    }
    else if (this.props.list === "you_and_following") {
      axios.get(`${API_TIMELINE_YOU_AND_FOLLOWING}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_timeline" +"1"]: res.data.results,
          api_timeline: res.data.results,
          api_timeline_loading: false,
        });
      });
    }
    else if (this.props.list === "member_only") {
      axios.get(`${API_TIMELINE_ALL_USER}${this.props.member_id}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_timeline" +"1"]: res.data.results,
          api_timeline: res.data.results,
          api_timeline_loading: false,
        });
      });
    }

  }

  fetchTimelineReloadLike = async (x) =>  {
    var i;
    if (this.props.list === "you_only") {
      await axios.get(`${API_TIMELINE}?page=${x}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_timeline" +x]: res.data.results,
          flag_like_change: 0,
        });
      });
    }
    else if (this.props.list === "you_and_following") {
      await axios.get(`${API_TIMELINE_YOU_AND_FOLLOWING}?page=${x}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_timeline" +x]: res.data.results,
          flag_like_change: 0,
        });
      });
    }
    else if (this.props.list === "member_only") {
      await axios.get(`${API_TIMELINE_ALL_USER}${this.props.member_id}&page=${x}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_timeline" +x]: res.data.results,
          flag_like_change: 0,
        });
      });
    }

      this.setState({
        api_timeline: this.state["api_timeline1"],
      });


    for (i = 2; i < this.state.lazy_page_number+1; i++) {
      this.setState({
        api_timeline: this.state.api_timeline.concat(this.state["api_timeline"+i]),
      });
    }

      this.setState({
        flag_comment_spinnter: 2,
        flag_like_spinner: 2,
      });


  }

  fetchTimelineNext = async (x) =>  {
    var i;
    if (this.props.list === "you_only") {
      await axios.get(`${API_TIMELINE}?page=${x}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_timeline" +x]: res.data.results,
        });
      });
    }
    else if (this.props.list === "you_and_following") {
      await axios.get(`${API_TIMELINE_YOU_AND_FOLLOWING}?page=${x}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_timeline" +x]: res.data.results,
        });
      });
    }
    else if (this.props.list === "member_only") {
      await axios.get(`${API_TIMELINE_ALL_USER}${this.props.member_id}&page=${x}`, keyConfig(store.getState)).then(res => {
        this.setState({
          ["api_timeline" +x]: res.data.results,
        });
      });
    }
      this.setState({
        api_timeline: this.state["api_timeline1"],
      });


    for (i = 2; i < this.state.lazy_page_number+1; i++) {
      this.setState({
        api_timeline: this.state.api_timeline.concat(this.state["api_timeline"+i]),
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
  }

  handlerLinkeChange = (val) => {
    this.setState({
      flag_like_change: val
    })
  }

  componentDidMount() {
    this.fetchTimelineInitial();
  }

  componentDidUpdate(prevProps) {
    if (this.state.flag_like_change !==0 ) {
      this.fetchTimelineReloadLike(this.state.flag_like_change);
      this.setState({
        flag_like_change: 0,
      });
    }
    if (this.state.flag_lazy_change === 1) {
      this.fetchTimelineNext(this.state.lazy_page_number);
      this.setState({
        flag_lazy_change: 0,
      });
    }
    if (this.state.member_id !== this.props.member_id) {
      this.fetchTimelineInitial();
      this.setState({
        member_id: this.props.member_id,
        api_timeline_loading: true,
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      photo_change_flag: 0,
      flag_like_change: 0,
      flag_lazy_change: 0,
      lazy_page_number: 1,
      flag_comment_spinnter: 0,
      flag_like_spinner: 0,
      api_timeline:[],
      api_timeline_loading: true,
      api_user_following : [],
      api_user_following_loading: true,
      api_user_followers : [],
      api_user_followers_loading: true,
      api_user_profiles: [],
      api_user_profiles_loading: true,
      api_albums_master: [],
      api_albums_master_loading: true,
      member_id: this.props.member_id,
    };
  }

  renderLazy = (x,y) => {
    if (y === 0 ) {
      return(
        <TimelineFeed
          x={x}
          index={y}
          username={store.getState().auth.user.username}
          flag_like_change = {this.handlerLinkeChange}
          flag_lazy_change = {this.handlerLazyChange}
          flag_lazy_page = {this.handlerLazyPage}
          lazy_page_number={this.state.lazy_page_number}
          flag_comment_spinnter={this.handlerCommentSpinnter}
          flag_comment_spinnter_value = {this.state.flag_comment_spinnter}
          member_id = {this.props.member_id}
          flag_like_spinner={this.handlerLikeSpinner}
          flag_like_spinner_value = {this.state.flag_like_spinner}
          />
      )
    }
    else if (y > 0) {
      return(
        <LazyLoad once height={300} >
         <TimelineFeed
           x={x}
           index={y}
           username={store.getState().auth.user.username}
           flag_like_change = {this.handlerLinkeChange}
           flag_lazy_change = {this.handlerLazyChange}
           flag_lazy_page = {this.handlerLazyPage}
           lazy_page_number={this.state.lazy_page_number}
           flag_comment_spinnter={this.handlerCommentSpinnter}
           flag_comment_spinnter_value={this.state.flag_comment_spinnter}
           member_id = {this.props.member_id}
           flag_like_spinner={this.handlerLikeSpinner}
           flag_like_spinner_value = {this.state.flag_like_spinner}
           />
     </LazyLoad>
      )
    }
  }

  renderData = () => {
    if (this.state.api_timeline.length === 0 && this.props.list === "you_only") {
      return (
        <StatusNew/>
      )
    }
    else if (this.state.api_timeline.length === 0 && this.props.list === "you_and_following") {
        return (
        <StatusNewYouAndFollowers/>
        )
    }
    else if (this.state.api_timeline.length === 0 && this.props.list === "member_only") {
        return (
        <StatusNewMember active_id={store.getState().auth.user.pk}   member_id={this.state.member_id} member_first_name={this.props.member_first_name}/>
        )
    }
    else if (this.state.api_timeline.length > 0) {
      return (
        <div>
          {this.state.api_timeline.map((x,y)=>
            <div key={y}>
            {this.renderLazy(x,y)}
            </div>
        )}
        </div>
      )
    }
}

  render() {
    if (this.state.api_timeline_loading === true) {
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
