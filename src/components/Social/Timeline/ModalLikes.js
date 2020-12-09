import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import Likes from './Likes'

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




          <span>
            <Link
              color="primary"
              onClick={() => toggle(index)}
              className=""
            >
              {props.count + ' ' + props.word}
            </Link>
            <Modal
              isOpen={openModals[index]}
              toggle={() => toggle(index)}
              className={""}
            >
              <ModalHeader toggle={() => toggle(index)}>
                Colored modal
              </ModalHeader>
              <ModalBody className="text-center m-1">

                <Likes likes={props.likes} />

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => toggle(index)}>
                  Close
                </Button>{" "}
              </ModalFooter>
            </Modal>
          </span>



  );
}

export default DefaultModal;
