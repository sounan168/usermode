import { Alert, Container } from "react-bootstrap";

const Notfound = () => {
    return (
        <Container>
            <div className="d-flex justify-content-center">
                <Alert style={{marginTop:'200px'}} variant="warning"><h2>404 NOT FOUND!</h2></Alert>
            </div>
        </Container>
    )
}
export default Notfound
