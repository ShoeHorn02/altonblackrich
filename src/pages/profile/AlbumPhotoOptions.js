import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faAngleRight,
  faAngleLeft,
 } from "@fortawesome/free-solid-svg-icons";
 import {
   Button,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader,
 } from "reactstrap";




const colors = [
  {
    name: "Primary",
    value: "primary"
  }
];


const OptionsModal = (props) => {
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

  return (
    <div className="float-right">
      {colors.map((color, index) => (
        <React.Fragment key={index}>

        {props.showDelete==="yes" ?
            <Button color="danger" onClick={() => toggle(index)} className="mr-1">
              <FontAwesomeIcon icon={faMinus} /> Delete Photo
            </Button>
            :
            null
            }



            {props.previousID !== null ?
            <Button color="secondary" tag={Link} to={"/profile/" + props.profileID +"/albums/" + props.albumID +"/"+props.previousID}>
              <FontAwesomeIcon icon={faAngleLeft} /> Previous
            </Button>
            :
            <Button color="secondary" tag={Link} to={"/profile/" + props.profileID +"/albums/" + props.albumID }>
              <FontAwesomeIcon icon={faAngleLeft} /> Back to Album
            </Button>
            }



            {props.nextID !== null ?
            <Button
            color="secondary"
            className="ml-1"
            tag={Link}
            to={"/profile/" + props.profileID +"/albums/" + props.albumID +"/"+props.nextID}
            >
            Next  <FontAwesomeIcon icon={faAngleRight} />
            </Button>
            :
            <Button
            color="secondary"
            className="ml-1"
            tag={Link}
            to={"/profile/" + props.profileID +"/albums/" + props.albumID +"/" }
            >
            Back to Album  <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          }


            <Modal
              isOpen={openModals[index]}
              toggle={() => toggle(index)}
            >
              <ModalHeader toggle={() => toggle(index)}>
                Delete Photo
              </ModalHeader>
              <ModalBody className="text-center m-3">
                <p className="mb-0">
                Are you sure you want to delete this photo? This cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => toggle(index)}>
                  Cancle
                </Button>{" "}
                <Button
                  color="danger"
                    onClick={() => {toggle(index); props.onSubmit()}}
                >
                  Delete Photo
                </Button>
              </ModalFooter>
            </Modal>
          </React.Fragment>
        ))}

    </div>
  );
}

export default OptionsModal;
