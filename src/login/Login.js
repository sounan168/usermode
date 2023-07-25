import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useContext } from 'react';
import { CustomContext } from '../context/Context';
import axios from 'axios';
const Login =()=>{
    const {ip} = useContext(CustomContext)
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [id,setid] = useState("")
    const [name,setname] = useState("")
    const [pass,setpass] = useState("")
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
    
   
    
        let Forms = new FormData()
        Forms.append('id',id)
        Forms.append('name',name)
        Forms.append('pass',pass)
        axios.post(`${ip}/api/login`,Forms).then(e=>{
          if(e.data.alert===true){
            localStorage.setItem('id',e.data.data.UserID)
            localStorage.setItem('name',e.data.data.UserName)
            localStorage.setItem('pass',e.data.data.Passwords)
            localStorage.setItem('sex',e.data.data.Sex)
            localStorage.setItem('check',e.data.alert)
            // localStorage.setItem('profile',e.data.profile.Profile)
            
            // console.log(localStorage.getItem('pass'))
            navigate('/home')
          }
        }).catch(e=>{alert(e)})
      
    };

    return(
        <Container>
           
        <Form noValidate validated={validated}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>ID</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="ID"
            onChange={e=>setid(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="User Name"
            onChange={e=>setname(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Password"
            onChange={e=>setpass(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
    
        
      <Button onClick={handleSubmit}>Submit form</Button>
    </Form>
    </Container>
    )
}
export default Login