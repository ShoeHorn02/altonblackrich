import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
} from "reactstrap";
import ImageCropper from './ImageCropper'
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const index = 1
const colors = [
  {
    name: "Primary",
    value: "primary"
  },
  {
    name: "Success",
    value: "success"
  },
  {
    name: "Danger",
    value: "danger"
  },
  {
    name: "Warning",
    value: "warning"
  }
];



const DefaultModal = (props) => {
  const initOpenModals = () => {
    let modals = {};

    colors.forEach((color, index) => {
      modals = Object.assign({}, modals, {[index]: true})
    });

    return modals;
  };

  const [openModals, setOpenModals] = useState(() => initOpenModals());

  const toggle = index => {
    // Toggle selected element
    setOpenModals(openModals => Object.assign({}, openModals, {[index]: !openModals[index]}));
  }

  return (
    <React.Fragment key={index}>
      <Button color="primary" onClick={() => toggle(index)} className="mr-1">
        <FontAwesomeIcon icon={faUpload} className="mr-1"/>
        {props.profile_picture_status? 'Change Picture' : 'Upload Picture' }
      </Button>
      <Modal isOpen={openModals[index]}>
        <ModalHeader toggle={() => {toggle(index); props.avatarfunction(null)}}>
           Profile Photo
        </ModalHeader>
          <ImageCropper avatarfunction={props.avatarfunction} avatarphoto={props.avatarphoto} toggle={toggle} photo_change_flag = {props.photo_change_flag} />
      </Modal>
    </React.Fragment>
  );
}

export default DefaultModal;
