import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardHeader,
  CardText,
  Button,
} from "reactstrap";
import unsplash2 from "../../../assets/img/vector/2911.jpg";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Status = (props) => (
  <Card style={{"justifyContent": "center", "textAlign": "center"}}>
    <CardImg top width="100%" src={unsplash2} alt="Card image cap" />
    <CardHeader>
      <h3 className="mb-0" style={{"justifyContent": "center", "textAlign": "center"}}>
        Get Liting!
      </h3>
    </CardHeader>
    <CardBody>
      <CardText>
      Discover workouts or create your own. Doesn't matter, lift something...
      </CardText>
      <Button tag={Link} to="/workouts/All/" color="primary" className=" pl-2 pr-2 btn-pill" outline size="lg">
        <FontAwesomeIcon icon={faDumbbell} className="mr-3 mt-1 float-left"/> Discover Workouts
      </Button>
    </CardBody>
  </Card>
);

export default Status;
