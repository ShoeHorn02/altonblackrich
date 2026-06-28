import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { Card, CardBody, CardHeader, CardTitle, Badge, Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";

const NextWorkoutTable = ({ theme, ...props }) => {


  return (
    <section className="flex-fill w-100">
      <Card>
        <CardHeader className="mb-0">
          <CardTitle tag={Link} tag={Link} to="/lift_tracking" className="mb-0 float-left" ><string>Next Workout: </string></CardTitle>
          <Button size="sm" color="secondary" className="btn-pill float-right" tag={Link} to={'/lift_tracking'} outline> Record Lifts Now </Button>
          <br />
          <Badge color="info" className="float-left mt-1 mb-0" tag={Link} to="/lift_tracking">
            {props.next_workout_title}
          </Badge>
        </CardHeader>
        <CardBody>
          <BootstrapTable
            keyField="full_quick"
            data={props.next_workout_data}
            columns={
            [
              {
                dataField: "exercise_xref.exercise",
                isKey: true,
                sort: false,
                hidden: false,
                text:"Exercise",
                headerStyle: { "border-color": 'green', 'margin-top':"-2px","border":'none', }
              },
              {
                dataField: "derived__set_count",
                isKey: true,
                sort: false,
                hidden: false,
                text:"Sets",
                headerStyle: { "border-color": 'green', 'margin-top':"-2px","border":'none'},
              },
              {
                dataField: "derived__rep_count",
                isKey: true,
                sort: false,
                hidden: false,
                text:"Reps",
                headerStyle: { "border-color": 'green', 'margin-top':"-2px","border":'none'},
              },
            ]
          }
            hover={true}
            rowEvents={ {
              style: { cursor: 'pointer'},
              onClick: (e, row) => { this.setState({referrer: `/exercises/detail/${row.exercise_xref.id}`}) }
            }}
            bootstrap4
            bordered={false}
            headerStyle= {{ backgroundColor: 'green' }}
            hiddenHeader = {false}
          />
        </CardBody>
      </Card>
    </section>

  );
};

export default connect(store => ({
  theme: store.theme.currentTheme
}))(NextWorkoutTable);
