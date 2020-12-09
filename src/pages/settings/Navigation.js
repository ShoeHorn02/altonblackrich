import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  ListGroupItem,
  ListGroup

} from "reactstrap";
import { Link } from 'react-router-dom';


const border = {
  "borderBottom":"1px solid #d3d3d3",
};


const pages = [
  {
    name: "account",
    value: "Account"
  },
  {
    name: "password",
    value: "Password"
  },
  {
    name: "privacy",
    value: "Privacy and safety"
  },
  {
    name: "subscriptions",
    value: "Subscriptions and Payments"
  },  
  {
    name: "delete",
    value: "Deactivate or Delete"
  }
];







const Navigation = (props) => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Profile Settings
      </CardTitle>
    </CardHeader>
    <ListGroup flush>


    {pages.map((x,y) =>
      <Link to={"/settings/" + x.name} style={border} key={y} >
      {props.activeName === x.name ?
        <ListGroupItem  action active>
          {x.value}
        </ListGroupItem>
        :
        <ListGroupItem action >
          {x.value}
        </ListGroupItem>
      }
      </Link>
      )}

    </ListGroup>
  </Card>
);


export default Navigation;
