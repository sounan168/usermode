import { Container } from "react-bootstrap"

const Profile = (props) =>{
    return(<Container>
        Profile
        <button onClick={props.log} className="btn btn-danger">logout</button>
    </Container>)
}
export default Profile