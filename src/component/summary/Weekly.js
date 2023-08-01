import { Container } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleXmark,faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { CustomContext } from '../../context/Context';
const Weekly = () =>{
    const {ip} = useContext(CustomContext)
        const [att,setatt] = useState([])
        useEffect(()=>{
            axios.get(`${ip}/api/getatt?id=${localStorage.getItem('id')}&date=1 week`).then((e)=>{
                setatt(e.data.data)
            }).catch(e=>alert(e));
           
        },[ip])
        return(<Container>
            <h1 className="bg-warning p-2 rounded">Weekly</h1>
             <table className="table text-uppercase text-center" style={{}}>
            <thead >
                <tr>
                <th>Day</th>
                <th>Time in</th>
                <th>time out</th>
                <th>attend</th>
                </tr>
            </thead>
            <tbody>
    
               {att.map((e,i)=>{
               return(
                
                    <tr key={i}>
                        <td>{e.day_name}</td>
                        <td>{e.t1==null?'??-??-??':e.t1}</td>
                        <td>{e.t2==null?'??-??-??':e.t1}</td>
                        <td>{e.ischeck==='A'?<FontAwesomeIcon icon={faCircleXmark} style={{color:'red',fontSize:'25px',border:'2px solid black',borderRadius:'50%'}} />:<FontAwesomeIcon icon={faCircleCheck} style={{color:'blue',fontSize:'25px',border:'2px solid black',borderRadius:'50%'}} />}</td>
                    </tr>
               )
                
               })}
            </tbody>
          </table>
        </Container>)
}
export default Weekly