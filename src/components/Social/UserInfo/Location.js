import React from "react";
import Select from 'react-select'
import Loader from "../../../components/Loader";
import {
  FormGroup,
  Label,
} from "reactstrap";


import { postFirstLastName } from '../../../redux/actions/social';
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import {
  API_USER_PROFILES,
  API_LOCATION_CITY,
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';



async function UpdatePublicInfo(userid, firstname,lastname, changeflag) {
  await store.dispatch(postFirstLastName(userid, firstname,lastname));
  await changeflag('1');
 }



class Default extends React.Component {


    fetchInitial = () =>  {
      const user_id = this.props.user_status.pk
      axios.get(`${API_LOCATION_CITY}?search=${this.state.location_typed}`, keyConfig(store.getState)).then(res => {
        this.setState({
          location_before: this.state.location_typed,
          api_location_city_search: res.data.results.map(({ id,location }) => {return{value: location, label: location, id: id }}),
        });
      });
      axios.get(`${API_USER_PROFILES}${user_id}`, keyConfig(store.getState)).then(res => {
        this.setState({
          api_current_location: res.data.location_city_std,
          api_current_location_loading: false,
        });
      });
    }






    fetchTimeZone = (x) =>  {
      axios.get(`${API_LOCATION_CITY}${x.id}/`, keyConfig(store.getState)).then(res => {
        this.setState({
          api_timezone: res.data.timezone,
        });
      });
    }


    fetchCity = () =>  {
      axios.get(`${API_LOCATION_CITY}?search=${this.state.location_typed}`, keyConfig(store.getState)).then(res => {
        this.setState({
          API_LOCATION_CITY: res.data,
          location_before: this.state.location_typed,
          api_location_city_search: res.data.results.map(({ id,location }) => {return{value: location, label: location, id: id }}),
        });
      });
    }






    componentDidMount() {
      if (this.props.user_status === null) {
        store.dispatch(loadUser());
      }
      this.fetchInitial();
    }


    componentDidUpdate() {
      if (this.state.location_before !== this.state.location_typed) {
        this.fetchCity();
        console.log('zzzzz')
      }

    }

    constructor(props) {
      super(props);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.state = {
        api_user_profiles: [],
        api_location_city_search: [],
        api_current_location_loading: false,
        selectedOption: null,
        location_typed: "toronto",
        location_before: "tor",
        api_timezone: null,
        current_photo: store.getState().auth.user.profile_photo,
        form_change_flag: 0
      };
    }



    handleLocationChange = (selectedOption: any,) => {
      this.setState({ selectedOption });
      this.fetchTimeZone(selectedOption)
      this.props.location_change(selectedOption.id)
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
    if (  this.props.user_status === null || this.state.api_current_location_loading) {
      return <Loader />
    }

    return(


                    <FormGroup>
                      <Label for="city">Location</Label>
                      <Select


                        value={this.state.selectedOption}
                        classNamePrefix="react-select"
                        options={this.state.api_location_city_search}
                        onChange={this.handleLocationChange}
                        placeholder= {this.state.api_current_location}
                        openMenuOnClick={false}
                        onInputChange={this.handleLocationInputChange}
                        />

                    </FormGroup>


    );
  }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
