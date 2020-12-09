import React from "react";
import axios from "axios";
import { keyConfig } from '../../redux/actions/auth';
import store from "../../redux/store/index";
import { API_EXERCISE_LIST } from '../../redux/actions/API'
import ExerciseDetailSub from './ExerciseDetailSub'

class ExercisesDetail extends React.Component {

  fetchWorkouts = () =>  {
    const exerciseID = this.props.match.params.exerciseID;
    axios.get(`${API_EXERCISE_LIST}/${exerciseID}/`, keyConfig(store.getState)).then(res => {
      this.setState({
        exercise_detail: [res.data]
      });
    });
  }

  componentDidMount() {
    this.fetchWorkouts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchWorkouts();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      exercise_detail: [],
    };
  }

  render() {
    return (
      <ExerciseDetailSub exercise_detail = {this.state.exercise_detail}/>
    );
  }
}


export default ExercisesDetail;
