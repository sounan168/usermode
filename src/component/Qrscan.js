
import { faArrowRightFromBracket, faArrowRightToBracket, faQrcode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { Link, } from "react-router-dom"
import { CustomContext } from "../context/Context"


 const Qrscan = () => {
   const {handle} = useContext(CustomContext)
    return (
        <div className="d-flex justify-content-center menu-scan">
            <div className="" style={{marginTop:'0px',width:'100%'}}>
                    <Link onClick={handle} className="checkinbtn" to='/qrscan/scan/1'><span><FontAwesomeIcon style={{}} icon={faQrcode}/> <span style={{margin:'0 10px'}}>Checkin</span></span><FontAwesomeIcon icon={faArrowRightToBracket}/></Link>
                    <Link className="checkinbtn" to='/qrscan/scan/2'><span><FontAwesomeIcon style={{}} icon={faQrcode}/> <span style={{margin:'0 10px'}}>Checkout</span></span><FontAwesomeIcon icon={faArrowRightFromBracket}/></Link>
            </div>
                    
        </div>
    )
}
export default Qrscan