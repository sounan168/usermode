import { Container } from "react-bootstrap"
import Qrscan from "./Qrscan"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay, faCheckToSlot, faCircleCheck, faCircleXmark, faClipboardUser} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { CustomContext } from "../context/Context"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { BeatLoader } from "react-spinners"

const Mobile = () => {
    const [sex, setsex] = useState();
    const {ip,setbrand,loading,setloading} = useContext(CustomContext)
    // const [num, setnum] = useState(1);
    // const [src, setscrc] = useState(null);
    const [detail,setdetail] =useState([]);
    let id = localStorage.getItem("id");
    const [att,setatt] = useState([])
    useEffect(() => {
        axios.get(`${ip}/api/getatt?id=${localStorage.getItem('id')}&Date=1 day`).then((e)=>{
            setloading(false)
            console.log(e.data.data)
            setatt(e.data.data)
        }).catch(e=>alert(e))
        axios
          .get(`${ip}/api/userdetail?id=${id}`)
          .then((respone) => {
            let data = JSON.parse(respone.data);
            // setscrc(data.Profile);
            setdetail(data)
          }).catch(e=>alert(e));
        setsex(localStorage.getItem("sex"));
      }, [id,ip]);
      const checksex = () => {
        if (sex !== "F") {
          return "avatar4.png";
        } else {
          return "avatar3.png";
        }
      };
      function checktime() {
        var today = new Date();
        var curHr = today.getHours();
        var times = ""
        if (curHr < 12) {
          times = "good morning"
        } else if (curHr < 18) {
          times = "good afternoon"
        } else {
          times = "good evening"
        }
        return times;
      }

    return (
        <Container className="mt-5">
    <div className="mobile_mode" style={{margin:''}}>
        <div className="profiles">
            <Link className="menu-items" to='/profile' onClick={()=>setbrand(false)}>
                <div style={{width:'100px',height:'100px',borderRadius:'50%',overflow:'hidden',border:'2px solid black',marginLeft:'10px'}}>
                <img src={`${ip}/image/${checksex()}`} alt="" className="" style={{flexShrink:'0',width:'100%'}}/>
                </div>
                <div style={{}}>
                <p className="txts fw-bold">{checktime()},<br/> {localStorage.getItem('name')}!</p>               
                <div>
                  <p style={{fontSize:'13px',marginLeft:'11px',marginBottom:'0'}}>

                  <p style={{color: '#A8A196'}} to="/profile">view profile</p>
                  </p>
                </div>
                </div>
               
               
            </Link>
        </div>
        <div className="dph1">
        <Link className="menu-item" to='/att'>
                
                <FontAwesomeIcon icon={faClipboardUser}/>
                <p className="txt">
                Attend
                </p>
                
                
            </Link>
        </div>
        <div className="dph2">
        <Link className="menu-item" to='/checkin'>
                
                <FontAwesomeIcon icon={faCheckToSlot}/>
                <p className="txt">
                Checkin
                </p>
                
                
            </Link>
        </div>
        <div className="dph3">
        <Link className="menu-item" to='/summary'>
                
                <FontAwesomeIcon icon={faCalendarDay}/>
                <p className="txt">
                summary
                </p>
                
                
            </Link>
        </div>
        <div className="today">
            <div className="menu-table">
           {loading? <div className="d-flex justify-content-center aligh-items-center"><BeatLoader color="white"/></div>:<table className=" table-borderless text-uppercase text-center" style={{}}>
        <tbody>

           {att.map((e,i)=>{
           return(
            
                <tr key={i}>
                    <td>{e.day_name}</td>
                    <td>{e.x}</td>
                    <td>{e.t1==null?'??-??-??':e.t1}</td>
                    <td>{e.t2==null?'??-??-??':e.t1}</td>
                    <td>{e.ischeck==='A'?<FontAwesomeIcon icon={faCircleXmark} style={{color:'red',fontSize:'25px',border:'2px solid black',borderRadius:'50%'}} />:<FontAwesomeIcon icon={faCircleCheck} style={{color:'blue',fontSize:'25px',border:'2px solid black',borderRadius:'50%'}} />}</td>
                </tr>
           )
            
           })}
        </tbody>
      </table>}
  
            </div>
    </div>
        <Qrscan/>
   </div>
   </Container>
    )
}
export default Mobile