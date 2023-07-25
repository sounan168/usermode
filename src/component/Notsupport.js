import { Alert, Container } from "react-bootstrap";

const Notspp = () => {
    return (
        <Container >
            <div  className="d-flex justify-content-center align-items-center">

            <Alert variant="danger" className="text-danger" style={{marginTop:'200px'}}>This function availble only Mobile phone</Alert>
            </div>
        </Container>
    )
}
export default Notspp
