import { Container } from "react-bootstrap"
import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { CustomContext } from "../context/Context";

export default function Profile(props) {
const {imgs,ip} = useContext(CustomContext)
const checksex = () => {
  if (localStorage.getItem("sex") !== "F") {
    return "Avatar-Transparent-Background-PNG.png";
  } else {
    return "163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png";
  }
};

  return (
    <div className="" style={{ backgroundColor: '' }}>
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage src={`${ip}/image/${imgs!=null?imgs:checksex()}`}
                    className="rounded-circle" fluid style={{ width: '100px' ,height:'100px' }} />
                </div>
                <MDBTypography tag="h4">Yen Kimloang</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  Information Technology <span className="mx-2">|</span> <a href="#!">Loang@gmail.com</a>
                </MDBCardText>
               
               
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">Role</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Student</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">Generation</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">28</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">Group</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">63</MDBCardText>
                  </div>
                </div>
                <MDBBtn onClick={props.log}rounded size="lg" style={{backgroundColor:'red'}}>
                  Logout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}