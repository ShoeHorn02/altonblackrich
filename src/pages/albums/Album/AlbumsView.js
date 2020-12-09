import React from "react";
import { Link } from "react-router-dom";
import { API_BASE_MEDIA_URL } from '../../../redux/actions/API'
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardHeader,
  InputGroupAddon,
  Form,
  Button
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";







const Albums = (props) => (

  <Card>
    <CardHeader>
      <CardTitle tag="h5">{props.album_details.album_name_normal}</CardTitle>
      <h6 className="card-subtitle text-muted">
      ipsum laorim ths ksie jskdp pje ipsum 
      </h6>
    </CardHeader>
    <CardBody className="pt-0">
    <Link to={props.source === "profile" ? props.url : "/albums/" + props.album_details.id} >
      <CardImg
      style = {{'max-width': '100%', 'max-height': '100%', 'height': '100%', 'width': '100%', 'object-fit': 'cover'}}
        top
        src={API_BASE_MEDIA_URL + props.album_details.cover_image}
        alt="image" />
        </Link>

        <InputGroupAddon addonType="prepend" color="danger" className="mt-1 mb-0">

            <Form>

            <Button color="danger">
              <FontAwesomeIcon icon={faThumbsUp} fixedWidth /> Like
            </Button>

          </Form>
        </InputGroupAddon>

    </CardBody>
  </Card>



);


export default Albums;
