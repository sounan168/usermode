// import { useEffect } from "react"
import { Navigate, Outlet, } from "react-router-dom"

function checkLogin(){
    let login = {islogin:false}
    // let id =  localStorage.getItem('id')
    // let name = localStorage.getItem('name')
    let check = localStorage.getItem('check')
    if(check){
        let setlogin = login.islogin=true
        return login && setlogin
    } 
  }


  function getlogin() {
    const checklogin = checkLogin()
    return checklogin?<Outlet/>:<Navigate to='/'/> 
  }
  export default getlogin