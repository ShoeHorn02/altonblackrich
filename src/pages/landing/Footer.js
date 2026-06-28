import React from "react";
import { Container, Row, Col, Badge, Form, Input, Button, CardImg  } from "reactstrap";
import { Link } from "react-router-dom";
import footerContent from '../../assets/custom/footer/footer.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import iOS from "./button-app.png"
import play from "./button-play.png"

const font_size = {
  'font-size': '17px',
};

const Footer = () => (
  <footer className="position-relative z-index-10 d-print-none" >
      <div className="py-6 bg-gray-200 text-muted bg-light">
          <Container>
              <Row>
                  {footerContent && footerContent.map(item =>
                      <Col key={item.title} lg={item.lg && item.lg} md={item.md && item.md} className="mb-5 mb-lg-0">
                          <div className="font-weight-bold text-uppercase text-dark mb-3">
                              {item.title}
                          </div>
                          {item.content &&
                              <p className={item.contentBottomMargin ? `mb-${item.contentBottomMargin}` : ''} style={font_size}>{item.content}</p>
                          }
                          {item.social &&
                              <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="www.google.com" target="_blank" rel="noopener noreferrer" title="Twitter" className="text-muted text-hover-primary">
                                        <FontAwesomeIcon icon={faTwitter} className="align-middle float-left" />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="www.google.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-muted text-hover-primary">
                                        <FontAwesomeIcon icon={faFacebook} className="align-middle float-left" />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="www.google.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-muted text-hover-primary">
                                        <FontAwesomeIcon icon={faInstagram} className="align-middle float-left" />
                                    </a>
                                </li>
                              </ul>
                          }



                          {item.links &&
                              <ul className="list-unstyled">
                                  {item.links.map(link =>
                                      <li key={link.title}>
                                          <Link to={link.link}>
                                              <span className="text-muted" style={font_size}>
                                                  {link.title}
                                                  {link.new &&
                                                      <Badge color="info-light" className="ml-1">New </Badge>
                                                  }
                                              </span>
                                          </Link>
                                      </li>
                                  )}
                              </ul>
                          }
                          {item.form &&
                              <Form
                                  id="newsletter-form"
                              >
                                  <div className="input-group mb-3">
                                      <Input type="email" placeholder={item.form.placeholder} aria-label={item.form.placeholder} className="bg-transparent border-dark border-right-0" />
                                      <div className="input-group-append">
                                          <Button className="btn-outline-dark border-left-0" color="deoco">
                                              <i className="fa fa-paper-plane text-lg" />
                                          </Button>
                                      </div>
                                  </div>

                                  <a href="#!" class="d-inline-block mr-1">
                                    <CardImg src={iOS} class="img-fluid" alt="..." style={{'max-width': '155px'}}/>
                                  </a>

                                  <a href="#!" class="d-inline-block">
                                    <CardImg src={play} class="img-fluid" alt="..." style={{'max-width': '155px'}}/>
                                  </a>



                              </Form>

                          }
                      </Col>
                  )}

              </Row>
          </Container>
      </div>
      <div className="py-4 font-weight-light bg-gray-800 text-gray-300">
          <Container>
              <Row className="align-items-center">
                  <Col md="12" className="align-items-center text-md-center text-muted">
                      <p className=" mb-md-0">
                          © 2020, Ironroom inc.
                      </p>
                  </Col>
                  <Col md="6">

                  </Col>
              </Row>
          </Container>
      </div>
  </footer >
);

export default Footer;
