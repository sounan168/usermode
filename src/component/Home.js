import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container,Nav,Navbar} from "react-bootstrap";
import { Outlet ,NavLink} from "react-router-dom";
import { useContext } from 'react';
import { CustomContext} from '../context/Context';
import Mobile from "./MobileMode";
import { BeatLoader,MoonLoader
} from "react-spinners";
// import Button from "react-bootstrap/Button";


const Home = (props) => {
  //let src = `http://192.168.224.254:168/image/${localStorage.getItem('profile')}`
  const {ip,screenSize,src} = useContext(CustomContext)
  // const [num, setnum] = useState(1);
  // const [src, setscrc] = useState(null);
  const [detail,setdetail] =useState([]);
  const [sex, setsex] = useState();
  const [loading,setloading] = useState(true)
  let id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`${ip}/api/userdetail?id=${id}`)
      .then((respone) => {
        // setscrc(respone.data[0].Profile);
        console.log(respone.data[0]);
        setdetail(respone.data[0])
        
        setloading(false)
      }).catch(e=>alert(e));
    setsex(localStorage.getItem("sex"));
  }, [id,ip]);
  const checksex = () => {
    if (sex !== "F") {
      return "Avatar-Transparent-Background-PNG.png";
      
    } else {
      return "163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png";
    }
  };
  return (
    <div className="container contents" style={{}} >
    
      <div className="row" >
      
        <Col md="4" className="mobile " style={{backgroundColor: "", boxShadow:
              "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",}}>
          
            <div className="d-flex justify-content-center t1" style={{padding:'10px 0 10px 0'}}>

              <div className="d-flex" style={{height:'200px',width:'200px',borderRadius:'50%',overflow:'hidden',border:'2px solid black'}}>
               {loading?<div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}><MoonLoader color="black"/></div>:<img src={`${ip}/image/${src!=null?src:''}`} alt="" className="img-fluid" style={{width:'200px',height:'200px'}}/>}
              </div>

            </div >
            <div className="t2">
                <table className="table text-uppercase table-borderless">
                   <tbody>
                        <tr>
                          <th>ឈ្មោះ</th>
                          <td>{loading?<BeatLoader color="black"/>:localStorage.getItem('name')}</td>
                        </tr>
                        <tr>
                          <th>អត្តលេខ</th>
                          <td>{loading?<BeatLoader color="black"/>:detail.UserID}</td>
                        </tr>
                        <tr>
                          <th>ដំណែង</th>
                          <td>{loading?<BeatLoader color="black"/>:detail.RolesName}</td>
                        </tr>
                        <tr>
                          <th>ជំនាញ</th>
                          <td>{loading?<BeatLoader color="black"/>:detail.MajorName}</td>
                        </tr>
                        <tr>
                          <th>ក្រុម</th>
                          <td>{loading?<BeatLoader color="black"/>:detail.GroupID}</td>
                        </tr>
                        <tr>
                          <th>ជំនាន់</th>
                          <td>{loading?<BeatLoader color="black"/>:detail.GenerationID}</td>
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
           {/* <NavLink className="nav-link" to='/home/'>recently</NavLink> */}
           {/* <NavLink className="nav-link" to='/home/weekly'>Weekly</NavLink> */}
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
