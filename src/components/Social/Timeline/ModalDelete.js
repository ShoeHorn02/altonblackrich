import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
} from "reactstrap";
import { Link } from "react-router-dom";
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto'

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
              <span
                className="ml-1 text-primary customComments"
                onClick={() => toggle(index)}
                >delete</span>

            <Modal
              isOpen={openModals[index]}
              toggle={() => toggle(index)}
              className={""}
              style={{overflow: 'visible', position: 'relative'}}
            >

              <ModalHeader  toggle={() => toggle(index)} className="pt-2 pb-2" style={{'backgroundColor':"#dc3545"}}><span style={{color:'#fff'}}>Delete Comment</span></ModalHeader>
              <ModalBody className="text-left m-1">

              <div className=" d-flex justifyContent-start mt-0 mb-0">
                <p> Are your sure you want to delete? This cannot be undone. </p>
              </div>
              <hr className="mt-1 mb-1"/>

              {props.data_source==="photo" ?
              <Media className=" mt-1 d-flex justifyContent-start" >
                <div className="pr-2">
                <Link
                to={"../../profile/" + props.b.id + "/home"}
                style={{color:"	#696969",'textDcoration':'none'}}>
                    <ProfilePhoto
                      profile_photo={props.b.profile_photo}
                      avatar_color = {props.b.avatar_color}
                      avatar_letter = {props.b.avatar_letter}
                      avatar_size={"36px"}
                      letter_size={"18px"}
                      active_user_id = {props.active_user_id }
                      user_id = {props.b.id}
                      />
                    </Link>
                </div>
                <Media body className="d-flex justifyContent-start ml-2" >
                <div>
                    <p className="text-muted m-0 p-0">
                    <Link
                    to={"../../profile/" + props.b.id + "/home"}
                    style={{color:"	#696969",'textDcoration':'none'}}>
                          <strong>{props.b.firstname_lastname}</strong>:
                        </Link>
                      {' ' + props.a.comment}
                    </p>

                  <small className="m-0 p-0 text-muted float-left"> {props.a.historic_datetime} </small>
                  </div>
                </Media>



              </Media>
              :
              <Media className=" mt-3 d-flex justifyContent-start" >
                <div className="pr-2">
                <Link
                to={"../../profile/" + props.a.commenting_user_id_xref.id + "/home"}
                style={{color:"	#696969",'textDcoration':'none'}}>
                    <ProfilePhoto
                      profile_photo={props.a.commenting_user_id_xref.profile_photo}
                      avatar_color = {props.a.commenting_user_id_xref.avatar_color}
                      avatar_letter = {props.a.commenting_user_id_xref.avatar_letter}
                      avatar_size={"36px"}
                      letter_size={"18px"}
                      active_user_id = {props.active_user_id }
                      user_id = {props.a.commenting_user_id_xref.id}
                      />
                    </Link>
                </div>
                <Media body className="d-flex justifyContent-start ml-2" >
                <div>
                    <p className="text-muted m-0 p-0">
                    <Link
                    to={"../../profile/" + props.a.commenting_user_id_xref.id + "/home"}
                    style={{color:"	#696969",'textDcoration':'none'}}>
                          <strong>{props.a.commenting_user_id_xref.firstname_lastname}</strong>:
                        </Link>
                      {' ' + props.a.comment}
                    </p>

                  <small className="m-0 p-0 text-muted float-left"> {props.a.historic_datetime} </small>
                  </div>
                </Media>



              </Media>
            }



              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => toggle(index)}>
                  Close
                </Button>{" "}
                <Button color="danger" onClick={() => {toggle(index);  props.onDelete(props.a.id, props.page, props.time) }}>
                  Delete
                </Button>{" "}
              </ModalFooter>
            </Modal>
          </span>



  );
}

export default DefaultModal;
