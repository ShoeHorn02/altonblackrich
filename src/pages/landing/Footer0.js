import React from "react";
import { Container, Row, Col,  } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer bg-white">
    <Container>
      <Row className="text-muted">
        <Col xs={3} className="text-left">
          <ul className="list-inline">
            <li className="">
              <Link to="dashboard" className="text-muted mr-1">
                Support
              </Link>
            </li>
            <li className="">
              <Link to="dashboard" className="text-muted mr-1">
                Privacy
              </Link>
            </li>
            <li className="">
              <Link to="dashboard" className="text-muted mr-1">
                Terms of Service
              </Link>
            </li>
            <li className="">
              <Link to="dashboard" className="text-muted">
                Contact
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={3} className="text-left">
          <ul className="list-inline">
            <li className="">
              <Link to="dashboard" className="text-muted mr-1">
                Support
              </Link>
            </li>
            <li className="">
              <Link to="dashboard" className="text-muted mr-1">
                Privacy
              </Link>
            </li>
            <li className="">
              <Link to="dashboard" className="text-muted mr-1">
                Terms of Service
              </Link>
            </li>
            <li className="">
              <Link to="dashboard" className="text-muted">
                Contact
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={3} className="text-left">
          <ul className="list-inline">
            <li className="">
              <Link to="dashboard" className="text-muted mr-1">
                Support
              </Link>
            </li>
            <li className="">
              <Link to="dashboard" className="text-muted mr-1">
                Privacy
              </Link>
            </li>
            <li className="">
              <Link to="dashboard" className="text-muted mr-1">
                Terms of Service
              </Link>
            </li>
            <li className="">
              <Link to="dashboard" className="text-muted">
                Contact
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={3} className="text-left">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} -{" "}
            <Link to="dashboard" className="text-muted">
              Spark
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
