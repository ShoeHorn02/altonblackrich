import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Media,
  Badge,
  Input,
  InputGroup,
  InputGroupAddon,
  Form
} from "reactstrap";
import WorkoutCard from "./WorkoutCard"
import PhotoCard from "./PhotoCard"
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { timelineLikes, timelineComments, timelineCommentsDelete } from '../../../redux/actions/social';
import store from "../../../redux/store/index";
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto'
import ModalLikes from './ModalLikes';
import ModalComments from './ModalComments';
import ModalDelete from './ModalDelete';
import LoaderSpin from './LoaderSpin';



async function SendLike(cardid, userid, changeflag, pageReloadNumber) {
  await store.dispatch(timelineLikes(cardid, userid));
  await changeflag(pageReloadNumber)
 }

async function SendComment(cardid, userid, changeflag, pageReloadNumber, comment, spinvalue) {
 await store.dispatch(timelineComments(cardid, userid, comment));
 await changeflag(pageReloadNumber)
 //await spinvalue(0)
}

async function DeleteComment(cardid, changeflag, pageReloadNumber, time) {
  await store.dispatch(timelineCommentsDelete(cardid, "true", time));
  await changeflag(pageReloadNumber)
 }

class Timeline_Feed extends React.Component {

  onLike = async (e) => {
    e.preventDefault();
    this.setState({
      ["liketrigger" +e.target.name.split('/')[0]]: 1,
      flag_like_change: 0,
    });
    SendLike(
      e.target.name.split('/')[0],
      this.props.user_status.pk,
      this.props.flag_like_change,
      e.target.name.split('/')[1]
    );
    this.setState({
      likeSpin: 1
    });
  };

  onSend = async (e) => {
    e.preventDefault();
    SendComment(
      e.target.name.split('/')[0],
      this.props.user_status.pk,
      this.props.flag_like_change,
      e.target.name.split('/')[1],
      this.state.comment_value,
      this.props.flag_comment_spinnter
    );
    this.setState({
      commentSpin: 1
    });
  };

  onDeleteComment = async (comment_id, page, time) => {
    //e.preventDefault();
    DeleteComment(
      comment_id,
      this.props.flag_like_change,
      page,
      time
    );
  };

  onChange = async (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value,
      comment_value: e.target.value,
      myValue: e.target.value
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      api_user_profiles: [],
      comment: null,
      liketrigger: null,
      comment_id: null,
      lazy_index:this.props.index,
      lazy_page: this.props.lazy_page_number + 1,
      myValue: '',
      commentSpin: 0,
      likeSpin: 0
    };
  }

  componentDidMount() {
    if (this.state.lazy_index+1 === 4*(this.state.lazy_page-1)) {
      this.props.flag_lazy_change(1)
      this.props.flag_lazy_page(this.state.lazy_page)
    }
  }

  componentDidUpdate() {
    if (this.props.flag_comment_spinnter_value === 2) {
      this.setState({
        commentSpin: 0,
        myValue: '',
      });
      this.props.flag_comment_spinnter(0)
    }
    if (this.props.flag_like_spinner_value === 2) {
      this.setState({
        likeSpin: 0
      });
      this.props.flag_like_spinner(0)
    }
  }

  renderCardHeaderRight = (x) => {
    const userid = x.user_id_xref[0].id
    const workout_id = x.id
    const workout_link = '/profile/' + userid +'/workout/' + workout_id
    if (x.event=== 1 ) {
      return(
        <div>
          <small className="float-right text-navy">
            {x.exercises[0].user_exercise_tracker_xref.derived__historic_datetime} {this.props.index+1} {Math.ceil((this.props.index+1) /4,1)}
          </small>

          {this.renderCardHeaderRightLogic(x)}

          <Badge color="info" className="float-right " tag={Link} to={workout_link}>
            {x.exercises[0].user_exercise_tracker_xref.workout_day_xref.day_title}
          </Badge>

          <Form tag={Link} to={workout_link}  className="text-dark">
           <strong >{x.exercises[0].user_exercise_tracker_xref.derived__part_of_day}</strong>
           </Form>
        </div>
      )
    }
    else if (x.event=== 2) {
      const album_link = '/profile/' + x.albums.user_album_xref.user_id_xref[0].pk + '/albums/' + x.albums.user_album_xref.id;
      return(
        <div>
          <small className="float-right text-navy">
            {x.albums.user_album_xref.time_history} {this.props.index+1} {Math.ceil((this.props.index+1) /4,1)}
          </small>

          {this.renderCardHeaderRightLogic(x)}

          <Badge color="info" className="float-right" tag={Link} to={album_link}>
             photo album ({x.albums.user_album_xref.photos.length})
          </Badge>

          <Form tag={Link} to={album_link}  className="text-dark">
           <strong >{x.albums.user_album_xref.album_name}</strong>
           </Form>

        </div>
      )
    }
  }

  renderCardHeaderRightLogic = (x) => {
    if (x.user_id_xref[0].id === this.props.user_status.pk || x.user_id_xref[0].id===this.props.member_id) {
      return(
        <div>
          {this.renderCardHeaderRightName(x)}
        </div>
      )
    }
    return(
      <Link to={'/profile/'+x.user_id_xref[0].id+'/home' }   style={{color:"black",'textDcoration':'none'}}>
        {this.renderCardHeaderRightName(x)}
      </Link>
    )
  }

  renderCardHeaderRightName= (x) => {
      return(
          <p className="mb-2"  style={{color:'black'}}>
            <strong>{x.user_id_xref[0].first_name + ' ' + x.user_id_xref[0].last_name}</strong>
          </p>
      )
  }

  renderCardBody = (x) => {
    if (x.event=== 1 ) {
      return(
        <WorkoutCard
        workout = {x.exercises[0].user_exercise_tracker_xref.workout_day_xref}
        derived__start_time_local = {x.exercises[0].user_exercise_tracker_xref.derived__start_time_local} />
      )
    }
    else if (x.event=== 2 ) {
      return(
        <PhotoCard album = {x.albums.user_album_xref} />
      )
    }
  }

  renderCardBaseLikedButton = (x) => {
    if (x.you_liked=== true || this.state["liketrigger" +x.id] === 1) {
      return(

            <InputGroupAddon addonType="prepend" color="danger" className="ml-1">

                <Form
                  onSubmit={this.onLike}
                  name={x.id + '/' + Math.ceil((this.props.index+1) /4,1)}
                  >
                  {this.state.likeSpin===0?
                <Button color="danger" disabled className="btn-pill">
                  <FontAwesomeIcon icon={faThumbsUp} fixedWidth /> Liked {this.props.index+1} {Math.ceil((this.props.index+1) /4,1)}
                </Button>
                :
                <Button color="danger" disabled className="btn-pill"> <LoaderSpin/></Button>
              }
              </Form>
            </InputGroupAddon>
      )
    }

    else if (x.you_liked=== null)  {
      return(
            <InputGroupAddon addonType="prepend" color="danger" className="ml-1">

                <Form
                  onSubmit={this.onLike}
                  name={x.id + '/' + Math.ceil((this.props.index+1) /4,1)}
                  >
                <Button color="danger" outline className="btn-pill">
                  <FontAwesomeIcon icon={faThumbsUp} fixedWidth /> Like {this.props.index+1} {Math.ceil((this.props.index+1) /4,1)}
                </Button>
              </Form>
            </InputGroupAddon>
      )
    }
  }

  renderCardBaseLikedBy = (x) => {
    if (x.like_count === 1) {
      return (
      <small className="float-left text-navy">
        Liked by {x.likes.map((a,b) => <Link key={b} to={'/profile/'+a.liking_user_id_xref.id+'/home' }> {a.liking_user_id_xref.first_name +' '+ a.liking_user_id_xref.last_name} </Link>)}
      </small>
      )
    }
    else if (x.like_count === 2) {
      return (
      <small className="float-left text-navy">
        Liked by
        <Link to={'/profile/'+x.likes[0].liking_user_id_xref.id+'/home' }>
          {' ' + x.likes[0].liking_user_id_xref.first_name +' '+x.likes[0].liking_user_id_xref.last_name+ ' '}
        </Link>
        and
        <Link to={'/profile/'+x.likes[1].liking_user_id_xref.id+'/home' }>
          {' '+ x.likes[1].liking_user_id_xref.first_name +' ' +x.likes[1].liking_user_id_xref.last_name}
        </Link>
      </small>
      )
    }
    else if (x.like_count > 2) {
      return (
      <small className="float-left text-navy">
        Liked by
        <Link to={'/profile/'+x.likes[0].liking_user_id_xref.id+'/home' }>
          {' ' + x.likes[0].liking_user_id_xref.like_display_name},
        </Link>
        <Link to={'/profile/'+x.likes[1].liking_user_id_xref.id+'/home' }>
          {' '+ x.likes[1].liking_user_id_xref.like_display_name},
        </Link>
        {' '}and <ModalLikes likes = {x.likes} count={x.like_count-2} word = {x.like_count ===3 ? "other" : "others"} />
      </small>
      )
    }
}

  renderCardBase = (x) => {
      return(
        <div>
          {this.renderCardBaseLikedBy(x)}
          <InputGroup style={{'margin':'auto'}}>

            <ProfilePhoto
              avatar_image={this.props.user_status.avatar_image}
              avatar_color = {this.props.user_status.avatar_color}
              avatar_letter = {this.props.user_status.avatar_letter}
              avatar_size={"36px"}
              letter_size={"18px"}
              active_user_id = {this.props.user_status.pk }
              user_id = {this.props.user_status.id}
              />

          {this.renderCardBaseLikedButton(x)}

            <Input
              placeholder="Add a comment"
              value={this.state.myValue}
              className="ml-1 border-dark"
              onChange={this.onChange}
              style={{'border-radius': '25px','padding-left': '20px','padding-right': '20px'}}
            />

            <InputGroupAddon addonType="append" color="primary">
              <Form onSubmit={this.onSend} name={x.id + '/' + Math.ceil((this.props.index+1) /4,1)}>
              {this.state.commentSpin===0 && this.state.myValue===''?
                null
                :
                this.state.commentSpin===0?
              <Button className="btn-pill ml-1">Post</Button>
              :
              <Button className="btn-pill ml-1" disabled> <LoaderSpin/></Button> }
                </Form>
            </InputGroupAddon>


        </InputGroup>

          <hr className="mt-1"/>
          </div>
      )
  }

  renderCardComments = (x) => {
      console.log(x)
      return(
        <div>
          {x.comments.map((a,b) =>
          <div key={b}>
            {b < 5 ?
              <Media className="mt-3" >
                <div className="pr-2">
                <Link to={"../../profile/" + a.commenting_user_id_xref.id + "/home"}   style={{color:"#696969",'textDcoration':'none'}}>
                  <ProfilePhoto
                    avatar_image={a.commenting_user_id_xref.avatar_image}
                    avatar_color = {a.commenting_user_id_xref.avatar_color}
                    avatar_letter = {a.commenting_user_id_xref.avatar_letter}
                    avatar_size={"36px"}
                    letter_size={"18px"}
                    active_user_id = {this.props.user_status.pk }
                    user_id = {a.commenting_user_id_xref.id}
                    />
                  </Link>
                </div>
                <Media body>
                  <p className="text-muted m-0 p-0">
                  <Link
                  to={"../../profile/" + a.commenting_user_id_xref.id + "/home"}
                  style={{color:"#696969",'textDcoration':'none'}}>

                    <strong>{a.commenting_user_id_xref.firstname_lastname}</strong>:
                  </Link>
                    {a.comment}

                  </p>
                  <small className="m-0 p-0 text-muted"> {a.historic_datetime}


                  {this.props.user_status.pk === x.user_id_xref[0].id || this.props.user_status.pk === a.commenting_user_id_xref.id?
                    this.renderCardCommentsDelete(a,x)
                    :
                    null
                  }




                  </small>

                  <div className="mt-1">
                  {b === 4 && x.comment_count > 5 ?
                    <ModalComments
                      p = {x.comments}
                      x = {x}
                      active_user_id = {this.props.user_status.pk }
                      onDelete = {this.onDeleteComment}
                      page = {Math.ceil((this.props.index+1) /4,1)}
                      time={x.current_time}
                      comment_count={x.comment_count}
                      data_source={
                          x.event===1?
                            'timeline_exercise'
                            :
                          x.event===2?
                            'timeline_album'
                            :
                            null
                          }
                      />
                    :
                    null}

                  </div>
                </Media>

              </Media>
              :
              null
            }
          </div>


        )}
        </div>

      )

  }

  renderCardCommentsDelete = (a,x) => {
  return(
    <ModalDelete
      a = {a}
      active_user_id = {this.props.user_status.pk }
      onDelete = {this.onDeleteComment}
      page = {Math.ceil((this.props.index+1) /4,1)}
      time={x.current_time}
      />
  )
}

  renderProfilePhoto = (x) => {
      return(
        <div  className = "mr-3">
        <ProfilePhoto
          avatar_image={x.user_id_xref[0].avatar_image}
          avatar_color = {x.user_id_xref[0].avatar_color}
          avatar_letter = {x.user_id_xref[0].avatar_letter}
          avatar_size={"56px"}
          letter_size={"25px"}
          photo_change_flag = {this.props.photo_change_flag}
          active_user_id = {this.props.user_status.pk }
          user_id = {x.user_id_xref[0].id}
          />
          </div>
      )

  }

  render() {
    return (
      <Card className="flex-fill ">
        <CardBody >
          <Media className="mb-2">
            {this.renderProfilePhoto(this.props.x)}
            <Media body>
                {this.renderCardHeaderRight(this.props.x)}
            </Media>
          </Media>
          {this.renderCardBody(this.props.x)}
          {this.renderCardBase(this.props.x)}
          {this.renderCardComments(this.props.x)}
        </CardBody>
      </Card>
  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Timeline_Feed);
