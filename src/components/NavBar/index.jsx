import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import './Navbar.css';
import logo from '../../assets/logo2.png';
import { getOut, selectVoice } from '../../Redux/Actions/MessageSlice';
const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
import { MdVoiceChat } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { getUser } from '../../Redux/Actions/UserSlice';
import Cookies from 'js-cookie';
import Select from 'react-select'
import { voiceSelected } from '../../Redux/Actions/MessageGet';

const Navbar = () => {
  const selectedVoice = useSelector((state) => state.messages.selectedVoice);
  const userActive = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const user = Cookies.get('userEmail');

  useEffect(() => {
    const user = Cookies.get('userEmail');
    if (!Object.keys(userActive).length && user) {
      // const user = Cookies.get('userEmail');
      dispatch(getUser(user))
    }
  }, [userActive]);


  const colorStyles = {
    control: (styles, state) => ({
      ...styles,
      alignContent: "center",
      height: "28px",
      minHeight: "32px",
      display: "flex",
      cursor: "pointer",
      fontSize: '15px',
      minWidth: "200px",
      color: "#446fb6",
      // color: state.isSelected ? "red" : "#446fb6",
      textTransform: "capitalize",
      border: "none",
      borderColor: state.isFocused && "transparent",
      boxShadow: "none",
      "&:hover": { borderColor: "transparent", }
    }),
    option: (styles, state) => ({
      ...styles,
      cursor: "pointer",
      fontSize: '15px',
      background: state.isSelected ? "#3fb5e4ac" : "transparent",
      color: state.isSelected ? "white" : "#446fb6",
      textTransform: "capitalize",
      "&:hover": {
        background: state.isSelected ? "#3fb5e4ac" : "#f1c536b3",
      }
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#446fb6",
      background: "#f1c536b3",

    }),
    input: (styles) => ({
      ...styles,
      color: "#446fb6",
      textTransform: "capitalize",


    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#446fb6",
      fontWeight: 600,
      fontSize: '17px',
      // textTransform: "uppercase",
    }),
    menuList: (styles) => ({
      ...styles,
      color: "#446fb6",
      background: "transparent"
    }),
    clearIndicator: (styles) => ({
      ...styles,
      // color:"#aa1414",
      // background:"transparent"
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#446fb6",
      // background:"transparent"
    }),
  }

  const handleVoiceChange = ({ value }) => {
    dispatch(voiceSelected(value));
  };
  const handleOut = () => {
    Cookies.remove('user');
    Cookies.remove('userEmail');
    localStorage.removeItem('storedMessages');
    dispatch(getOut())
    dispatch(getUser({}))
    navigate(`/landing`);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <img src={logo} alt="NutriPlan AI" className="navbar__logo" />
      </Link>
      <div className="navbar__voice-select">
        <div className='selectDiv'>
          <Select
            // isClearable={true}
            isSearchable={true}
            styles={colorStyles}
            defaultValue={{ value: '', label: 'Elige una voz' }}
            onChange={handleVoiceChange}
            options={voices.map((sup) => ({ label: sup, value: sup }))}
          />
          <div title="Voz" className='div_ico_voz'><MdVoiceChat className='icono_voz' /></div></div>


        {Object.keys(userActive).length ?
          <div className='userEmail'>{user}<button title="Salir" onClick={handleOut} className='btn_out'>
            <FaSignOutAlt className='ico_out' /></button></div>
          : <div>
            <Link to="/" className="navbar__brand"><div className='userEmail'>Ingresa</div></Link> </div>}

      </div>

    </nav>
  );
};

export default Navbar;