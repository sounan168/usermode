import React, { useState ,useEffect} from 'react';
import './App.css';
import Content from './content/Content';
// import { useContext } from 'react';
import { CustomContext,ip } from './context/Context';
import { useNavigate,} from 'react-router-dom';
import axios from 'axios';
let src = localStorage.getItem('profile')
// import scan from './component/scan.mp3'
function App() {
const [brand, setbrand] = useState(true);
const [loading, setloading] = useState(true);

  const [result,setresult] = useState(null)
  const navigate = useNavigate();
  const [imgs, setimgs] = useState();
   //size
   const [screenSize, setScreenSize] = useState(getCurrentDimension());

  	function getCurrentDimension(){
    	return {
      		width: window.innerWidth,
      		height: window.innerHeight
    	}
  	}
	  let check = localStorage.getItem('check')
  
  	useEffect(() => {
	
		if(check){
			axios
		.get(`${ip}/api/userdetail?id=${localStorage.getItem("id")}`)
		.then((respone) => {
		  setimgs(respone.data[0].Profile);
		 
		}).catch(e=>console.log(e));
		}
		
    		const updateDimension = () => {
      			setScreenSize(getCurrentDimension())
    		}
    		window.addEventListener('resize', updateDimension);
    
		
    		return(() => {
        		window.removeEventListener('resize', updateDimension);
    		})
  	}, [screenSize])

  return (
  
    <>
    <CustomContext.Provider value={{ip,result,screenSize,brand,setbrand,loading,setloading,imgs,src}}>
        <Content/>
    </CustomContext.Provider>
      
    </>
   )
      
   

}

export default App;
