import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { enableModernTheme } from "../../redux/actions/themeActions";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Col,
  Container,
  Row,
} from "reactstrap";
import lifterGirl from "./LifterGirl.jpg"
AOS.init();

class Body extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      path: null
    };
  }

  renderFooter = () => {
    const mystyle = {
      color: "gray",
      cursor: "pointer"
    };
    return(
      <Nav className="d-flex p-2 justify-content-center text-wrap" style={{backgroundColor:'#0e0e13'}}>


      <NavItem onClick={()=> this.setState({path:null}) }>

        <NavLink
        style={mystyle}
        >Home</NavLink>
      </NavItem>



      <NavItem onClick={()=> this.setState({path:"about"}) }>

        <NavLink
        style={mystyle}
        >About</NavLink>
      </NavItem>



        <NavItem onClick={()=> this.setState({path:"contact"}) }>

          <NavLink
          style={mystyle}
          >Contact</NavLink>
        </NavItem>


        <NavItem>
          <NavLink href="#" style={mystyle}>2021 AltonBlackRich Inc.</NavLink>
        </NavItem>
      </Nav>
    )
  }

  renderRight = () => {
    return(
      <Col md="5" className="d-flex flex-column justify-content-center align-items-center" style={{backgroundColor:'#0e0e13'}}>




        <div className="m-0 p-3 " style={{width:'75%'}}>


        {this.state.path==="home" || this.state.path===null?

          <div className="text-center">
            <h1 className=" text-light mb-5" style={{fontSize:'31px'}}>Software. Evolved.</h1>
            <h4 className=" text-light mt-3">
            AltonBlackRich is a software firm with a unique focus on finance, sports, and collaborative problem solving.
            </h4>
          </div>

          :




        this.state.path==="about"?

        <div className="text-center">
          <h1 className=" text-light mb-5" style={{fontSize:'31px'}}>Our Philosophy Is Simple</h1>
          <h4 className=" text-light mt-3">
          Be collaborative. Be curious. Be yourself, And Keep Growing.
          </h4>
        </div>

        :

          this.state.path==="contact"?

          <div className="text-center">
            <h4 className=" text-light mt-3">
            175 Lynden Road, Brantford ON N3R 8A7, Canada
            </h4>
          </div>

          :

          null
        }


          </div>


      </Col>
    )
  }

  renderLeft = () => {
    return(
      <Col md="7" className="" style={{backgroundColor:'#d3e2f0', "backgroundImage": `url(${lifterGirl})`, objectFit: 'cover', backgroundSize: 'cover', backgroundRepeat:'no-repeat' }} >


        <Navbar   expand="sm" className="absolute-top w-100 m-0 p-3" style={{border:'none'}}>
          <Container >
            <NavbarBrand className="font-weight-bold text-white" href="/" style={{'fontSize':'28px'}}>
               AltonBlackRich Inc.
            </NavbarBrand>
          </Container>
        </Navbar>


        <section className="vh-100" style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center','height': '200px', }}>



        </section>

      </Col>
    )
  }

  render () {
    return(

    <div className="vh-100 bg-dark d-flex flex-column justify-content-end ">

    <div className="m-0 p-0" style={{height: '100%', width: '100%', 'overflowX':'hidden', 'overflowY':'hidden'}}>
    <Row className="min-vh-100 d-flex ">
        {this.renderLeft()}
    {this.renderRight()}

    </Row>
    </div>



    {this.renderFooter()}

    </div>

    )
  }
}

const Landing = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableModernTheme());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Body />
    </React.Fragment>
  )
}

export default connect()(Landing);
