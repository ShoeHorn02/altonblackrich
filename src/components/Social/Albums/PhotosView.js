import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import LoaderSpin from '../Timeline/LoaderSpin';
import {
  Button,
  ButtonGroup,
  Card,
  CardImg,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Media,
  Form,
  Input,
  InputGroupAddon
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faThumbsUp,
 } from "@fortawesome/free-solid-svg-icons";

 import { deletePhoto, postPhotoLike, postPhotoCommment, deletePhotoCommment } from '../../../redux/actions/album';
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto';
import ModalLikes from '../../../components/Social/Timeline/ModalLikes';
import ModalComments from '../../../components/Social/Timeline/ModalComments';
import ModalDelete from '../../../components/Social/Timeline/ModalDelete';


 async function DeletePhotoAction(userid, photoID, changeflag) {
   await store.dispatch(deletePhoto(userid, photoID, "false"));
   await changeflag(2)
  }


  async function PostPhotoLike(photoID, userid, changeflag) {
    const result = await store.dispatch(postPhotoLike(photoID, userid));
    if (result.status === 200 || result.status === 201) {
      await changeflag(2);
    }
   }


   async function PostPhotoComment(photoID, userid, comment, changeflag) {
     const result = await store.dispatch(postPhotoCommment(photoID, userid, comment));
     if (result.status === 200 || result.status === 201) {
       await changeflag(2);
     }
    }


    async function DeletePhotoComment(photoID, time, changeflag ) {
      const result = await store.dispatch(deletePhotoCommment(photoID, "true", time));
      if (result.status === 200 || result.status === 201) {
        await changeflag(2);
      }
     }

const ModalPhoto = (props) => {


  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => {setModal(!modal); props.clear_ids()}
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
    props.clear_ids();
  }

  const clear = async () => {
     await setModal(!modal);
     await props.clear_ids()
   };




  return (
    <div>
      <CardImg
        style = {{'maxWidth': '100%', 'maxHeight': '100%', 'height': '350px', 'width': '500px', 'objectFit': 'cover', cursor:'pointer'}}
        top
        onClick={toggle}
        src={props.photo_data.photo}
        alt="Card image cap" />

      <Modal
        isOpen={modal}
        toggle={() => {clear();} }
        className={className}
        contentClassName="custommodalstyle"
        //style={{'max-height': '95vh'}}
        size="lg"
        >

        <div className="modal-header justify-content-between " >
          <div >
            {props.album_name + ' ' + (props.photo_index_id+1) +'/'+props.album_count}
            </div>
            <div>
            {props.time_history}
            <button className="close" onClick={toggle}>&times;</button>

            </div>
        </div>
        <ModalBody >


        <Row>
             <Col md="8" lg="8">
               <CardImg
                   style = {{'maxWidth': '100%', 'maxHeight': '90vh', 'objectFit': 'cover', 'maxHeight': 'calc(85vh - 100px)'}}
                //  style= {{'max-width': '120vh', 'max-height': '95vh'}}
                 src={props.photo_display_url}
                 alt="Card image cap" />
                 </Col>
             <Col md="4" lg="4" className="customBackgroundAuth">

              <Card className="mb-0 pb-0 mt-3">
               <Media className="mt-3 ml-2 mr-2 mb-1" >
               <div className="pr-2 float-left">
                 <ProfilePhoto
                   avatar_image={props.user_data.avatar_image}
                   avatar_color = {props.user_data.avatar_color}
                   avatar_letter = {props.user_data.avatar_letter}
                   avatar_size={"36px"}
                   letter_size={"18px"}
                   />
               </div>
               <Media body>
                 <p className="text-muted m-0 p-0">
                 <Link
                 to={"../../profile/" + props.user_data.pk + "/home"}
                 style={{color:"#696969",'textDcoration':'none'}}>

                   <strong>{props.user_data.firstname_lastname}</strong>
                 </Link>


                 </p>
                 <small className="m-0 p-0 text-muted">{props.time_history}
                 </small>

               </Media>

               <InputGroupAddon addonType="prepend" color="danger">

                   <Form
                     onSubmit={props.onLike}
                     name="temp"
                     >
                     {
                       props.photo_you_liked === true ?
                        <Button size="sm" color="danger" disabled> <FontAwesomeIcon icon={faThumbsUp} fixedWidth /> Liked </Button>
                       :
                       props.likeSpin === 0?
                        <Button size="sm" color="danger" > <FontAwesomeIcon icon={faThumbsUp} fixedWidth /> Like </Button>
                        :
                        <Button size="sm" color="danger" disabled> <LoaderSpin/></Button>
                     }
                 </Form>
               </InputGroupAddon>


                </Media>
              </Card>


              {props.renderCardBaseLikedBy(props.photo_likes)}
              <br />
              {props.renderCommentsInput()}

              <hr className="mt-2 p-0" />


              {props.renderAlbumComments(props.photo_comments,props.photo_data)}

             </Col>

        </Row>





          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader  className="pt-2 pb-2" style={{'background-color':"#dc3545"}}><span style={{color:'#fff'}}>Delete Photo</span></ModalHeader>
            <ModalBody><p className="mb-0">Are you sure you want to delete this photo? This cannot be undone.</p></ModalBody>
            <ModalFooter>
              <Button color="secondary" outline onClick={toggleNested}>Cancel</Button>{" "}
              <Button color="danger" onClick={() => {toggleAll(); props.deletePhoto(props.photo_id)}}> Delete Photo </Button>
            </ModalFooter>
          </Modal>

        </ModalBody>
        <ModalFooter className="modal-footer justify-content-between">
          <div>
            <Button className="mr-1" color="primary" outline onClick={() => {toggle(); props.modalclose()}}>Close</Button>
            {props.source === "album" ?
            <Button color="danger" onClick={toggleNested}>Delete This Photo</Button>
              :
              null
            }
          </div>

        <ButtonGroup>


                    <Button
                    color="secondary"
                    className="ml-1 float-right"
                    onClick={() => props.photo_change(-1)}
                    >
                      <FontAwesomeIcon icon={faAngleLeft} /> Previous {props.photo_index_id}
                    </Button>




            <Button
            color="secondary float-right"
            className="ml-1"
            onClick={() => props.photo_change(1)}
            >
            Next  {props.photo_index_id + 1 + ' ' + props.album_count}  <FontAwesomeIcon icon={faAngleRight} />
            </Button>



          </ButtonGroup>




        </ModalFooter>
      </Modal>
    </div>
  );
}

class PhotoView extends React.Component {


  onLike = async (e) => {
    e.preventDefault();
    PostPhotoLike(
      this.state.photo_id,
      this.props.user_status.pk,
      this.props.change_flag,
    );
    this.setState({
      likeSpin: 1,
      photo_data: this.props.photo_data,
    });
  };

  onChange = async (e) => {
    this.props.handlermyValueParent(e.target.value)
    this.setState({
      [e.target.name]: e.target.value,
      comment_value: e.target.value,
      myValue: e.target.value
    });
  }


  onSend = async (e) => {
    e.preventDefault();
    PostPhotoComment(
      this.state.photo_id,
      this.props.user_status.pk,
      this.state.myValue,
      this.props.change_flag,
    );
    this.setState({
      commentSpin: 1,
      photo_data: this.props.photo_data,
    });
  };



  handlerPhotoChange = (val) => {
    console.log('11' + this.state.myValue)
    if (this.state.photo_index_id_update + val < 0) {
      this.setState({
        photo_index_id_update: this.state.photo_count-1,
      })
    }
    else if (this.state.photo_index_id_update + val > this.state.photo_count-1) {
      this.setState({
        photo_index_id_update: 0,
      })
    }
    else {
      this.setState({
        photo_index_id_update: this.state.photo_index_id_update + val,
      })
    }
  }



  handlerDeletePhoto = (val) => {
    DeletePhotoAction(
      this.props.user_status.pk,
      val,
      this.props.change_flag
    );
  }



  handlerModalClose = (val) => {
    this.setState({
      photo_index_id_update: this.props.photo_index_id,
      photo_display_url: this.props.album_data[this.props.photo_index_id].photo,
      photo_id: this.props.album_data[this.props.photo_index_id].id
    })
  }


  constructor(props) {
    super(props);
    this.state = {
      photo_data: this.props.album_data[this.props.photo_index_id],
      photo_index_id: this.props.photo_index_id,
      photo_index_id_update: this.props.photo_index_id,
      photo_display_url: this.props.album_data[this.props.photo_index_id].photo,
      photo_id: this.props.album_data[this.props.photo_index_id].id,
      photo_you_liked: this.props.album_data[this.props.photo_index_id].you_liked,
      photo_comments: this.props.album_data[this.props.photo_index_id].comments,
      photo_likes: this.props.album_data[this.props.photo_index_id].likes,
      photo_count: this.props.album_count,
      scroll_right_count: this.props.scroll_right_count,
      scroll_left_count: this.props.scroll_left_count,
      myValue: '',
      likeSpin: 0,
      commentSpin: 0,
      flag_loader: 0,
    };
  }




  componentDidUpdate() {
    if ((this.state.photo_index_id !== this.state.photo_index_id_update)) {
      console.log('22 ' + this.state.myValue)
      this.setState({
        photo_index_id: this.state.photo_index_id_update,
        photo_display_url:this.props.album_data[this.state.photo_index_id_update].photo,
        photo_id: this.props.album_data[this.state.photo_index_id_update].id,
        photo_you_liked: this.props.album_data[this.state.photo_index_id_update].you_liked,
        photo_comments: this.props.album_data[this.state.photo_index_id_update].comments,
        photo_likes: this.props.album_data[this.state.photo_index_id_update].likes,
        photo_data: this.props.album_data[this.state.photo_index_id_update],
      })
    }
    else if (this.state.photo_count !== this.props.album_count ) {
      console.log('33')
      this.setState({
        photo_index_id: this.props.photo_index_id,
        photo_index_id_update: this.props.photo_index_id,
        photo_display_url: this.props.album_data[this.props.photo_index_id].photo,
        photo_id: this.props.album_data[this.props.photo_index_id].id,
        photo_you_liked: this.props.album_data[this.props.photo_index_id].you_liked,
        photo_comments: this.props.album_data[this.state.photo_index_id_update].comments,
        photo_likes: this.props.album_data[this.state.photo_index_id_update].likes,
        photo_count: this.props.album_count,
        photo_data: this.props.album_data[this.state.photo_index_id_update],
      })
    }
    else if ((this.state.scroll_right_count !== this.props.scroll_right_count)) {
      console.log('44')
      this.setState({
        scroll_right_count: this.props.scroll_right_count
      })
        this.handlerPhotoChange(1)
    }
    else if ((this.state.scroll_left_count !== this.props.scroll_left_count)) {
      console.log('55 ' + this.state.myValue)
      this.setState({
        scroll_left_count: this.props.scroll_left_count
      })
        this.handlerPhotoChange(-1)
    }
    else if (((this.state.likeSpin === 1 || this.state.commentSpin === 1) && this.state.photo_data !== this.props.photo_data) || this.state.photo_comments !== this.props.album_data[this.state.photo_index_id_update].comments){
      console.log('66')
      this.setState({
        photo_index_id: this.state.photo_index_id_update,
        photo_display_url:this.props.album_data[this.state.photo_index_id_update].photo,
        photo_id: this.props.album_data[this.state.photo_index_id_update].id,
        photo_you_liked: this.props.album_data[this.state.photo_index_id_update].you_liked,
        photo_count: this.props.album_count,
        photo_likes: this.props.album_data[this.state.photo_index_id_update].likes,
        photo_comments: this.props.album_data[this.state.photo_index_id_update].comments,
        likeSpin: 0,
        commentSpin: 0,
        myValue:'',
        photo_data: this.props.album_data[this.state.photo_index_id_update],
      })
      this.props.handlermyValueParent('')
    }
  }

  renderCommentsInput = () => {
    return(
      <Card className="mt-1 mb-0 p-0">
        <Form onSubmit={this.onSend} name="inputComment">

        <Input
          type="textarea"
          placeholder="Add a comment"
          value={this.state.myValue}
          onChange={this.onChange}
          required
        />


        {this.state.commentSpin===0 && this.state.myValue===''?
        null
        :
        this.state.commentSpin===0?
        <Button className="btn-block" color="primary"> Post</Button>
        :
        <Button disabled className="btn-block" color="primary"> <LoaderSpin/></Button> }

        </Form>

      </Card>
    )
  }

  renderCardBaseLikedBy = (x) => {

    if (x.length === 1) {
      return (
      <small className="float-left text-navy">
        Liked by {x.map((a,b) => <Link key={b} to={'/profile/'+a.liking_user_id_xref.pk+'/home' }> {a.liking_user_id_xref.first_name +' '+ a.liking_user_id_xref.last_name} </Link>)}
      </small>
      )
    }
    else if (x.length === 2) {
      return (
      <small className="float-left text-navy">
        Liked by
        <Link to={'/profile/'+x.likes[0].liking_user_id_xref.pk+'/home' }>
          {' ' + x.likes[0].liking_user_id_xref.first_name +' '+x.likes[0].liking_user_id_xref.last_name+ ' '}
        </Link>
        and
        <Link to={'/profile/'+x.likes[1].liking_user_id_xref.pk+'/home' }>
          {' '+ x.likes[1].liking_user_id_xref.first_name +' ' +x.likes[1].liking_user_id_xref.last_name}
        </Link>
      </small>
      )
    }
    else if (x.length > 2) {
      return (
      <small className="float-left text-navy">
        Liked by
        <Link to={'/profile/'+x.likes[0].liking_user_id_xref.pk+'/home' }>
          {' ' + x.likes[0].liking_user_id_xref.like_display_name},
        </Link>
        <Link to={'/profile/'+x.likes[1].liking_user_id_xref.pk+'/home' }>
          {' '+ x.likes[1].liking_user_id_xref.like_display_name},
        </Link>
        {' '}and <ModalLikes likes = {x.likes} count={x.like_count-2} word = {x.like_count ===3 ? "other" : "others"} />
      </small>
      )
    }
}

renderCardCommentsDelete = (a,x) => {
return(
  <ModalDelete
    a = {a}
    b = {a.commenting_user_id_xref}
    active_user_id = {this.props.user_status.pk }
    onDelete = {this.onDeleteComment}
    time={a.current_time}
    data_source = {"photo"}
    />
)
}


onDeleteComment = async (comment_id, page, time) => {
  //e.preventDefault();
  DeletePhotoComment(
    comment_id,
    time,
    this.props.change_flag,
  );
};

renderAlbumComments = (x,y) => {

  if (x.length > 0) {
    return(
      <div>
      {x.map((a,b) =>
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


                {this.props.user_status.pk === y.user_id_xref|| this.props.user_status.pk === a.commenting_user_id_xref.id?
                  this.renderCardCommentsDelete(a,x)
                  :
                  null
                }




                </small>

                <div className="mt-1">
                {b === 4 && y.comment_count > 5 ?
                  <ModalComments
                    p = {x}
                    x = {y}
                    active_user_id = {this.props.user_status.pk }
                    onDelete = {this.onDeleteComment}
                    time={y.current_time}
                    comment_count={y.comment_count}
                    data_source={"photo"}
                    />
                  :
                 null
                }

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
    }


render() {
  return (
  <Card>
    <CardBody className="">
      <ModalPhoto
        photo_data = {this.state.photo_data}
        photo_index_id = {this.state.photo_index_id}
        photo_id = {this.state.photo_id}
        photo_change = {this.handlerPhotoChange}
        photo_display_url = {this.state.photo_display_url}
        modalclose = {this.handlerModalClose}
        album_count = {this.props.album_count}
        source = {this.props.source}
        deletePhoto = {this.handlerDeletePhoto}
        album_name = {this.props.album_name}
        time_history = {this.props.time_history}
        clear_ids = {this.handlerModalClose}
        user_data = {this.props.user_data}
        renderCommentsInput = {this.renderCommentsInput}
        renderCardBaseLikedBy = {this.renderCardBaseLikedBy}
        photo_you_liked = {this.state.photo_you_liked}
        photo_comments = {this.state.photo_comments}
        likeSpin = {this.state.likeSpin}
        photo_likes = {this.state.photo_likes}
        onLike = {this.onLike}
        active_user_id={this.props.user_status.pk}
        renderAlbumComments = {this.renderAlbumComments}
        />
    </CardBody>
  </Card>
  );

  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(PhotoView);
