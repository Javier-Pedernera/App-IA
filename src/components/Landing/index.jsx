import ButtonLanding from "../Btn/buttonLanding"
import logoApp from "../../assets/NutriPlan.png"
import { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
// import Form from 'react-bootstrap/Form';
import './styles.css';

export default function Landing() {

    const [username, setUsername] = useState('');
    const [isValidEmail, setValidEmail] = useState(true);
    // console.log(isValidEmail);
    const validateEmail = (email) => {
        // Expresión regular para validar un correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleUsernameChange = (e) => {
        const inputEmail = e.target.value;
        setUsername(e.target.value);
        setValidEmail(validateEmail(inputEmail));
    };
    let userId = { usuario_id: username }
    // console.log(userId);
    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("startButton").click();
        }
    };
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", alignItems: "center" }}>
                <div style={{ display: "flex", height: "100%", width: "100%", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
                    <img src={logoApp} alt="NutriPlan AI" style={{ width: "auto", height: "30%" }} />
                    <div className="div_input">
                        <InputGroup className="mb-3" style={{ width: "300px", height: "40px" }}>
                            <FormControl
                                id="emailInput"
                                placeholder="Ingresa tu correo electronico"
                                value={username}
                                onChange={handleUsernameChange}
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                type="email"
                                style={{ fontSize: "14px", color: "#446FB6" }}
                                onKeyDown={handleEnterPress}
                            />
                        </InputGroup>
                        {!isValidEmail ? <div className="invalidateEmail">"Ingresa un email válido"</div> : <div></div>}
                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <ButtonLanding UserID={userId} />
                    </div>

                </div>
            </div>
        </>
    )
}
