import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  CardLink,
  Col,
  Container,
  Row,
  Table,

} from "reactstrap";
import Header from "../../components/Header";
import HeaderTitle from "../../components/HeaderTitle";

const ExerciseDetailSub = (props) => (
  <Container fluid>
    {props.exercise_detail.map((p,q) =>
    <Header key={q}>
      <HeaderTitle>{p.exercise}</HeaderTitle>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/dashboard">Dashboard</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/exercises">Exercises</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Detail</BreadcrumbItem>
        <BreadcrumbItem active>{p.exercise}</BreadcrumbItem>
      </Breadcrumb>
    </Header>
    )}
    <Row>
      <Col xs="12" className="col-xxl-3">
        {props.exercise_detail.map((x,y)=>
        <Card key={y}>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0">
              {x.exercise}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Row noGutters>
              <Col sm="9" xl="12" className="col-xxl-8">
                <strong>About</strong>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                  commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </p>
              </Col>
            </Row>

            <Table size="sm" className="my-2">
              <tbody>
                <tr>
                  <th>Muscle Group</th>
                  <td>{x.muscle_group_xref}</td>
                </tr>
                <tr>
                  <th>Muscle Sub Group</th>
                  <td>{x.muscle_sub_group_xref}</td>
                </tr>
                <tr>
                  <th>Body Group</th>
                  <td>{x.body_group_xref}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{x.push_pull_xref}</td>
                </tr>
                <tr>
                  <th>Modality</th>
                  <td>{x.modality_xref.modality}</td>
                </tr>
                <tr>
                  <th>Level</th>
                  <td>{x.training_level_xref}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span className="badge badge-success">Active</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
        )}
      </Col>
      <Col xs="12" className="col-xxl-9">
        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0">
              Description
            </CardTitle>
          </CardHeader>
          <CardBody>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus gravida rhoncus. Quisque dui metus, congue ut sagittis vitae, convallis a ligula. Donec tincidunt nec ex at hendrerit. Vivamus eu leo mauris. Vestibulum vestibulum, enim eu vehicula viverra, nulla ipsum scelerisque nisi, quis luctus justo enim et lorem. Etiam lorem eros, commodo et metus ut, accumsan faucibus arcu. Duis at tellus ut tortor vestibulum lacinia. Nunc commodo ex libero, vitae ultricies ante cursus id. Cras non ornare tortor, sit amet consequat velit. Maecenas vestibulum et urna id hendrerit. Nulla porttitor consequat urna et elementum. Etiam non lobortis mi. Vivamus eu eros dui. Cras gravida nunc id orci consequat tincidunt. Nam placerat magna quis massa mollis, in ornare elit lobortis.

            </CardText>
            <CardLink href="#">Card link</CardLink>
            <CardLink href="#">Another link</CardLink>
          </CardBody>
        </Card>
      </Col>

    </Row>
  </Container>
);

export default ExerciseDetailSub;
