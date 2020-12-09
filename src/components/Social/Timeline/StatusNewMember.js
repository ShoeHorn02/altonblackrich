import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardHeader,
} from "reactstrap";
import unsplash2 from "../../../assets/img/vector/2911.jpg";



const Status = (props) => (
  <Card style={{"justifyContent": "center", "textAlign": "center"}}>
    <CardImg top width="100%" src={unsplash2} alt="Card image cap" />
    <CardHeader>
      <h3 className="mb-0" style={{"justifyContent": "center", "textAlign": "center"}}>
        We are waiting on {props.active_id === props.member_id ? 'Your' : props.member_first_name +"'s" } first lift!
      </h3>
    </CardHeader>
    <CardBody>

    </CardBody>
  </Card>
);

export default Status;
