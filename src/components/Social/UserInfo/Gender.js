import React from "react";
import Select from 'react-select'
import Loader from "../../../components/Loader";
import {
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import {
  API_GENDER_CHOICES
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';


class Default extends React.Component {

    fetchInitial = () =>  {
      axios.get(`${API_GENDER_CHOICES}`, keyConfig(store.getState)).then(res => {
        this.setState({
          optionsGender: res.data.map(({ id,gender }) => {return{value: id, label: gender, id: id }}),
        });
      });
    }

    componentDidMount() {
      if (this.props.user_status === null) {
        store.dispatch(loadUser());
      }
      this.fetchInitial();
    }


    constructor(props) {
      super(props);
      this.state = {
        optionsGender: [],
        selectedGender: null,
      };
    }

    handleGenderChange = (selectedGender: any,) => {
      this.setState({ selectedGender });
      this.props.gender_change(selectedGender.id)
    };

    render() {
      if ( this.props.user_status === null) {
        return <Loader />
      }

      return(
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="firstName">Gender</Label>

            <Select

              classNamePrefix="react-select"
              options={this.state.optionsGender}
              onChange={this.handleGenderChange}
              value={this.state.selectedGender}
              placeholder="Other"
              size="lg"
            />
          </FormGroup>
        </Form>
      );
    }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Default);
