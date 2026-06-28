import React from "react";
import { connect } from 'react-redux';
import { Container, Row, Col } from "reactstrap";


class LandingMain extends React.Component {



  renderHeader = () => {
    return(
      <Row className="align-items-center" >

        <Col md="12">

          <h1 class="display-3 mb-2">
            Privacy and Terms
          </h1>
          <hr class="my-3 my-md-4"/>

        </Col>
        <Col className="col-auto">

        </Col>
      </Row>
    )
  }


  renderTerms = () => {
    return(
      <Row className="align-items-center">

        <Col md="12">

          <h1 class="display-4 mb-2">
            Timer Privacy & Terms Overview
          </h1>

          <p class="font-size-lg mb-md-2">

          </p>

          <p class="font-size-lg mb-md-2">
          Thank you for using Timers
          </p>


          <p class="font-size-lg mb-md-2">
          This app does not guarntee anything. Do not use this app for any accuracy. We do not
          </p>





        </Col>
        <Col className="col-auto">

        </Col>
      </Row>
    )
  }

  render() {
    return (
      <div >

      <section className="landing-intro mt-5 pt-5 bg-light vh-100 pb-5 text-dark" style={{overflow:'hidden'}}>
      <Container>
        {this.renderHeader()}
        {this.renderTerms()}



      </Container>
      </section>

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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(LandingMain);
