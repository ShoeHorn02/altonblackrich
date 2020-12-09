import React from "react";
import { connect } from 'react-redux';
import UploadImage from './UploadImage'
import ModalPopUp from './ModalPopUp'

class Default extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploaded_image: null,
      imagecropped: null,
      profile_picture_status: this.props.profile_picture_status
    }
  }

  handler = (val) => {
    console.log(val)
    this.setState({
      uploaded_image: val
    })
  }


  componentDidUpdate() {
    if (this.state.profile_picture_status !== this.props.profile_picture_status) {
      console.log('heyehyehye')
      this.setState({
        profile_picture_status: this.props.profile_picture_status
      })
    }
  }


  render() {

    return (
      <div>

        {this.state.uploaded_image === null ?
          <UploadImage
            avatarfunction = {this.handler}
            profile_picture_status = {this.state.profile_picture_status}
            userid = {this.props.userid}
            />
          :
          <ModalPopUp
            avatarfunction = {this.handler}
            profile_picture_status = {this.state.profile_picture_status}
            avatarphoto={this.state.uploaded_image}
            photo_change_flag = {this.props.photo_change_flag} />
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {  })(Default);
