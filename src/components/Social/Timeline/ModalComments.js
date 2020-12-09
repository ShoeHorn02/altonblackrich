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
import ModalDelete from './ModalDelete'
import ProfilePhoto from '../../../components/Social/ProfilePhoto/ProfilePhoto'
import LazyLoad from 'react-lazyload';

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




const ModalExample = (props) => {
  const {
    buttonLabel,
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
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }


  return (
    <div>
      <span
        color="primary"
        onClick={toggle}
        className="text-primary customComments"
      >
        <small>and {props.comment_count - 5} more comments</small>
      </span>

      <Modal isOpen={modal} toggle={toggle} className={className}>


        {props.data_source === "photo" ?
        <ModalHeader toggle={toggle}  className="d-flex justifyContent-between mb-0 pb-0">

          <p1> test </p1>

        </ModalHeader>
        :
        props.data_source === "timeline_exercise" ?
        <ModalHeader toggle={toggle}  className="d-flex justifyContent-between mb-0 pb-0">

          {props.x.user_id_xref[0].firstname_lastname +"'s " + props.x.exercises[0].user_exercise_tracker_xref.derived__part_of_day}
          <br />
          <small className="float-left text-navy">
            lifted {props.x.exercises[0].user_exercise_tracker_xref.derived__historic_datetime}
          </small>
        </ModalHeader>
        :
        props.data_source === "timeline_album" ?
        <ModalHeader toggle={toggle}  className="d-flex justifyContent-between mb-0 pb-0">

          <p1> test22 </p1>

        </ModalHeader>
        :
        null
      }



        <ModalBody className="text-left m-0">



        {props.p.map((a,b) =>
                        <LazyLoad>
        <Media className=" d-flex justifyContent-start m-0 p-0" >
          <div className="pr-2 mt-3">
          <Link to={"../../profile/" + a.commenting_user_id_xref.id + "/home"} >
            <ProfilePhoto
              profile_photo={a.commenting_user_id_xref.profile_photo}
              avatar_color = {a.commenting_user_id_xref.avatar_color}
              avatar_letter = {a.commenting_user_id_xref.avatar_letter}
              avatar_size={"36px"}
              letter_size={"18px"}
              active_user_id = {props.active_user_id }
              user_id = {a.commenting_user_id_xref.id}
              />
              </Link>
          </div>
          <Media body className="d-flex justifyContent-start ml-2 mt-3" >
          <div>
            <p className="text-muted m-0 p-0">
                <Link
                to={"../../profile/" + a.commenting_user_id_xref.id + "/home"}
                style={{color:"	#696969",'textDcoration':'none'}}>

                  <strong style={{color:"bloack"}}>{a.commenting_user_id_xref.firstname_lastname}</strong>

                </Link>:
              {a.comment}
            </p>
            <small className="m-0 p-0 text-muted float-left"> {a.historic_datetime}

            {props.active_user_id === props.x.user_id_xref[0].id || props.active_user_id === a.commenting_user_id_xref.id?
              <ModalDelete
                a = {a}
                active_user_id = {props.active_user_id }
                onDelete = {props.onDelete}
                page = {props.page}
                time={props.time}
                />
                :
                null
              }


             </small>
            </div>



          </Media>





        </Media>
              </LazyLoad>
                )}








        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;
