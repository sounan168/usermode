import {Routes, Route,useNavigate} from 'react-router-dom'
import Layout from '../component/Layout'
import Login from '../login/Login'
import Attendance from '../component/Attendance'
import Checkin from '../component/Checkin'
import Profile from '../component/Profile'
// import { useState } from 'react'
import Recently from '../component/summary/Recently'
// import Weekly from '../component/summary/Weekly'
import Scan from '../component/Scan'
import { useContext } from 'react'
import { CustomContext } from '../context/Context'
import Qrscan from '../component/Qrscan'
import Notfound from '../component/Notfound'
import Notspp from '../component/Notsupport'
import HomePage from '../component/homepage'
import Summary from '../component/Summary'


const Content = () =>{
    const {screenSize} = useContext(CustomContext)
    const navigate = useNavigate()
    function logout(){
        console.log('click')
        let remove = ['check','name','pass','id']
        for(let key of remove){
            localStorage.removeItem(key)
        }
        navigate('/')
    }
 
    
   return( <>
   
    <Routes>
        <Route path='/' element={<Login/> }/>
        <Route element={<Layout log= {logout}/>}> 
            <Route path='/home' element={<HomePage/>}>
                <Route index element={<Recently/>}/>
                {/* <Route path='/home/weekly' element={<Weekly/>}/> */}
            </Route>
            <Route path='/att' element={<Attendance/>}/>
            <Route path='/checkin' element={<Checkin/>}/>
            <Route path='/Profile' element={<Profile log={logout}/>}/>
            <Route path='/summary' element={<Summary/>}/>
            <Route path='/qrscan' element={screenSize.width<=500?<Qrscan/>:<Notspp/>}/>
                <Route path='/qrscan/scan/:num' element={screenSize.width<=500?<Scan/>:<Notspp/>}/>
            <Route path='*' element={<Notfound/>}/>
        </Route>
        
    </Routes>
    </>)
}
export default Content