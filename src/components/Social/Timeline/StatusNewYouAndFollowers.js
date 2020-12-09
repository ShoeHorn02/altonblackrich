import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import unsplash1 from "../../../assets/img/vector/Kettle_Bell.svg";
import unsplash2 from "../../../assets/img/vector/trainer2.svg";
import unsplash3 from "../../../assets/img/vector/1315.jpg";
import unsplash4 from "../../../assets/img/vector/FatSlim.svg";
import { faDumbbell,faUserPlus,faCamera, faBookReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CardWorkouts = () => (
  <Card>
    <CardImg top width="100%" src={unsplash1} alt="Card image cap" />
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Get lifting
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
      Discover workouts or create your own
      </CardText>
      <Button tag={Link} to="/workouts/All" size="lg" color="primary" className="d-flex justify-content-center pl-2 pr-2 btn-pill" outline>
        <FontAwesomeIcon icon={faDumbbell} className="mr-3 mt-1 float-left"/> Discover Workouts
      </Button>
    </CardBody>
  </Card>
);

const CardAthletes = () => (
  <Card>
    <CardImg top width="100%" src={unsplash2} alt="Card image cap" />
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Follow Friends and Athletes
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
      It helps with motivation and momentum
      </CardText>
      <Button href="#" color="primary" size="lg" className="d-flex justify-content-center pl-2 pr-2 btn-pill" outline tag={Link} to ="/discover">
          <FontAwesomeIcon icon={faUserPlus} className="mr-3 mt-1 float-left"/>  Discover Athletes
      </Button>
    </CardBody>
  </Card>
);

const CardReadBlog = () => (
  <Card style={{'background-color':'#f8fafd'}}>
    <CardImg top width="100%" src={unsplash4} alt="Card image cap" />
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        The Iron Lift
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        Weight loss Building Musle...Grow yourself!
      </CardText>
      <Button href="#" color="primary" size="lg" className="d-flex justify-content-center pl-2 pr-2 btn-pill" outline tag={Link} to ="/discover">
          <FontAwesomeIcon icon={faBookReader} className="mr-3 mt-1 float-left"/> Read Blog
      </Button>
    </CardBody>
  </Card>
);

const CardPhoto = () => (
  <Card style={{'background-color':'#f8fafd'}}>
    <CardImg top width="100%" src={unsplash4} alt="Card image cap" />
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Take your before Selfis!
      </CardTitle>
    </CardHeader>
    <CardBody>
      <CardText>
        Show your progress. Take your before pictures now
      </CardText>
      <Button href="#" color="primary" size="lg" className="d-flex justify-content-center pl-2 pr-2 btn-pill" outline tag={Link} to ="/discover">
          <FontAwesomeIcon icon={faCamera} className="mr-3 mt-1 float-left"/> Record Photos
      </Button>
    </CardBody>
  </Card>
);

const CardProgress = () => (
  <Card>
    <CardImg top width="100%" src={unsplash3} alt="Card image cap" />
  </Card>
);

const Cards = () => (

<div>

    <Row>
      <Col md="6" lg="6">
        <CardAthletes />
      </Col>
      <Col md="6" lg="6">
        <CardWorkouts />
      </Col>
      <Col md="6" lg="6">
        <CardReadBlog />
      </Col>
      <Col md="6" lg="6">
        <CardPhoto />
      </Col>
    </Row>

  <CardProgress/>

</div>
);

export default Cards;
