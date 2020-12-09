import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Container,
} from "reactstrap";
import IosPulse from "react-ionicons/lib/IosPulse";





const Header = () => (
  <Navbar  light expand="sm" className="absolute-top w-100 m-0 p-0 landing-intro" >
    <Container>
      <NavbarBrand className="font-weight-bold text-white" href="/" style={{'fontSize':'28px'}}>
        <IosPulse /> ironroom.
      </NavbarBrand>
      <Nav className="ml-auto" navbar>

        <NavItem>
          <NavLink href="../www.utopily.com" target="_blank" active className="text-light">
            Read Blog
          </NavLink>
        </NavItem>

      </Nav>

      <div className="">


        <Button
          color="light"
          size="lg"
          tag={Link}
          to="/auth/sign-up"
          rel="noreferrer noopener"
          className="my-2 ml-2 btn d-none d-md-inline-block"
          outline
        >
          Join and lift now
        </Button>
        <Button
          color="light"
          size="lg"
          tag={Link}
          to="/auth/sign-in"
          rel="noreferrer noopener"
          className="my-2 ml-2 btn"

        >
          Sign In
        </Button>
      </div>
    </Container>
  </Navbar>
);

export default Header;
