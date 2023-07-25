import {Button, Container, Form as F} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleXmark,faCircleCheck, faCircle} from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { CustomContext } from "../context/Context"
const Attendance = () =>{
  const current_month = new Date().getMonth()+1
    const {ip} = useContext(CustomContext)
    const [att,setatt] = useState([])
    const [month,setmonth] = useState(current_month)
    const [count,setcount] = useState([])
    const monthNameList = ["Janury", "Februry", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    

    // const [currentSelected, setCurrentSelected] = useState<string>('01');

   

   
    useEffect(()=>{
        axios.get(`${ip}/api/attmonthly?filter=${month}&id=${localStorage.getItem('id')}`).then((e)=>
        {
          
          setatt(e.data.data.att)
          setcount(e.data.data.count)
          localStorage.setItem('month',e.data.data.att[0].m)
        }
        ).catch(e=>alert(e));
        
    },[ip,month])
    
  console.log(month)

    return (
      <Container className="att_page">
        
        <div className="row" style={{ margin: "0px 0 10px .2px" }}>
          <div className="col-md-6 p-0">
            <h4 style={{margin:'20px 0'}} className="text-uppercase">{parseInt(month)===current_month?'current month':localStorage.getItem('month')}</h4>
            <F.Select  value={month.toString()} onChange={(e)=>setmonth(e.target.value)} className="form-control">
             {monthNameList.map((e,i)=>{
              // console.log(i+1,e)
              
              return(
                
                <option key={i} value={i+1}>{e}</option>
              )
             })}
            </F.Select>
          </div>

        
        </div>
       

        <div
          className=""
          style={{
            width: "100%",
            overflowX: "scroll",
            overflowY: "",
            position: "relative",
          }}
        >
          <table
            className=" text-center "
            style={{ width: "100%", fontSize: "20px", overflowX: "scroll" }}
          >
            <thead style={{ backgroundColor: "#aaf1f3" }}>
              <tr className="">
                <th
                  className="text-uppercase"
                  style={{
                    whiteSpace: "nowrap",
                    padding: "10px 15px 10px 15px",
                  }}
                >
                  {localStorage.getItem("month")}
                </th>
                {att.map((e, i) => {
                  return (
                    <td
                      key={i}
                      style={{
                        whiteSpace: "nowrap",
                        padding: "5px 10px 5px 10px",
                      }}
                    >
                      {e.day_name}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th>student</th>
                {att.map((e, i) => {
                  return (
                    <td
                      key={i}
                      style={{
                        whiteSpace: "nowrap",
                        padding: "5px 10px 5px 10px",
                      }}
                    >
                      {e.x}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td style={{ padding: "15px 20px 15px 20px" }}>
                  {localStorage.getItem("name")}
                </td>
                {att.map((e, i) => {
                  return (
                    <td
                      key={i}
                      style={{
                        whiteSpace: "nowrap",
                        fontSize: "30px",
                        padding: "5px 10px 5px 10px",
                        backgroundColor: "#E9FFC2",
                        color:
                          e.iSoff === "off"
                            ? "red"
                            : e.ischeck === "A"
                            ? ""
                            : "#45CFDD",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          e.iSoff === "off"
                            ? faCircle
                            : e.ischeck === "A"
                            ? faCircleXmark
                            : faCircleCheck
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            </thead>
          </table>
        </div>
        <div className="mt-3">
        <Button variant="info">View Time</Button>
                
        </div>
        <div className="row" style={{ margin: "10px 0 10px .2px" }}>
                <div className="col-md-6" style={{border:'1px solid black'}}>
                  <h2>Summary {localStorage.getItem('month')}</h2>
                    {count.map((e,i)=>{
                      return (
                        
                          <table key={i} className="table table-borderless">
                              <tbody>
                                <tr>
                                  <td>Attend</td>
                                  <td><FontAwesomeIcon color="#45CFDD" icon={faCircleCheck}/>:{e.totalcheck}</td>
                                </tr>
                                <tr>
                                  <td>Absent</td>
                                  <td><FontAwesomeIcon color="red" icon={faCircleXmark}/>:{e.uncheck}</td>
                                </tr>
                              </tbody>
                          </table>
                     
                      )
                    })}
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-6"></div>
        </div>
        {/* <div className="bg-danger d-flex position-relative" style={{height:'200px'}}>
              <div className="bg-info position-sticky" style={{height:'100%'}}>
                <div style={{backgroundColor:'blue'}}>1</div>
                
              </div>
              <div style={{}}></div>
        </div> */}
      </Container>
    );
}
export default Attendance