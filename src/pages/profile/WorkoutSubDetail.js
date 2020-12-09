import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Form,
  Button,
  Input,
  Media,

} from "reactstrap";

import ProfilePhoto from '../../components/Social/ProfilePhoto/ProfilePhoto';
import ModalComments from '../../components/Social/Timeline/ModalComments';
import ModalDelete from '../../components/Social/Timeline/ModalDelete';
import ModalLikes from '../../components/Social/Timeline/ModalLikes';
import LoaderSpin from '../../components/Social/Timeline/LoaderSpin';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import store from "../../redux/store/index";
import { timelineLikes, timelineComments, timelineCommentsDelete } from '../../redux/actions/social';



async function SendLike(cardid, userid, changeflag) {
  await store.dispatch(timelineLikes(cardid, userid));
  await changeflag(1)
 }

async function SendComment(cardid, userid, comment, changeflag) {
 await store.dispatch(timelineComments(cardid, userid, comment));
 await changeflag(1)
 //await spinvalue(0)
}

async function DeleteComment(cardid, changeflag, time) {
  await store.dispatch(timelineCommentsDelete(cardid, "true", time));
  await changeflag(1)
 }





class Timeline extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      myValue: '',
      commentSpin: 0,
      initialComments: this.props.comments,
      likeSpin: 0,
      initialLikes: this.props.likes,
    };
  }



  componentDidUpdate() {
    if (this.state.initialComments !== this.props.comments) {
      this.setState({
        initialComments: this.props.comments,
        commentSpin: 0,
        myValue: '',
      });
    }
    if (this.state.initialLikes !== this.props.likes) {
      this.setState({
        initialLikes: this.props.likes,
        likeSpin: 0,
      });
    }
  }


  onDeleteComment = async (comment_id, page, time) => {
    //e.preventDefault();
    DeleteComment(
      comment_id,
      this.props.workoutdetail_change_flag,
      time
    );
  };


  onLike = async (e) => {
    e.preventDefault();
    SendLike(
      this.props.timeline_id,
      this.props.user_status.pk,
      this.props.workoutdetail_change_flag,
    );
    this.setState({
      likeSpin: 1
    });
  };

  onChange = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      comment_value: e.target.value,
      myValue: e.target.value
    });
  }


  onSend = async (e) => {
    e.preventDefault();
    SendComment(
      this.props.timeline_id,
      this.props.user_status.pk,
      this.state.comment_value,
      this.props.workoutdetail_change_flag,
    );
    this.setState({
      commentSpin: 1
    });
  };


  renderCardCommentsDelete = (a,x) => {
    return(
      <ModalDelete
        a = {a}
        active_user_id = {this.props.user_status.pk }
        onDelete = {this.onDeleteComment}
        page = {Math.ceil((this.props.index+1) /4,1)}
        time={this.props.data.current_time}
        />
    )
  }


  renderHeaderTalbe = () => {
    return(
      <Table size="sm" className="my-2 text-left">
        <tbody>
          <tr>
            <th>Time</th>
            <td>{this.props.exercise_data.derived__historic_datetime}</td>
          </tr>
          <tr>
            <th>Workout</th>
            <Link to={"/workouts/detail/" + this.props.exercise_data.workout_day_xref.routine_xref.id}>
            <td >{this.props.exercise_data.workout_day_xref.routine_xref.routine}</td>
            </Link>
          </tr>
          <tr>
            <th>Session</th>
            <td>{this.props.exercise_data.workout_day_xref.day_title}</td>
          </tr>
          <tr>
            <th>progres</th>
            <td>pending</td>
          </tr>
        </tbody>
      </Table>
    )
  }

  renderMainHeader = () => {
      return(
        <Card>
          <CardBody className="text-center">
            <ProfilePhoto
              avatar_image={this.props.user_data.avatar_image}
              avatar_color = {this.props.user_data.avatar_color}
              avatar_letter = {this.props.user_data.avatar_letter}
              avatar_size={"128px"}
              letter_size={"56px"}
              />

          <CardHeader tag="h3" className="mb-0 mt-0 pb-0 pt-2 text-muted">
            {this.props.exercise_data.derived__part_of_day}
          </CardHeader>

          {this.renderHeaderTalbe()}
          </CardBody>
        </Card>
      )
  }


  renderCardBaseLikedBy = () => {
    if (this.props.data.like_count === 1) {
      return (
      <small className="float-left text-navy">
        Liked by {this.props.data.likes.map((a,b) => <Link key={b} to={'/profile/'+a.liking_user_id_xref.id+'/home' }> {a.liking_user_id_xref.first_name +' '+ a.liking_user_id_xref.last_name} </Link>)}
      </small>
      )
    }
    else if (this.props.data.like_count === 2) {
      return (
      <small className="float-left text-navy">
        Liked by
        <Link to={'/profile/'+this.props.data.likes[0].liking_user_id_xref.id+'/home' }>
          {' ' + this.props.data.likes[0].liking_user_id_xref.first_name +' '+this.props.data.likes[0].liking_user_id_xref.last_name+ ' '}
        </Link>
        and
        <Link to={'/profile/'+this.props.data.likes[1].liking_user_id_xref.id+'/home' }>
          {' '+ this.props.data.likes[1].liking_user_id_xref.first_name +' ' +this.props.data.likes[1].liking_user_id_xref.last_name}
        </Link>
      </small>
      )
    }
    else if (this.props.data.like_count > 2) {
      return (
      <small className="float-left text-navy">
        Liked by
        <Link to={'/profile/'+this.props.data.likes[0].liking_user_id_xref.id+'/home' }>
          {' ' + this.props.data.likes[0].liking_user_id_xref.like_display_name},
        </Link>
        <Link to={'/profile/'+this.props.data.likes[1].liking_user_id_xref.id+'/home' }>
          {' '+ this.props.data.likes[1].liking_user_id_xref.like_display_name},
        </Link>
        {' '}and <ModalLikes likes = {this.props.data.likes} count={this.props.data.like_count-2} word = {this.props.data.like_count ===3 ? "other" : "others"} />
      </small>
      )
    }
}


  renderLikes = () => {
    if (this.props.data.you_liked === true) {
      return(
        <Card>
          <Form >
            {this.renderCardBaseLikedBy()}
            <Button color="danger" className="btn-block"  type="submit" disabled><FontAwesomeIcon icon={faThumbsUp} /> Liked </Button>
          </Form>
        </Card>
      )
    };
    return(
      <Card>
          <Form onSubmit={this.onLike}>
          {this.renderCardBaseLikedBy()}
          <Button color="danger" className="btn-block">
            <FontAwesomeIcon icon={faThumbsUp} fixedWidth /> Like
          </Button>
        </Form>
      </Card>
    )
  }


  renderComments = () => {
    return(
      <Card>
        <Form onSubmit={this.onSend} name="inputComment">

        <Input
          type="textarea"
          placeholder="Add a comment"
          value={this.state.myValue}
          onChange={this.onChange}
          required
          className="border-dark"

        />

            {this.state.commentSpin===0 && this.state.myValue===''?
            null
            :
            this.state.commentSpin===0?
            <Button color="primary" className="btn-block"> Post</Button>
            :
            <Button disabled className="btn-block"> <LoaderSpin/></Button> }
        </Form>


        <div>
        {this.props.comments.map((a,b) =>
          <div key={b}>
            {b < 5 ?
              <Media className="mt-3 ml-2 mr-2 mb-1" >
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

                    <strong>{a.commenting_user_id_xref.full_name}</strong>:
                  </Link>
                    {a.comment}

                  </p>
                  <small className="m-0 p-0 text-muted"> {a.historic_datetime}

                  {this.props.user_status.pk === this.props.user_data.id || this.props.user_status.pk === a.commenting_user_id_xref.id?
                    this.renderCardCommentsDelete(a,this.props.data)
                    :
                    null
                  }


                  </small>


                  <div className="mt-1">
                  {b === 4 && this.props.data.comment_count > 5 ?
                    <ModalComments
                      p = {this.props.data.comments}
                      x = {this.props.data}
                      active_user_id = {this.props.user_status.pk }
                      onDelete = {this.onDeleteComment}
                      time={this.props.data.current_time}
                      comment_count={this.props.data.comment_count}
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
      </Card>
    )
  }

  render() {
    return (
      <div>
        {this.renderMainHeader()}
        {this.renderLikes()}
        {this.renderComments()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Timeline);
