import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { enableModernTheme } from "../../redux/actions/themeActions";
import SignUp from "./SignUp"
import Footer from "./Footer"
import Header from "./Header"
import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import instagram from './instagram.json'
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';

import {
  Button,
  Card,
  Col,
  Container,
  Row,
  CardImg,
  CardBody,
  Media,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Form,
} from "reactstrap";


import {
  Box,
  Chrome,
  Code,
  DownloadCloud,
  Mail,
  Sliders,
  Smartphone
} from "react-feather"





import unsplash2 from "../../assets/img/vector/personal-trainers-01.svg";
import unsplash4 from "../../assets/img/photo/2.jpg";
import unsplash5 from "../../assets/img/photo/3.jpg";
import unsplash6 from "../../assets/img/photo/4.jpg";

import screenshotThemeCorporate from "../../assets/img/vector/personal-trainers-01.svg";


import iOS from "./button-app.png"
import play from "./button-play.png"
import photo22 from "./photo-22.jpg"
import photo23 from "./photo-23.jpg"
import photo24 from "./photo-24.jpg"
import photo25 from "./photo-25.jpg"
import mobilechat from "./mobile-chat.png"
import pattern1 from "./pattern-1.svg"
import one from "./one.jpg"
import two from "./2.jpg"
import three from "./3.jpg"
AOS.init();


const mystyle = {
  background:"none",
 "justifyContent":"center"
};

const vertical_center = {
  'display': 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  'height': '200px',
  'border': '3px solid green',
};

const seperatorBlue = {
  background:"#153d77",
 "justifyContent":"center"
};

const seperatorBlueMain = {
  'padding': '0 10px',
  'background': '#fff',
  'position': 'relative',
  'top': '-11px',
  'z-index': '1',
};

const bg_dark = {
  'background': '#113261',
};









const Intro = () => {

  const handleClick = (e) => {
    document.getElementById('demos').scrollIntoView();
    e.preventDefault();
  }

  return (
  <section class="vh-100 landing-intro pt-5" style={{'background': '#113261','display': 'flex', 'justify-content': 'center', 'align-items': 'center','height': '200px'}} >
    <Container>
    <div  ckassName= "pt-5" style={{width:'100%',height:'10%', position: 'relative', overflow:'none'}}>
      <Row >
        <Col md="7" className="mx-auto text-center mt-5">
          <div className="landing-intro-title mb-3 text-center text-white">
            <h1 class="display-3 text-center text-white">
              The #1 app for <span class="">weight lifters</span>
            </h1>
          </div>
          <p className="text-white mb-3"> Build Muscle. Feel Good. Grow. Becasue reistance training is awesome. </p>
        </Col>
      </Row>
      <Row>
        <Col md="8" className="mx-auto text-center"
        >
          <div className="mt-4 " >
            <CardImg
              src={three}
              className="img-fluid rounded-lg"
              style={{width:'100%',height:'100%'}}
              alt="Corporate Bootstrap 4 Dashboard Theme" />
          </div>
        </Col>
      </Row>
      </div>
    </Container>
  </section>
)};

const Intro2 = () => {

  const handleClick = (e) => {
    document.getElementById('demos').scrollIntoView();
    e.preventDefault();
  }

  return (
  <section className="landing-intro pt-5">
    <Container>
      <Row>
        <Col md="7" className="mx-auto text-center">
          <h1 className="landing-intro-title my-4">The #1 app for weight lifters</h1>

          <p className="landing-intro-subtitle">Build. Grow. Inspire. Change. Feel Good. Becasue Lifting Is Awesome.</p>




        </Col>
      </Row>
      <Row>
        <Col md="8" className="mx-auto text-center">
          <div className="mt-4 landing-intro-img">
						<img src={one} className="img-fluid rounded-lg" alt="Corporate Bootstrap 4 Dashboard Theme" />
					</div>
        </Col>
      </Row>
    </Container>


  </section>
)};

const IntroOrig = () => {

  const handleClick = (e) => {
    document.getElementById('demos').scrollIntoView();
    e.preventDefault();
  }

  return (
  <section className="landing-intro pt-5">
    <Container>
      <Row>
        <Col md="7" className="mx-auto text-center">
          <h1 className="landing-intro-title my-4">Fully-featured React Admin & Dashboard Template</h1>

          <p className="landing-intro-subtitle">A professional package that comes with plenty of UI components, forms, tables, charts, dashboards, pages and svg icons. Each one is fully customizable, responsive
            and easy to use.</p>

          <div className="my-4">
            <a
              href="#demos"
              onClick={handleClick}
              className="btn btn-light btn-lg mr-1"
            >
              View Demos
            </a>{" "}
            <a
              href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-lg"
            >
              Purchase Now
            </a>
          </div>


        </Col>
      </Row>
      <Row>
        <Col md="8" className="mx-auto text-center">
          <div className="mt-4 landing-intro-img">
						<img src={screenshotThemeCorporate} className="img-fluid rounded-lg" alt="Corporate Bootstrap 4 Dashboard Theme" />
					</div>
        </Col>
      </Row>
    </Container>

    <svg className="landing-intro-shape" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220"><path fill="#F7F9FC" fill-opacity="1" d="M0,160L1440,32L1440,320L0,320Z"></path></svg>
  </section>
)};

const IntroLarge = () => (

  <section class="p-0 m-0"
  style={{'background': '#113261','display': 'flex', 'justify-content': 'center', 'align-items': 'center','height': '200px'}}
    style={{
      'background': '#113261',
      "background-image": `url(${two})`,
      'backgroundPosition': 'center center',
      'backgroundSize': 'cover',
      width:"100%",
      height:"100vh",
      'z-index': -1,
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'overflow-x': 'hidden',}}
      >
  </section>
);

const Features = () => (
  <section className="py-6">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <h2>Read Blog</h2>
            <p className="text-muted text-lg">
              A responsive dashboard built for everyone who wants to create
              webapps on top of Bootstrap.
            </p>
          </div>

          <Row className="text-left">
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Sliders />
                </div>
                <Media body>
                  <h4 className="mt-0">Customizable</h4>
                  <p className="font-size-lg">
                    You don't need to be an expert to customize our themes. Our
                    code is very readable and well documented.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Smartphone />
                </div>
                <Media body>
                  <h4 className="mt-0">Fully Responsive</h4>
                  <p className="font-size-lg">
                    With mobile, tablet & desktop support it doesn't matter what
                    device you're using. AdminKit is responsive in all browsers.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Mail />
                </div>
                <Media body>
                  <h4 className="mt-0">Dev-to-dev Support</h4>
                  <p className="font-size-lg">
                    Our themes are supported by specialists who provide quick
                    and effective support. Usually an email reply takes &lt;24h.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Chrome />
                </div>
                <Media body>
                  <h4 className="mt-0">Cross Browser</h4>
                  <p className="font-size-lg">
                    Our themes are working perfectly with: Chrome, Firefox,
                    Safari, Opera and IE 10+. We're working hard to support
                    them.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <Code />
                </div>
                <Media body>
                  <h4 className="mt-0">Clean Code</h4>
                  <p className="font-size-lg">
                    We strictly follow Bootstrap's guidelines to make your
                    integration as easy as possible. All code is handwritten.
                  </p>
                </Media>
              </Media>
            </Col>
            <Col md="6">
              <Media className="py-3">
                <div className="landing-feature">
                  <i data-feather="download-cloud"></i>
                  <DownloadCloud />
                </div>
                <Media body>
                  <h4 className="mt-0">Regular Updates</h4>
                  <p className="font-size-lg">
                    From time to time you'll receive an update containing new
                    components, improvements and bugfixes.
                  </p>
                </Media>
              </Media>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);



const Styles = () => (
  <section className="py-6 bg-white">
    <Container>
      <div className="mb-6 text-center">
        <h1>The #1 app for weight lifting</h1>
      </div>

      <Row className="pr-3 pl-3">
        <Col lg="8" className="text-center">
        <Card style={{"justifyContent": "center", "textAlign": "center"}}>
          <CardImg top width="100%" src={unsplash2} alt="Card image cap" />
        </Card>
        </Col>

        <Col lg="4" className="">
          <SignUp/>
        </Col>
      </Row>
    </Container>
  </section>
);

const Spread = () => (

  <section class="position-relative py-6 mb-30px" style={{ "backgroundImage": `url(${unsplash4})`, 'backgroundRepeat': 'no-repeat', 'backgroundPosition': 'center center', 'backgroundSize': 'cover', width:"100%", height:"50vh", "marginRight": "-0.75rem"}  }>
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="bg-white p-5"><strong class="text-uppercase text-muted d-inline-block mb-2 text-sm">Magazine</strong>
              <h2 class="mb-3">We make your inbox a little better</h2>
              <p class="text-muted">Get the latest tips on workouts right to your inbox</p><a href="post.html" class="btn btn-link text-dark p-0">Continue reading <i class="fa fa-long-arrow-alt-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
);

const Section = () => (

  <section class="py-6">
    <div class="container">
    <Row>
      <Col md="10" className="mx-auto text-center">
        <div className="mb-5">
          <h1>Join colleagues, friends and more on iironRoom</h1>
          <p className="text-muted text-lg">
          Because we make lifting awesome again.
          </p>
        </div>
      </Col>
    </Row>

      <div class="row">
        <div class="col-md-4 mb-4 mb-md-6 pt-lg-3"><a href="detail-2.html"><img src={unsplash5} alt="" class="img-fluid"/></a>
          <div class="px-4 position-relative z-index-2 mt--3"><a href="detail-2.html" class="text-dark td-none">
              <h3>Black<br/>canvas<br/>bag     </h3>
              <p class="text-muted">$39.90</p></a>
            <p> <a href="detail-2.html" class="btn btn-link text-dark td-none px-0"> Shop now                       </a></p>
          </div>
        </div>
        <div class="col-md-7 ml-auto mb-4 mb-md-5">
          <div class="position-absolute z-index-5 py-6"><a href="detail.html" class="text-dark td-none">
              <h2>Sweaters<br/>for<br/>her     </h2>
              <p class="text-muted">$39.90</p></a>
            <p> <a href="detail.html" class="btn btn-link text-dark td-none px-0"> Shop now      </a></p>
          </div>
          <div class="ml-6"><a href="detail.html"><img src={unsplash6} alt="" class="img-fluid"/></a></div>
        </div>
      </div>


      </div>
      </section>
);

const About1 = () => (

  <section class="pt-8 pt-md-11">
    <div class="container">
      <div class="row align-items-center justify-content-between">
        <div class="col-12 col-md-6 mb-5 mb-md-0">


          <div class="row">
            <div class="col-6 mr-n5">

              <img src={photo23} alt="..." className="img-fluid mb-4 rounded" data-aos="fade-right" data-aos-delay="100"/>

              <img src={photo25} alt="..." className="img-fluid rounded" data-aos="fade-right" data-aos-delay="150"/>

            </div>
            <div class="col-6 mt-8">

              <img src={photo22} alt="..." className="img-fluid mb-4 rounded" data-aos="fade-right"/>

              <img src={photo24} alt="..." className="img-fluid rounded"  data-aos="fade-right" data-aos-delay="50"/>

            </div>
          </div>

        </div>
        <div class="col-12 col-md-6 col-lg-5" data-aos="fade-left">


          <h2 class="font-weight-bold">
            Show your friends and family your progress.
          </h2>


          <p class="font-size-lg text-muted mb-4">
            Staying connected while lifting can be tough, but iirontfit makes it easy to share your progress.
          </p>


          <Button color="primary" size="lg">
            Learn more
          </Button>

        </div>
      </div>
    </div>
  </section>
);

const About2 = () => (

  <section class="py-8 py-md-11">
    <div class="container">
      <div class="row align-items-center justify-content-between">
        <div class="col-12 col-md-6 col-lg-7 order-md-2">


          <img src={mobilechat} alt="..." class="img-fluid mb-6 mb-md-8 mb-md-0" data-aos="fade-left"/>

        </div>
        <div class="col-12 col-md-6 col-lg-5 order-md-1" data-aos="fade-right">


          <h2 class="font-weight-bold">
            Use your phone number so you're easy to find.
          </h2>


          <p class="font-size-lg text-muted mb-0">
            Landkit uses your phone number for your account instead of an email or username so you're super easy to find for all your friends.
          </p>

        </div>
      </div>
    </div>
  </section>
);

const About0 = () => (

  <section class="pt-6 pt-md-8">
    <div class="container">
      <div class="row align-items-center justify-content-center justify-content-md-between">
        <div class="col-10 col-sm-8 col-md-6 order-md-2">


          <div class="device-combo device-combo-iphonex-iphonex mb-6 mb-md-0">


          <Card style={{"justifyContent": "center", "textAlign": "center"}}>
            <CardImg top width="100%" src={unsplash2} alt="Card image cap" />
          </Card>

          </div>

        </div>
        <div class="col-12 col-md-6 col-lg-5" data-aos="fade-right">


          <h1 class="font-weight-bold">
            Chat with <span class="text-primary">friends.</span> <br/>
            Anywhere in the world.
          </h1>

          <p class="font-size-lg text-muted mb-6">
            Keep in touch with your friends and family with free international chats, calls, and even games. Landkit connects you with the world.
          </p>


          <form class="mb-6 mb-md-8 mb-md-0 order-md-1">
            <div class="form-row">
              <div class="col">


                <input type="url" class="form-control bg-light border-0" />

              </div>
              <div class="col-auto">


                <button type="submit" class="btn btn-primary">
                  Text link
                </button>

              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  </section>
);

const CallLArge = () => (

  <section class="py-10 py-md-14 vh-100 " style={{'background':'#113261', "background-image": `url(${pattern1})`,'display': 'flex', 'justify-content': 'center', 'align-items': 'center','height': '200px'}} >
    <Container>
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 text-center">


          <h2 className="h1 text-white">
          Wanna Lift With Us
          </h2>

          <p class="font-size-lg text-white mb-6 mb-md-8 ">
                Inspire your colleagues, classmates, and friends
          </p>


          <Button size="lg" color="light" className="btn-pill" outline tag={Link} to="/auth/sign-up">
            Join and lift now
          </Button>

        </div>
      </div>
    </Container>
  </section>
);

const SectionLandKit = () => (

  <section className="py-6 bg-white">
    <Container>
    <div className="mb-6 pt-3 text-center">
      <h1 class="display-3 text-center">
        The #1 app for <span class="">Weight lifters</span>
      </h1>
    </div>

      <div class="row align-items-center mt-2">

      <div class="col-12 col-md-5 col-lg-4 order-md-2 p-0 mb-5" data-aos="fade-up" >

        <div class="text-center text-md-left p-0 m-0" >
        <CardBody style={{width:'90%'}} className="ml-auto mr-auto p-0 m-0">




                <h2 class="text-center text-md-left">
                  Weight Lifiting. Resistance Training. Strength Training.
                  Get <span class="text-primary">Lifting</span>
                </h2>


                <p class="lead text-center text-md-left text-muted mb-4 mb-lg-8">
                  Start creating the best possible body changing experience for yourself
                </p>


        <FormGroup className="form-group customSocial_btn_btn">
          <Button color="facebook" size="lg" type="submit" className="mr-1 btn-block">
            <FontAwesomeIcon icon={faFacebook} className="align-middle float-left" />{" "}
            Sign up in using <b>Facebook</b>
          </Button>
        </FormGroup>


        <FormGroup className="form-group customSocial_btn_btn">
          <Button color="google" size="lg" type="submit" className="mr-1 btn-block">
          <FontAwesomeIcon icon={faGoogle} className="align-middle float-left" />{" "}
            Sign up using <b>Google</b>
          </Button>
        </FormGroup>

        <div className="customSeperator"><i style={mystyle}>or</i></div>

                    <Button
                      color="primary"
                      htmltype="submit"
                      size="lg"
                      className="btn-block"
                      style={{"justifyContent":"space between"}}
                      tag={Link}
                      to="/auth/sign-up"
                      rel="noreferrer noopener"
                    >
                    <FontAwesomeIcon icon={faEnvelope} className="align-middle float-left" />{" "}
                    Sign up using email
                    </Button>



        </CardBody>
        </div>

      </div>

      <div class="col-12 col-md-7 col-lg-8 order-md-1">


        <CardImg top width="100%" src={unsplash2} alt="Card image cap" />

      </div>

      </div>
    </Container>
  </section>
);


const SectionGetAppLandKit = () => (

  <section class="pt-6 pt-md-8">
    <div class="container pb-6 pb-md-8 border-bottom">
      <div class="row align-items-center">
        <div class="col-12 col-md">


          <h3 class="font-weight-bold mb-1">
            Get the app now!
          </h3>


          <p class="text-muted mb-6 mb-md-0">
            Travel and share with ease.
          </p>

        </div>

        <div class="col-auto">

          <a href="#!" class="d-inline-block mr-1">
            <CardImg src={iOS} class="img-fluid" alt="..." style={{'max-width': '155px'}}/>
          </a>

          <a href="#!" class="d-inline-block">
            <CardImg src={play} class="img-fluid" alt="..." style={{'max-width': '155px'}}/>
          </a>

        </div>
      </div>
    </div>
  </section>
);




const Blog = () => (
    <section className="bg-white pb-6 pt-6">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <h1>iironox Blog</h1>
            <p className="text-muted text-lg">
            Because we make lifting awesome again.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
      <Container>
        <Row>


        <div class="col-lg-4 col-6">
          <div class="mb-30px"><a href="post.html"><img src={unsplash6} alt="..." class="img-fluid"/></a>
            <div class="mt-3"><small class="text-uppercase text-muted">Fashion and style </small>
              <h5 class="my-2"><a href="post.html" class="text-dark">Pellentesque habitant morbi          </a></h5>
              <p class="text-gray-500 text-sm my-3"><i class="far fa-clock mr-2"></i>January 16, 2016</p>
              <p class="my-2 text-muted">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Aenean ultricies mi vitae est. </p><a href="post.html" class="btn btn-link text-gray-700 pl-0">Read more<i class="fa fa-long-arrow-alt-right ml-2"></i></a>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-6">
          <div class="mb-30px"><a href="post.html"><img src={unsplash4} alt="..." class="img-fluid"/></a>
            <div class="mt-3"><small class="text-uppercase text-muted">Fashion and style </small>
              <h5 class="my-2"><a href="post.html" class="text-dark">Pellentesque habitant morbi          </a></h5>
              <p class="text-gray-500 text-sm my-3"><i class="far fa-clock mr-2"></i>January 16, 2016</p>
              <p class="my-2 text-muted">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Aenean ultricies mi vitae est. </p><a href="post.html" class="btn btn-link text-gray-700 pl-0">Read more<i class="fa fa-long-arrow-alt-right ml-2"></i></a>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-6">
          <div class="mb-30px"><a href="post.html"><img src={unsplash5} alt="..." class="img-fluid"/></a>
            <div class="mt-3"><small class="text-uppercase text-muted">Fashion and style </small>
              <h5 class="my-2"><a href="post.html" class="text-dark">Pellentesque habitant morbi          </a></h5>
              <p class="text-gray-500 text-sm my-3"><i class="far fa-clock mr-2"></i>January 16, 2016</p>
              <p class="my-2 text-muted">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Aenean ultricies mi vitae est. </p><a href="post.html" class="btn btn-link text-gray-700 pl-0">Read more<i class="fa fa-long-arrow-alt-right ml-2"></i></a>
            </div>
          </div>
        </div>

            </Row>
          </Container>
        </section>

);

const InstaGram = () => (
  <section className="p-0 m-0">
    <Container>
      <Row>
        <Col md="10" className="mx-auto text-center">
          <div className="mb-5">
            <h2 className="h1">Instagram</h2>
            <p className=" text-lg">
            Because we make lifting awesome again.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
    {instagram.popular &&
    <section className="pt-2">
      <Container fluid>
          <Row>
              {instagram.popular.places.map((place, index) =>

                          <img
                              src={require(`../../assets/img/photo/${place.img}`)}
                              alt={place.title}
                              className="bg-image hover-dark"
                              style={{'width':'20%', cursor: 'pointer'}}
                          />



              )}
          </Row>
      </Container>
    </section>
    }
  </section>
);

const InstaGram2 = () => (

    <section >


              {instagram.popular.places.map((place, index) =>

                          <img
                              src={require(`../../assets/img/photo/${place.img}`)}
                              alt={place.title}
                              className="bg-image hover-dark"
                              style={{'width':'20%',cursor: 'pointer'}}
                          />



              )}


      </section>


);

const Navigation = () => (
  <div className="py-3 bg-white landing-nav">
    <Container className="text-center">
      <Button
        tag={Link}
        to="/dashboard"
        color="primary"
        size="lg"
        target="_blank"
        className="btn-pill"
      >
        Preview
      </Button>
      <Button
        tag={Link}
        to="/docs/getting-started"
        color="link"
        size="lg"
        target="_blank"
        className="btn-pill text-dark"
      >
        Documentation
      </Button>
      <Button
        tag={Link}
        to="/docs/changelog"
        color="link"
        size="lg"
        target="_blank"
        className="btn-pill text-dark"
      >
        Changelog
      </Button>
      <Button
        href="mailto:support@bootlab.io"
        color="link"
        size="lg"
        target="_blank"
        className="btn-pill text-dark"
      >
        Support
      </Button>
    </Container>
  </div>
);

const CallSmall = () => (
  <section className="py-5 bg-dark">
    <Container className="text-center">
      <Row>
        <Col md="9" lg="8" xl="6" className="mx-auto">
          <h2 className="h1 mb-3 text-white">
            Inspire your colleagues, classmates, and friends
          </h2>
          <Button
            color="primary"
            size="lg"
            tag={Link}
            to="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lift Now
          </Button>
        </Col>
      </Row>
    </Container>
  </section>
);


const Landing = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableModernTheme());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <Intro2 />
      <Footer />
    </React.Fragment>
  )
}

export default connect()(Landing);
