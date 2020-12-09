import React, { useState }  from "react";
import { toastr } from "react-redux-toastr";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { deleteUser } from '../../../redux/actions/social';
import { logout } from "../../../redux/actions/auth";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";





  const ModalDelete = (props) => {
    const {
      className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);



    const deleteuser = async (userid) => {
       await setModal(!modal);
       await props.toaster()
       await setTimeout(async () => {
         await store.dispatch(logout());
         await store.dispatch(deleteUser(userid, "false"));
       }, 1500);
     };

    return (
      <Card>

        <CardHeader>
          <CardTitle tag="h5">Delete Account</CardTitle>
        </CardHeader>


         <CardBody className="text-left float-left">
         <p>
           Use Bootstrap’s JavaScript modal plugin to add dialogs to your site
           for lightboxes, user notifications, or completely custom content.
         </p>

          <Button color="danger" onClick={toggle}>Delete Account</Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              This will delete your account forever. All your data will be gone. Feel free to signup again when you are ready to lift again!
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>Cancel</Button>{' '}
              <Button color="danger" onClick={() => {deleteuser(props.userid);} }>Delete Account Forever</Button>
            </ModalFooter>
          </Modal>
        </CardBody>

      </Card>
    );
  }



class Delete extends React.Component {


  showToastr = () => {
    const options = {
      timeOut: parseInt(this.state.timeOut),
      showCloseButton: this.state.showCloseButton,
      progressBar: this.state.progressBar,
      position: this.state.position
    };

    const toastrInstance =
      this.state.type === "info"
        ? toastr.info
        : this.state.type === "warning"
        ? toastr.warning
        : this.state.type === "error"
        ? toastr.error
        : toastr.success;

    toastrInstance(
      this.state.title,
      this.state.message || "Destroying Your Account",
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
      position: "top-right"
    };
  }



  render() {
    return(


          <ModalDelete userid = {this.props.user_status.pk} toaster = {this.showToastr}/>

    );
  }
}

const mapStateToProps = (state) => ({

  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Delete);
