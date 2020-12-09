import React from "react";
import Select from 'react-select'
import Loader from "../../../components/Loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import { MoreVertical, RefreshCw } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Location from '../../../components/Social/UserInfo/Location'
import { postFirstLastName } from '../../../redux/actions/social';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";

import { nameChange } from '../../../redux/actions/auth';




import Header from "../../../components/Header";


import { Link } from "react-router-dom";

import {
  API_LOCATION,
  API_USER_PROFILES,
  API_USER_PROFILES_FILTER,
  API_USER_FIRSTNAME_LASTNAME,
  API_USER_HEADING
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';




const customStyles = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: 14,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    width: '250px',
    background: '#f8f9fa'

  }),



  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(255, 80, 86)' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    fontFamily: 'Arial, Helvetica, sans-serif',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(255, 80, 86)',
  }),
}





async function UpdatePublicInfo(userid, firstname,lastname, changeflag) {
  const resultFollow = await store.dispatch(postFirstLastName(userid, firstname,lastname));
  const changeflagblock = await changeflag('1');
 }



class Default extends React.Component {


    fetchInitial = () =>  {
      axios.get(`${API_USER_FIRSTNAME_LASTNAME}`, keyConfig(store.getState)).then(res => {
        this.setState({
          api_first_name_last_name : res.data[0],
          api_first_name_last_name_loading: false,
          form_change_flag: 0,
        });
      })
      axios.get(`${API_USER_HEADING}`, keyConfig(store.getState)).then(res => {
        this.setState({
          api_heading : res.data[0],
          api_heading_loading: false,
        });
      })
    }









    fetchfirstlastName = () =>  {
      const memberID = store.getState().auth.user.pk
      axios.get(`${API_USER_FIRSTNAME_LASTNAME}`, keyConfig(store.getState)).then(res => {
        this.setState({
          api_first_name_last_name : res.data[0],
          form_change_flag: 0,
        });
      })
    }


    componentDidMount() {
      if (this.props.user_status === null) {
        store.dispatch(loadUser());
      }
      this.fetchInitial();
    }


    componentDidUpdate() {


      if (this.state.form_change_flag !== 0) {
        console.log('first name last name updated')
        this.fetchfirstlastName();
      }
    }

    constructor(props) {
      super(props);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.state = {
        api_user_profiles: [],
        api_first_name_last_name: [],
        api_first_name_last_name_loading: true,
        api_heading: [],
        api_heading_loading: true,
        api_location_search: [],
        selectedOption: null,
        current_photo: store.getState().auth.user.profile_photo,
        form_change_flag: 0
      };
    }



    handleLocationChange = (selectedOption: any,) => {
      this.setState({ selectedOption });
      this.fetchTimeZone(selectedOption)
  };


  handleLocationInputChange = (inputValue: any, actionMeta: any) => {
     this.setState({ search_value: inputValue });
     this.setState({ location_typed: inputValue });
     console.log(this.state.location_typed)
   };





   handlerFormChange = (val) => {
     this.setState({
       form_change_flag: val
     })
   }

   onChange = (e) => {
     this.setState({ [e.target.name]: e.target.value });
   }

   onSubmit = (e) => {
     e.preventDefault();
     UpdatePublicInfo(
       this.props.user_status.pk,
       this.state.firstName,
       this.state.lastName,
       this.handlerFormChange);
   }

  render() {
    if ( this.state.api_first_name_last_name_loading || this.state.api_heading_loading || this.props.user_status === null) {
      return <Loader />
    }

    return(


              <Form onSubmit={this.onSubmit}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="firstName">First name</Label>

                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        bsSize={this.props.formSize}
                        placeholder={this.state.api_first_name_last_name? this.state.api_first_name_last_name.first_name : "First name"}
                        onChange={this.onChange}
                        required
                      />

                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastName">Last name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        bsSize={this.props.formSize}
                        placeholder={this.state.api_first_name_last_name? this.state.api_first_name_last_name.last_name : "Last name"}
                        onChange={this.onChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Label for="inputBio">Heading</Label>
                  <Input
                    type="textarea"
                    rows="2"
                    id="inputBio"
                    name="heading"
                    onChange={this.onChange}
                    bsSize={this.props.formSize}
                    placeholder="Add a short summary about yourself that will grab attention."
                  />
                </FormGroup>

                {this.props.formSize === 'lg' ?
                 null
               :
                <Row form>
                  <Col md={6}>

                  <Location />


                  </Col>
                  <Col md={6} >
                    <FormGroup >
                      <Label for="zipcode">TimeZone</Label>
                      <p>{this.state.api_timezone}</p>
                    </FormGroup>
                  </Col>
                </Row>
                }

                {this.props.formSize === 'lg' ?
                <Button color="primary" style={{float:'right'}}>Continue</Button>
                :
                <Button color="primary">Save changes</Button>
              }
              </Form>

    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
