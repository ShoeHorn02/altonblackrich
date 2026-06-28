import React, { useState }  from "react";
import { toastr } from "react-redux-toastr";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  FormGroup,
  Input,
  CustomInput,
  Popover,
  PopoverBody,
  PopoverHeader,
  Badge
} from "reactstrap";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench, faInfo } from "@fortawesome/free-solid-svg-icons";
import { deleteAlbumName, updateAlbumName } from '../../../redux/actions/album';

async function DeleteAlbum(userid, album_name, changeflag) {
  await store.dispatch(deleteAlbumName(userid, album_name, "false"));
  await changeflag(1)
 }


 async function UpdateAlbum(album_id, album_name, description, is_private, publish_to_timeline, changeflag) {
   await store.dispatch(updateAlbumName(album_id, album_name, description, is_private, publish_to_timeline));
   await changeflag(1)
  }




const ModalOptions = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  }


  const [popoverOpen1, setPopoverOpen1] = useState(false);
  const togglePopover1 = () => setPopoverOpen1(!popoverOpen1);

  const [popoverOpen2, setPopoverOpen2] = useState(false);
  const togglePopover2 = () => setPopoverOpen2(!popoverOpen2);

  const savealbum = async () => {
     await setModal(!modal);
     await props.showToastr("Saving Options","Updating \"" + props.api_album.album_name + "\""," success")
     await setTimeout(async () => {
       await props.onSave()
     }, 1500);
   };




  const deletealbum = async () => {
     await setNestedModal(!nestedModal);
     await setCloseAll(false);
     await props.showToastr("Deleting Photo Album","Deleteing \"" + props.api_album.album_name + "\""," error")
     await setTimeout(async () => {
       await props.onDelete()
     }, 1500);
   };

  return (
    <div>
      <Button color="secondary"  onClick={toggle} className="float-right" ><FontAwesomeIcon icon={faWrench} /> Options</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader  toggle={toggle} className="pt-2 pb-2" style={{'background-color':"#3B7DDD"}}><span style={{color:'#fff'}}>Options For "{props.api_album.album_name}"</span></ModalHeader>
        <ModalBody className="mb-0 mt-0 pb-0 pt-0">



        <Table className="mb-0 mt-0 pb-0 pt-0">
        <tbody style={{'border-top':'0px'}}>
          <tr style={{'border-top':'0px'}}>
            <th style={{width: '34%'}}>Album Name:</th>
            <td style={{width: '66%'}}>
            <FormGroup className="pb-0 pt-0 mt-0 mb-0">
              <Input
                className="pb-0 pt-0 mt-0 mb-0"
                type="text"
                name="album_name"
                value={props.album_name}
                onChange={props.onChange}
                />
            </FormGroup>
            </td>
          </tr>
          <tr>
            <th>Album Description</th>
            <td>
            <FormGroup className="pb-0 pt-0 mt-0 mb-0">
              <Input
                className="pb-0 pt-0 mt-0 mb-0"
                type="textarea"
                row="3"
                name="album_des"
                value={props.album_des}
                onChange={props.onChange}
                />
            </FormGroup>
            </td>
          </tr>


            <tr>
              <th>Is On Timeline?</th>
              <td>
              <div class="d-flex justify-content-between">
              <FormGroup className="p-0 m-0">
              {props.is_timeline?
                <CustomInput
                  type="switch"
                  id="exampleCustomSwitch2"
                  name="is_timeline"
                  defaultChecked="true"
                  onChange={props.onChange}
                  label='Yes'              />
                  :
                  <CustomInput
                    type="switch"
                    id="exampleCustomSwitch2"
                    name="is_timeline"
                    onChange={props.onChange}
                    label='No'               />
              }


              </FormGroup>



              <div>
              <Badge color="light" id="Popover1" type="button" className="badge-pill float-right m-0" size="sm">
                <FontAwesomeIcon icon={faInfo} />
              </Badge>
                <Popover placement="top" isOpen={popoverOpen1} target="Popover1" toggle={togglePopover1}>
                  <PopoverHeader>Is On Timeline?</PopoverHeader>
                  <PopoverBody>Selecting "Yes" will display this album on 1) your timeline feed and 2) the timeline's of the people who follow</PopoverBody>
                </Popover>
              </div>

              </div>


              </td>
            </tr>


            <tr>
              <th>Is Private?</th>
              <td>
              <div class="d-flex justify-content-between">
              <FormGroup className="pb-0 pt-0 mt-0 mb-0">
              {props.is_private?
                <CustomInput
                  type="switch"
                  id="exampleCustomSwitch1"
                  name="is_private"
                  onChange={props.onChange}
                  defaultChecked="true"
                  label="Yes"              />
                  :
                  <CustomInput
                    type="switch"
                    id="exampleCustomSwitch1"
                    name="is_private"
                    onChange={props.onChange}
                    label="No"               />
                }
              </FormGroup>
              <div>
              <Badge color="light" id="Popover2" type="button" className="badge-pill float-right m-0" size="sm">
                <FontAwesomeIcon icon={faInfo} />
              </Badge>
                <Popover placement="top" isOpen={popoverOpen2} target="Popover2" toggle={togglePopover2}>
                  <PopoverHeader>Is Private?</PopoverHeader>
                  <PopoverBody>Selecting "Yes" will make the album for your eyes only. Memebers cannot view it in your profile nor will it appear on their timelines</PopoverBody>
                </Popover>
              </div>

              </div>
              </td>
            </tr>

            <tr>
              <th>Created</th>
              <td>{props.api_album.time_history}</td>
            </tr>
            <tr>
              <th>Photo Count</th>
              <td>{props.api_album.photo_count}</td>
            </tr>

        </tbody>
          </Table>






          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader  className="pt-2 pb-2" style={{'background-color':"#dc3545"}}><span style={{color:'#fff'}}>Delete Album "{props.api_album.album_name}"</span></ModalHeader>
            <ModalBody>Are you sure you want to delete this album? This cannot be undone.</ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleNested}>Cancel</Button>{' '}
              <Button color="danger" onClick={() => {deletealbum();} }>Delete</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <Button color="primary" onClick={() => {savealbum();} }>Save and Close</Button>
          <Button color="danger" onClick={toggleNested}>Delete Album</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}




class Options extends React.Component {


  showToastr(title,event,type) {
    const options = {
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right"
    };

    const toastrInstance =
      type === "info"
        ? toastr.info
        : type === "warning"
        ? toastr.warning
        : type === "error"
        ? toastr.error
        : toastr.success;

    toastrInstance(
      title,
      event,
      options
    );
  }



  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: "",
      type: "error",
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right",

      album_name: this.props.api_album.album_name,
      album_des: this.props.api_album.description,
      is_private: this.props.api_album.is_private,
      is_timeline: this.props.api_album.publish_to_timeline,
    };
  }


  onDelete = (e) => {
    DeleteAlbum(
      this.props.user_status.pk,
      this.props.api_album.id,
      this.props.handlerDeleteAlbumChamge
    );
  }


  onSave = (e) => {
    UpdateAlbum(
      this.props.api_album.id,
      this.state.album_name,
      this.state.album_des,
      this.state.is_private,
      this.state.is_timeline,
      this.props.handlerDeleteAlbumChamge
    );
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === 'album_name') {
      this.setState({album_name: e.target.value})
    }
    else if (e.target.name === 'album_des') {
      this.setState({album_des: e.target.value})
    }
    else if (e.target.name === 'is_private') {
      this.setState({is_private: e.target.checked})
    }
    else if (e.target.name === 'is_timeline') {
      this.setState({is_timeline: e.target.checked})
    }
  }

  render() {
    return(


          <ModalOptions
          onDelete={this.onDelete}
          onSave={this.onSave}
          showToastr = {this.showToastr}
          api_album = {this.props.api_album}
          album_name = {this.state.album_name}
          album_des = {this.state.album_des}
          is_private = {this.state.is_private}
          is_timeline = {this.state.is_timeline}
          onChange={this.onChange}
          />

    );
  }
}

const mapStateToProps = (state) => ({

  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Options);
