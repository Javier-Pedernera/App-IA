import React from 'react';
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

const Navbar = () => {
  const selectedVoice = useSelector((state) => state.messages.selectedVoice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
// console.log(selectedVoice);
  const handleVoiceChange = (event) => {
    const selectedValue = event.target.value;
    dispatch(selectVoice(selectedValue));
  };
  const handleOut = () => {
    Cookies.remove('user');
    // Cookies.remove('thread_id');
    // Cookies.remove('tokenUser');
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
        {/* <label htmlFor="voiceSelect" className='titleSelect'>Elige la voz:</label> */}
        <Form.Select 
        size="md"
        id="voiceSelect"
          value={selectedVoice}
          onChange={handleVoiceChange}
        >
        {voices.map((voice) => (
          <option key={voice} value={voice}>
              {voice}
            </option>
          ))}
      </Form.Select>
      <div className='div_ico_voz'><MdVoiceChat className='icono_voz' /></div>
          
          <button title="Salir" onClick={handleOut} className='btn_out'>
          <FaSignOutAlt className='ico_out'/></button>
      </div>
      
    </nav>
  );
};

export default Navbar;