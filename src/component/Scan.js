// import React from 'react';
// import { CustomContext } from "../context/Context";
import { useNavigate, useParams } from "react-router-dom";

import React, {useContext, useEffect, useRef, useState} from 'react'
// import { Link } from "react-router-dom";
import QrScan from 'react-qr-reader'
import { CustomContext } from "../context/Context";
import axios from "axios";

function Scan() {
    const navigate = useNavigate()
    const {num} = useParams()
    const {ip} = useContext(CustomContext)
    const ref = useRef(null)
const [result,setresult] = useState(null)
const [delayScan , setDelayScan] = useState(500);
const [record,setrecord] = useState(true)

   
    
    // function handle(){
//         try{
//             ref.current.stopCamera()
//         }catch(e){
//             alert(e)
//         }
// }
    const handleScan = rs => {
        // if(rs!=null){

        //     alert(rs)
        // }
        if (rs!=null){
       
            let u = JSON.parse(rs)
            let data = {
            id:u.user=localStorage.getItem('id'),
            checks:num
            }
           
            axios.post(`${ip}/api/qrscan`,data ).then((x)=>{
                setrecord(false)
                try{   
                    var today = new Date().toLocaleString();
                    let user = {
                        check:`"ការ${num==='1'?'Checkin':'Checkout'}`,
                        studen:`សិស្សឈ្មោះ:${localStorage.getItem('name')}`,
                        isch:`បានCheck in នោថ្ងៃទី:${today}`
                    }
                    axios.get(`https://api.telegram.org/bot6296341388:AAFdVSv0kiOD1BJzPnkHmEFF4ipchVCYD14/sendMessage?chat_id=-1001762384795&text=${user.check} ${user.studen} ${user.isch}`).then((e)=>{
                        alert(x.data.alert)
                        
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
    console.error(err)
    }
// var id =10
    return (
      <div>
            {/* {qrscan!=null?qrscan.user=id:'no'} */}
            <center style={{marginTop:'100px'}}>
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
                    <div className="d-flex justify-content-center align-item-center">

                        <h1>thank you</h1>


                    </div>
                </>}
              
         
            </center>

       
      </div>
    );
  }
  
  export default Scan;