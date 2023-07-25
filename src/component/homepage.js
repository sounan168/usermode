import { useContext } from "react"
import Home from "./Home"
import Mobile from "./MobileMode"
import { CustomContext } from "../context/Context"
const HomePage = () => {
    const {screenSize} = useContext(CustomContext)
    return (
        <>
        {screenSize.width<=500?<Mobile/>:
        <Home/>}
        </>
    )
}
export default HomePage