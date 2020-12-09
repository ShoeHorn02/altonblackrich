import React from "react";
import {
  Spinner
} from "reactstrap";


const LoaderSpin = () => (
  <div>
    <Spinner color="light" type="grow" size="sm" className="mr-2" />
    <Spinner color="primary" type="grow" size="sm" className="mr-2"/>
  </div>
);

export default LoaderSpin;
