import { Outlet } from 'react-router-dom'
import Footer from '../Footer/index.jsx'
import Navbar from '../NavBar/index.jsx'

export default function Layout() {   
    return (
        <>
            <div style={{ width: '100%', height: '100%', display:"flex", flexDirection:"column" }}>
                <Navbar/>
           {/* <div style={{height:'100%', display:"flex", justifyContent: "center", alignItems: "center"}}>
            <Landing /> 
            </div>        */}
            <div style={{ width: '100%', height: '100%', display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"center" }}><Outlet/></div>
                <Footer/>
            </div>
        </>
    )
}
