import React, { useState } from "react";
import store from "../../../redux/store/index";
import {
  Button,
  ButtonGroup,
  Card,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadAvatarPhoto } from '../../../redux/actions/social';
import { loadUserSocial } from '../../../redux/actions/auth';

async function RemovePhoto(userid, photoid) {
  await store.dispatch(uploadAvatarPhoto(userid, ""));
  await store.dispatch(loadUserSocial())
}

const colors = [
  {
    name: "Remove Picture",
    value: "danger"
  }
];



const RemoveModal = (props) => {
  const initOpenModals = () => {
    let modals = {};

    colors.forEach((color, index) => {
      modals = Object.assign({}, modals, {[index]: false})
    });

    return modals;
  };

  const [openModals, setOpenModals] = useState(() => initOpenModals());

  const toggle = index => {
    // Toggle selected element
    setOpenModals(openModals => Object.assign({}, openModals, {[index]: !openModals[index]}));
  }

  const submitTrigger = (e) => {
    RemovePhoto(props.userid)
  }

  return (
    <Card className="pb-0 mb-0">



        {colors.map((color, index) => (
          <React.Fragment key={index}>
            <Button
              color={color.value}
              onClick={() => toggle(index)}
              className="ml-2"
            >
              <FontAwesomeIcon icon={faTimes} /> {color.name}
            </Button>
            <Modal
              isOpen={openModals[index]}
              toggle={() => toggle(index)}
            >
              <ModalHeader toggle={() => toggle(index)}>
                Default modal
              </ModalHeader>
              <ModalBody className="text-center m-3">
                <p className="mb-0">
                This will remove your photo from your profile and set the default. You can always add again
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => toggle(index)}>
                  Close
                </Button>{" "}
                <Button
                  color={color.value}
                  onClick={() => {toggle(index); submitTrigger()}}
                >
                  Remove Picture
                </Button>
              </ModalFooter>
            </Modal>
          </React.Fragment>
        ))}

    </Card>
  );
}



class Default extends React.Component {

  handleDrop = dropped => {
    this.props.avatarfunction(dropped[0])
  }


  constructor(props) {
    super(props);
    this.state = {
      profile_picture_status: this.props.profile_picture_status,
    };
  }


  componentDidUpdate() {
    if (this.state.profile_picture_status !== this.props.profile_picture_status) {
      this.setState({
        profile_picture_status: this.props.profile_picture_status
      })
    }
  }


  render() {
    return (
      <ButtonGroup inline="true" className="text-center ">
        <Dropzone onDrop={this.handleDrop}>
          {({getRootProps, getInputProps}) => (

            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button color="primary d-none d-sm-block">
                <FontAwesomeIcon icon={faUpload} className="mr-1"/>
                {this.state.profile_picture_status? 'Change Picture' : 'Upload Picture' }
              </Button>
            </div>

          )}
        </Dropzone>

        {this.state.profile_picture_status?
          <RemoveModal
            submitTrigger = {this.onSubmit}
            profile_photo_id = {this.state.profile_photo_id}
            userid = {this.props.userid}
            />
        :
        null
      }

      </ButtonGroup>
    );
  }
}


const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {  })(Default);
