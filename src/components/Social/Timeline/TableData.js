import React from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

const Table_Data = (props) => (
  <Table className="mb-0" size="sm" style={{padding:"0px 0px 0px 0px", margin:"0px 0px 0px 0px"}}>
    <thead>
      <tr>
        <th>Exercise</th>
        <th className="text-right">Volume</th>
      </tr>
    </thead>
    <tbody>
      {props.workout.full_quick.map((s,t) =>
      <tr key={t}>
        <td >
          <FontAwesomeIcon icon={faSquare} className="text-primary" />{" "}
          {s.exercise_xref.exercise}
        </td>
        <td className="text-right" >{s.exercise_xref.graph_data.map((a,b) => <div key={b}>{a.date_time_iso === props.derived__start_time_local ? a.volume : null} </div>)}</td>
      </tr>
      )}
    </tbody>
  </Table>
);

export default Table_Data;
