import React from "react";
import { Link } from 'react-router-dom';

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Progress,
} from "reactstrap";

import { TrendingUp } from "react-feather";



const Status = (props) => (
  <Card>
    <CardBody>
      <Row>
        <Col className="mt-0">
          <CardTitle tag={Link} to={"/workouts/detail/" + props.data.map(x=>(x.routine_xref.id))}><strong>{props.data.map(x=>(x.routine_xref.routine))}</strong></CardTitle>
        </Col>

        <Col className="col-auto">
          <div className="avatar">
            <div className="avatar-title rounded-circle bg-primary-dark">
              <TrendingUp className="feather align-middle" />
            </div>
          </div>
        </Col>
      </Row>
      <div className="mb-0">
        {props.data[0].routine_xref.enroll_history[0].derived__updated}
      </div>

      {props.data.map(x=>(x.routine_xref.enroll_history.map(s=>
      <h1 className="display-5 mt-1">{s.derived__total_days_completed}/{s.derived__total_expected_days} Completed</h1>
      )))}

      {props.data.map(x=>(x.routine_xref.enroll_history.map(s=>
      <Progress color={s.derived__progress_bar_bootstrap_color} value={s.derived__workout_progress_int} className="">
        {s.derived__workout_progress_pct}
      </Progress>
    )))}
    </CardBody>
  </Card>
);

export default Status;
