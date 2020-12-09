import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import store from "../../../redux/store/index";
import { connect } from 'react-redux';
import {
  Button,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { uploadAvatarPhoto } from "../../../redux/actions/social";
import { loadUserSocial } from "../../../redux/actions/auth";

const index = 1



async function Postphoto(y,z,a){
    await store.dispatch(uploadAvatarPhoto(y,z));
    await a.photo_change_flag('1');
    await store.dispatch(loadUserSocial());
  }




class MyEditor extends React.Component {

  onClickSave = async () => {
    if (this.editor) {
      await Postphoto(store.getState().auth.user.pk, this.editor.getImage().toDataURL(), this.props)
      await this.props.avatarfunction(null)
      }
    }


  setEditorRef = (editor) => this.editor = editor

  render () {
    return (
      <div>
        <ModalBody className="text-center m-3">
          <p className="mb-0">
            Use Bootstrap’s JavaScript modal plugin to add dialogs to
            your site for lightboxes, user notifications, or completely
            custom content.
          </p>
          <AvatarEditor
            ref={this.setEditorRef}
            image={this.props.avatarphoto}
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
            borderRadius={200}
          />
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={() => {this.props.toggle(index);  this.props.avatarfunction(null)}}>
            Close
          </Button>{" "}

          <Button
            color="primary"
            onClick={() => {this.props.toggle(index);  this.onClickSave();}}>
            Save changes
          </Button>
        </ModalFooter>

      </div>

    )
  }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { uploadAvatarPhoto })(MyEditor);
