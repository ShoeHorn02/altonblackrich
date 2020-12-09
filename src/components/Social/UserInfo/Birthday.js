import React from "react";
import Select from 'react-select'
import Loader from "../../../components/Loader";
import {
  Col,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { connect } from 'react-redux';
import store from "../../../redux/store/index";
import {
  API_BIRTHDAY_MONTH_CHOICES,
  API_BIRTHDAY_YEAR_CHOICES,
} from '../../../redux/actions/API';
import axios from "axios";
import { keyConfig } from '../../../redux/actions/auth';
import { loadUser } from '../../../redux/actions/auth';



class Default extends React.Component {

    fetchInitial = () =>  {
      axios.get(`${API_BIRTHDAY_MONTH_CHOICES}`, keyConfig(store.getState)).then(res => {
        this.setState({
          optionsMonth: res.data.map(({ id,month }) => {return{value: id, label: month, id: id }}),
        });
      });
      axios.get(`${API_BIRTHDAY_YEAR_CHOICES}`, keyConfig(store.getState)).then(res => {
        this.setState({
          optionsYear: res.data.map(({ id,year }) => {return{value: id, label: year, id: id }}),
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
        api_first_name_last_name: [],
        api_first_name_last_name_loading: true,
        selectedOption: null,
        current_photo: store.getState().auth.user.profile_photo,
        optionsMonth: [],
        optionsYear: [],

      };
    }

    handleMonthChange = (selectedMonth: any,) => {
      this.setState({ selectedMonth });
      this.props.birthmonth_change(selectedMonth.id)
    };

    handleYearChange = (selectedYear: any,) => {
      this.setState({ selectedYear });
      this.props.birthyear_change(selectedYear.id)

  };

    render() {
      if ( this.props.user_status === null) {
        return <Loader />
      }
      return(
        <Form onSubmit={this.onSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">Birthday Month</Label>

                  <Select
                    classNamePrefix="react-select"
                    options={this.state.optionsMonth}
                    onChange={this.handleMonthChange}
                    value={this.state.selectedMonth}
                    placeholder={this.props.currentbirthMonth? this.props.currentbirthMonth : "January"}

                  />

                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastName">Birthday Year</Label>

                  <Select

                    classNamePrefix="react-select"
                    options={this.state.optionsYear}
                    onChange={this.handleYearChange}
                    value={this.state.selectedYear}
                    placeholder={this.props.currentbirthYear? this.props.currentbirthYear : "1995"}

                  />


                </FormGroup>
              </Col>
            </Row>


          </Form>
        );
      }
  }

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
});

export default connect(mapStateToProps, {  })(Default);
