// import React from 'react';
// import { CustomContext } from "../context/Context";
import { useNavigate, useParams } from "react-router-dom";

import React, {useContext, useEffect, useRef, useState} from 'react'
// import { Link } from "react-router-dom";
import QrScan from 'react-qr-reader'
import { CustomContext } from "../context/Context";
import axios from "axios";
import { BeatLoader } from "react-spinners"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble, faCircle, faCircleCheck, faUserCheck, faX } from "@fortawesome/free-solid-svg-icons";
function Scan() {
    const navigate = useNavigate()
    const {num} = useParams()
    const {ip} = useContext(CustomContext)
    const ref = useRef(null)
const [record,setrecord] = useState(true)
const [loading,setloading] = useState(false)
   

    const handleScan = rs => {
       
        if (rs!=null){
            setrecord(false)
            setloading(true)
            axios.post(`${ip}/api/qrscan/${localStorage.getItem('id')}/${num}`).then((x)=>{
                
                try{   
                    var today = new Date().toLocaleString();
                    let user = {
                        check:`"ការ${num==='1'?'Checkin':'Checkout'}`,
                        studen:`សិស្សឈ្មោះ:${localStorage.getItem('name')}`,
                        isch:`${x.data.alert?'បានCheck in នោថ្ងៃទី:'+today+'':'អ្នកបាន​ Checkin រួចរាល់'}`
                    }
                    
                    axios.get(`https://api.telegram.org/bot6296341388:AAFdVSv0kiOD1BJzPnkHmEFF4ipchVCYD14/sendMessage?chat_id=-1001762384795&text=${user.check} ${user.studen} ${user.isch}`).then((e)=>{
                        setloading(false)
                    }).catch((e)=>{
                        alert(e)
                    })         
                 
                }catch(e){
                  navigate('/home')
                  alert('error')
                }
                
            }).catch(e=>{
              navigate('/home')
              alert(e)
            })
        }
       

    }
  
    const handleError = err => {
    alert(err)
    }
// var id =10
    return (
      <div>
        
            <center style={{marginTop:'100px',zIndex:'1'}}>
            {record?<h2 className="text-uppercase text-center">Scan mode</h2>:''}
             
               {record? <QrScan
                    style={{width:'90%'}}
                    delay={300}
                    constraints={{
                        facingMode: 'environment'
                    }}
                    onError={handleError}
                    
                    onScan={handleScan}
                    // onResult={handleScan}
                    ref={ref}
                />:<>
                    <div className="d-flex justify-content-center align-item-center" style={{marginTop:'200px'}}>

                       {loading?<BeatLoader color="black"/>:
                       <div style={{}}>
                       <div>
                       <FontAwesomeIcon  style={{fontSize:'60px'}} color="green" icon={faCheck} />
                       </div>
                       <div style={{fontSize:'35px'}} className="text-uppercase fw-bold">thank you</div>
                       </div>
                       }


                    </div>
                </>}
              
         
            </center>
          
       
      </div>
    );
  }
  
  export default Scan;