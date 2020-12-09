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


import unsplash2 from "../../../assets/img/vector/completed.jpg";


const Completed = () => (
  <section className="flex-fill w-100">
    <Card style={{"justifyContent": "center", "textAlign": "center"}}>
      <CardImg top width="100%" src={unsplash2} alt="Card image cap" />
      <CardHeader>
        <h3  className="mb-0" style={{"justifyContent": "center", "textAlign": "center"}}>
          Champ!
        </h3>
      </CardHeader>
      <CardBody>
        <CardText>
          <strong>But know that lifiting doesn't ever end here. It is a lifestyle. Keep on lifting!</strong>
        </CardText>


        <Button tag={Link} to="/workouts/All" color="primary" outline className="btn-pill mr-1 mb-1">
          See All workouts
        </Button>
      </CardBody>
    </Card>
  </section>
);

export default Completed;
