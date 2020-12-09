import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardImg,
  CardBody,
  CardHeader,
  Media
} from "reactstrap";


import unsplash2 from "../../../assets/img/vector/1315.jpg";


const ReadBlog = () => (
  <Card style={{"justifyContent": "center", "textAlign": "center"}}>
    <CardImg top width="100%" src={unsplash2} alt="Card image cap" />
    <CardHeader>
      <h3 className="mb-0" style={{"justifyContent": "center", "textAlign": "center"}}>
        Read Blog
      </h3>
    </CardHeader>
    <CardBody>
      <Media>
        <Media body>
          <p className="my-1">
            <strong><Link to="/">Weight Loss 101</Link></strong>
          </p>
        </Media>
      </Media>
      <hr className="my-2" />

      <Media>
        <Media body>
          <p className="my-1">
            <strong><Link to="/">Muscle Building 101</Link></strong>
          </p>
        </Media>
      </Media>
      <hr className="my-2" />

      <Media>
        <Media body>
          <p className="my-1">
            <strong><Link to="/">Choosing a workout</Link></strong>
          </p>
        </Media>
      </Media>
      <hr className="my-2" />


    </CardBody>
  </Card>
);

export default ReadBlog;
