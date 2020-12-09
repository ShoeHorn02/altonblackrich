import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import LoaderSpin from './LoaderSpin'
import { connect } from 'react-redux';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput
} from "reactstrap";



const colors = [
  {
    name: "Primary",
    value: "primary"
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

  const createalbum = async (index) => {
     await toggle(index);
     await props.buttonSpinnerFunction(1);
     await props.showToastr(props.album_name_value)
     await setTimeout(async () => {
       await props.onSubmit();
     }, 1500);
   };



  return (
    <div className={props.location}>


        {colors.map((color, index) => (
          <React.Fragment key={index}>
          {props.outline==="yes"?
            <Button
              color="primary"
              onClick={() => toggle(index)}
              className="btn-pill mr-1 mb-1"
              size="lg"
              outline
              >
              <FontAwesomeIcon icon={faPlus} /> New Album
            </Button>
            :
            <Button
              color="secondary"
              onClick={() => toggle(index)}
              className="btn-pill mr-1 mb-1"
              size="md"
              >
              <FontAwesomeIcon icon={faPlus} /> New Album
            </Button>

            }
            <Modal
              isOpen={openModals[index]}
              toggle={() => toggle(index)}
            >
              <ModalHeader toggle={() => toggle(index)}>
                New Album
              </ModalHeader>
              <Form onSubmit={(e) => {e.preventDefault(); createalbum(props.userid);}}>
                <ModalBody className="text-center mb-4">
                  {props.renderAlbumForm()}
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={() => toggle(index)}>
                    cancel
                  </Button>{" "}
                  {props.button_spinner === 0 ?
                      <Button
                        color="primary"
                        type="submit"
                      >
                        Save and continue
                      </Button>

                      :

                      <Button color="primary" disabled>
                        <LoaderSpin />
                      </Button>

                    }
                </ModalFooter>
              </Form>
            </Modal>
          </React.Fragment>
        ))}

    </div>
  );
}





class AddAlbum extends React.Component {

  constructor() {
    super();
    this.state = {
      post_to_timeline: false
    };
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if ( e.target.name === "album_name") {
      this.props.album_name_function(e.target.value)
    }
    if ( e.target.name === "album_des") {
      this.props.album_des_function(e.target.value)
    }
  }


  onChangeCheck = (e) => {
    if ( this.props.post_to_timeline ) {
      this.props.post_to_timeline_function(false)
    }
    else if ( !this.props.post_to_timeline ) {
      this.props.post_to_timeline_function(true)
    }
  }


  onSubmit = (e) => {
    e.preventDefault();
  }



  renderAlbumForm = () => {

    return(
      <div className="mb-1">
        <FormGroup>
          <Label className="float-left"> Album Name</Label>
          <Input
            type="text"
            rows="2"
            id="inputBio"
            name="album_name"
            onChange={this.onChange}
            bsSize={this.props.size}
            required
            placeholder="Album Name"
          />
        </FormGroup>

        <FormGroup>
          <Label className="float-left"> Album Description (Optional)</Label>
          <Input
            type="textarea"
            rows="4"
            id="inputBio"
            name="album_des"
            onChange={this.onChange}
            bsSize={this.props.size}
            placeholder="Say something about your album"
          />
        </FormGroup>

        <FormGroup className="float-left">
          <CustomInput
            className="float-left"
            type="checkbox"
            id="checkbox"
            label="Publish to timeline feed"
            defaultChecked= {this.state.post_to_timeline}
            onChange={this.onChangeCheck}
            />
        </FormGroup>

        </div>
    )
  }


  render() {

    return (

      <DefaultModal
      outline = {this.props.outline}
      buttonSpinnerFunction = {this.props.buttonSpinnerFunction}
      showToastr = {this.props.showToastr}
      album_name_value = {this.props.album_name_value}
      onSubmit = {this.props.onSubmit}
      location = {this.props.location}
      button_spinner = {this.props.button_spinner}
      userid = {this.props.userid}
      renderAlbumForm = {this.renderAlbumForm}
      />


    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(AddAlbum);
