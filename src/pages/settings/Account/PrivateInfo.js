import React from "react";


import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledDropdown
} from "reactstrap";




import { MoreVertical, RefreshCw } from "react-feather";
import { connect } from 'react-redux';


class Default extends React.Component {



  render() {
    return       (

      <Card>
        <CardHeader>
          <div className="card-actions float-right">
            <span className="cursor-pointer mr-1">
              <RefreshCw />
            </span>{" "}
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle tag="a">
                <MoreVertical />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <CardTitle tag="h5" className="mb-0">
            Private info
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                placeholder="1234 Main St"
              />
            </FormGroup>
            <FormGroup>
              <Label for="address2">Address 2</Label>
              <Input
                type="text"
                name="address2"
                id="address2"
                placeholder="Apartment, studio, or floor"
              />
            </FormGroup>


            <Button color="primary">Save changes</Button>
          </Form>
        </CardBody>
      </Card>

  );
 }
}

const mapStateToProps = (state) => ({
  user_status: state.auth.user,
  theme: state.theme.currentTheme
});

export default connect(mapStateToProps, {  })(Default);
