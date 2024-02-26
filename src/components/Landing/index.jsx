import ButtonLanding from "../Btn/buttonLanding"
import logoApp from "../../assets/NutriPlan.png"
import { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import './styles.css';
import Loader from "../Loader/Loader.jsx";
import LanguageSelector from "../SelectLanguage/LanguageSelector.jsx";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function Landing() {

    const [username, setUsername] = useState('');
    const [isValidEmail, setValidEmail] = useState(true);
    const [loading, setLoading] = useState(false);
    const selectedLanguage = useSelector((state) => state.messages.selectedLanguage);
    const { t } = useTranslation();



    const validateEmail = (email) => {
        // Expresión regular para validar un correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    //  console.log(selectedLanguage);
    const handleUsernameChange = (e) => {
        const inputEmail = e.target.value;
        setUsername(e.target.value);
        setValidEmail(validateEmail(inputEmail));
    };
    let dataCreatePlan = {
        usuario_id: username,
        idioma: selectedLanguage.code ? selectedLanguage.code : "es-ES"
    }

    //Spanish (Argentina)
    // console.log(Object.keys(selectedLanguage).length);
    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("startButton").click();
        }
    };
    // console.log(dataCreatePlan);



    return (

        loading ? (<div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", alignItems: "center" }}><Loader></Loader></div>) : (
            <><div >
                <div style={{ display: "flex", height: "100%", width: "100%", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
                    <img src={logoApp} alt="NutriPlan AI" style={{ width: "auto", height: "30%" }} >
                        {/* <button onClick={ }>Start Voice Input</button> */}
                    </img>

                    <div className="div_input">

                        <InputGroup className="mb-3" style={{ width: "300px", height: "40px" }}>
                            <FormControl
                                id="emailInput"
                                placeholder={t("placeholdercorreo")}
                                value={username}
                                onChange={handleUsernameChange}
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                type="email"
                                style={{ fontSize: "14px", color: "#446FB6" }}
                                onKeyDown={handleEnterPress}

                            />
                        </InputGroup>
                        <div className="div_error_email">
                            {!isValidEmail ? <div className="invalidateEmail">{t("ErrorEmail")}</div> : <div className="invalidateEmail"></div>}
                        </div>

                    </div>
                    <div style={{ marginTop: "30px" }}>
                        <ButtonLanding dataPlan={dataCreatePlan} setLoader={setLoading} activeButton={isValidEmail} />
                    </div>
                    <hr />
                    <LanguageSelector />
                </div>

            </div>
            </>)
    )
}
