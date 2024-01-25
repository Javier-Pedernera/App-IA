import ButtonLanding from "../Btn/buttonLanding"
import logoApp from '../../assets/NutriPlan.png';



export default function Landing() {   
    return (
        <>
        <div style={{display:"flex", flexDirection:"column", height:"100%", width:"100%",alignItems:"center"}}>
            
            <div style={{display:"flex", height:"100%", width:"100%", alignItems:"center", flexDirection:"column", justifyContent:"center"}}>
                 <img src={logoApp} alt="NutriPlan AI" style={{width:"auto", height:"30%"}} />
                <ButtonLanding/>
            </div>
        </div>
            
        </>
    )
}
