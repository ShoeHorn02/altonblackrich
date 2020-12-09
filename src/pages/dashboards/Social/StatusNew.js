import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
} from "reactstrap";

import unsplash2 from "../../../assets/img/vector/personal-trainers-01.svg";

const Status = () => (
  <Card style={{"justifyContent": "center", "textAlign": "center"}}>
    <CardImg top width="100%" src={unsplash2} alt="Card image cap" />
    <CardHeader>
      <h3 className="mb-0" style={{"justifyContent": "center", "textAlign": "center"}}>
        Enroll In A Workout
      </h3>
    </CardHeader>
    <CardBody>
      <CardText>
        <strong>First enroll in a workout and then you can track your lifts and view your progress here!</strong>
      </CardText>


      <Button tag={Link} to="/workouts/All" color="primary" outline className="btn-pill mr-1 mb-1" size="lg">
        See All workouts
      </Button>
    </CardBody>
  </Card>
);

export default Status;
