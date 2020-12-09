import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Row,
  Col,
} from "reactstrap";
import Loader from "../components/Loader";
import { API_LANDING_INSTAGRAM_PUBLIC } from '../redux/actions/API'
import store from "../redux/store/index";
import { keyConfig } from '../redux/actions/auth';



class Auth extends React.Component {

  fetchPhoto = () =>  {
    axios.get(`${API_LANDING_INSTAGRAM_PUBLIC}`, keyConfig(store.getState)).then(res => {
      this.setState({
        background_photo: res.data[Math.floor(Math.random() * res.data.length)].photo,
        background_photo_loading: false
      });
    });
  }

  componentDidMount() {
    this.fetchPhoto();
  }

  constructor(props) {
    super(props);

    this.state = {
      background_photo: null,
      background_photo_loading: true,
    };
  }

  render() {
    if ( this.state.background_photo_loading === true) {
      return <Loader />
    }
    const {children} = this.props
    return (

      <section className="" style={{background:'#f7f7f7'}}>
        <div className="container-fullwidth m-0 p-0" style={{height: '100%', width: '100%', 'overflowX':'hidden', 'overflowY':'auto'}}>
            <Row className="min-vh-100">
                <Col md="8" lg="6" xl="5" className="m-0 p-0">
                  {children}
                </Col>
                <Col md="4" lg="6" xl="7" className="d-none d-md-block m-0 p-0">
                    <div
                        style={{ "backgroundImage": `url(${this.state.background_photo})`, 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center center', 'backgroundSize': 'cover', width:"100%", height:"100vh", "marginRight": "-0.75rem"}  }
                        className="bg-cover h-100 mr-n3"
                    />
                </Col>
            </Row>
        </div >
      </section>


    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  sidebar: state.sidebar
});

export default connect(mapStateToProps, {  })(Auth);
