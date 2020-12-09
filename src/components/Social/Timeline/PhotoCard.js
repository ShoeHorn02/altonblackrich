import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Media,
  Row,
  Col,
  Badge,
} from "reactstrap";


class PhotoCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      album_user_id: this.props.album.user_id_xref[0].pk,
      album_id: this.props.album.id,
      linkToAlbum: '/profile/' + this.props.album.user_id_xref[0].pk + '/albums/' + this.props.album.id,
    };
  }

  renderPhotos = (x) => {
    const mystyle = {
      float: 'left',
      width:  '400px',
      height: '400px',
      'object-fit': 'cover',
      border: '1px solid green'
    };

    if (x === 1 ) {
      return(
        <img src={this.props.album.photos[0].photo} className="img-fluid mb-2" alt="Unsplash" />
      )
    }
    else if (x >= 2 ) {
      return(
        <Row noGutters className="mt-1">
          <Col xs="6">
            <img src={this.props.album.photos[0].photo} className="img-fluid pr-1" alt="Unsplash1" style={mystyle}/>
          </Col>
          <Col xs="6">
            <img src={this.props.album.photos[1].photo} className="img-fluid pl-1" alt="Unsplash2" style={mystyle} />
          </Col>
        </Row>
      )
    }
  }



  renderDes = (x) => {


    if (x === null ) {
      return(
        null
      )
    }
    else if (x !== null ) {
      return(
        <p>
          {this.props.album.description}
        </p>
      )
    }
  }

  render() {
    return (
      <div>
        <Media body>


          {this.renderDes(this.props.album.description)}
          {this.renderPhotos(this.props.album.photos.length)}



          <br />

        </Media>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(PhotoCard);;
