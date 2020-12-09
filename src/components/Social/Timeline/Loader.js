import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Spinner
} from "reactstrap";





const Clients = () => (


    <Card>
    <CardHeader>
      <CardTitle tag="h5">Hang on, we are doing some lifting...</CardTitle>
      <h6 className="card-subtitle text-muted">

      </h6>
    </CardHeader>
    <CardBody>
      <div className="mb-2">
        <Spinner color="dark" type="grow" size="sm" className="mr-2" />
          <Spinner
            color="primary"
            type="grow"
            size="sm"
            className="mr-2"
          />
      </div>
    </CardBody>
    </Card>


);

export default Clients;
