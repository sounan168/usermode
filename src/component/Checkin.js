import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Alert, Container } from "react-bootstrap"
import { Form as F } from "react-bootstrap"
import { useContext } from 'react';
import { CustomContext} from '../context/Context';
const Checkin = () =>{
    const {ip} = useContext(CustomContext)
    const [buildings, setbuilding] = useState([]);
    const [bd, setbd] = useState(1);
    const [classed, setclass] = useState([]);
    const [notice, setnotice] = useState(false);
    const [message, setmessage] = useState("");
    const cl = useRef(null)
    const check = useRef(null)
    useEffect(()=>{
        axios.get(`${ip}/api/getbc?bid=${bd}`)
        .then((e)=>{
            
           setbuilding(e.data.building)
         
           setclass(e.data.class)
        })
        .catch(e=>alert(e))
       
    },[ip,bd]);

    const submit = () => {
        let classid = cl.current.value
        let ch = check.current.value
        axios.post(`${ip}/api/checkin?class=${classid}&id=${localStorage.getItem('id')}&check=${ch}`).then((e)=>{
                setmessage(e.data[0])
                console.log(e.data[0])
        }).catch((e)=>{
            setmessage(e)
        })
        
        setnotice(true)
    }
//   console.log(classed)
    return(<Container>
         
        <div className="row mt-4" style={{margin:'0px 0 0 .2px'}}>
           
           
            <div className="col-md-3 p-0 ">
           
            </div>
             
            <div className="col-md p-0 " style={{boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',borderRadius:'5px',overflow:'hidden'}}>
            {notice?<Alert variant={message.alert?'info':'danger'} onClose={() => setnotice(false)} className=""  dismissible>
        <Alert.Heading >message</Alert.Heading>
        <p>
          {message.message}
        </p>
      </Alert>:""}
            <h1 style={{padding:'15px 0px 15px 5px',backgroundColor:'#DFD7BF'}} className="text-uppercase text-center m-0">Checkin</h1>
          
                <div className="form checkin">
                        <h5 className="" style={{margin:'5px 0 5px 0'}}>Building:</h5>
                        <F.Select value={bd.toString()} onChange={(e)=>setbd(e.target.value)}>
                            {buildings.map((e,i)=>{
                                return(
                                    <option key={i} value={i+1}>{e.B_name}</option>
                                )
                            })}
                        </F.Select>
                        <h5 className=""  style={{margin:'5px 0 5px 0'}}>Class:</h5>
                        <F.Select ref={cl}>
                        {classed.map((e,i)=>{
                                return(
                                    <option key={i} value={e.calssID}>{e.ClassName}</option>
                                )
                            })}
                        </F.Select>
                        <h5 className="" style={{margin:'5px 0 5px 0'}}>Check:</h5>
                        <F.Select ref={check}>
                            <option value="1">Checkin</option>
                            <option value="2">Checkout</option>
                        </F.Select>
                        <button   className="btn btn-info btns p-2" onClick={submit} >CONFIRM</button>
                </div>
            </div>
            <div className="col-md-3 p-0 ">
            
            </div>
           
        </div>
      
       
    </Container>)
}
export default Checkin