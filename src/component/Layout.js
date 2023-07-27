import { Link, NavLink,} from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import { Container, } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Protect from '../login/Protect'
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useContext} from 'react';
import { CustomContext } from '../context/Context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function Layout (props){
    const {ip,screenSize,brand} = useContext(CustomContext)
    function close(){
          document.getElementsByClassName("btn-close")[0].click()
    }
    let url = window.location.pathname

    



    return(
    <>
    
   
     <Navbar  expand='md' className="bg-body-tertiary " style={{padding:'0 10px 0 10px'}}>
      {/* {url} */}
          <Container fluid className="p-0">
          <Link to={'/home'} style={{display:screenSize.width>500?'none':'',color:'black',fontSize:'30px',opacity:url==='/home'?'0':''}}><FontAwesomeIcon icon={faArrowLeft}/></Link>
            <Navbar.Brand href="#"><img alt="LOGO" src={`${ip}/dist/img/num.png`} style={{width:'70px'}} /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} style={{display:screenSize.width>500?'':'none'}}/>
            
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header  closeButton id="close">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  NUM Attendance
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="pe-3 text-uppercase">
                  <NavLink onClick={close} className="nav-link" to='/home' >home</NavLink>
                  <NavLink onClick={close} className="nav-link" to='/att'>Attendance</NavLink>
                  <NavLink onClick={close} className="nav-link" to='/checkin' >checkin</NavLink>
                  <NavLink onClick={close} className="nav-link" style={{display:screenSize.width<=500?'':'none'}} to='/qrscan'>scan</NavLink>
                  <NavDropdown
                    title={localStorage.getItem('name')} 
                    id={`offcanvasNavbarDropdown-expand-md`}
                  >
                    <NavLink onClick={close} className="dropdown-item" to='/profile' >Manage Profile</NavLink>
                  </NavDropdown>
                </Nav>
                <Nav className="justify-content-end flex-grow-1">
                <Button variant="danger" onClick={props.log}>Log out</Button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar> 
    <Protect/>
    {/* // <nav>
    //     <li>
    //         <Link to={'/'}>slash</Link>
    //         <Link to={'/home'}>Home</Link>
    //     </li>
        
    // </nav> */}
    </>
    )
}
export default Layout