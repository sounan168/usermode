import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container,Nav,Navbar} from "react-bootstrap";
import { Outlet ,NavLink} from "react-router-dom";
import { useContext } from 'react';
import { CustomContext} from '../context/Context';
import Mobile from "./MobileMode";
// import Button from "react-bootstrap/Button";


const Home = (props) => {
  // let src = `http://192.168.224.254:168/image/${localStorage.getItem('profile')}`
  const {ip,screenSize} = useContext(CustomContext)
  // const [num, setnum] = useState(1);
  // const [src, setscrc] = useState(null);
  const [detail,setdetail] =useState([]);
  const [sex, setsex] = useState();
  let id = localStorage.getItem("id");
  // function handle() {
  //   setnum(num + 1);
  //   props.p(num);
  // }
  useEffect(() => {
    axios
      .get(`${ip}/api/userdetail?id=${id}`)
      .then((respone) => {
        // let data = JSON.parse(respone.data);
        // setscrc(data.Profile);
        console.log(respone.data[0]);
        setdetail(respone.data[0])
      }).catch(e=>alert(e));
    setsex(localStorage.getItem("sex"));
  }, [id,ip]);
  const checksex = () => {
    if (sex !== "F") {
      return "man_318-233556.avif";
    } else {
      return "kisspng-portable-network-graphics-vector-graphics-customer-5c033c289a6bf4.9912322615437158806325.jpg";
    }
  };
  return (
    <div className="container contents" style={{}} >
    
      <div className="row" >
      
        <Col md="4" className="mobile " style={{backgroundColor: "", boxShadow:
              "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",}}>
          
            <div className="d-flex justify-content-center t1" style={{padding:'10px 0 10px 0'}}>

              <div className="d-flex" style={{height:'200px',width:'200px',borderRadius:'50%',overflow:'hidden',border:'2px solid black'}}>
                <img src={`${ip}/image/${checksex()}`} alt="" className="" style={{flexShrink:'0'}}/>
              </div>

            </div >
            <div className="t2">
                <table className="table text-uppercase table-borderless">
                    <tbody>
                        <tr>
                          <th>name</th>
                          <td>{localStorage.getItem('name')}</td>
                        </tr>
                        <tr>
                          <th>id</th>
                          <td>{detail.UserID}</td>
                        </tr>
                        <tr>
                          <th>role</th>
                          <td>{detail.RolesName}</td>
                        </tr>
                        <tr>
                          <th>major</th>
                          <td>{detail.MajorName}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Col>
      
        <Col md='8'
          style={{
            boxShadow:
              "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
              backgroundColor:''
          }} className=" p-0 att">
            <Navbar style={{backgroundColor:'#ECE5C7',marginBottom:'20px'}} data-bs-theme="light">
        <Container>

          <Navbar.Brand href="#home">Summary</Navbar.Brand>
          <Nav className="me-auto text-uppercase">
           <NavLink className="nav-link" to='/home/'>recently</NavLink>
           <NavLink className="nav-link" to='/home/weekly'>Weekly</NavLink>
          </Nav>
        </Container>
        
        </Navbar>
           
             
                <Outlet/>
              
         
     
        </Col>
      </div>
      
    </div>
  );
};
export default Home;
