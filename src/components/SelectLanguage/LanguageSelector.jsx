import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { languageSelected } from '../../Redux/Actions/MessageGet';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

function LanguageSelector() {

  const dispatch = useDispatch()
  const { t } = useTranslation();
  const languages = [
    { name: "English (US)", code: "en-US" },
    { name: "Swedish", code: "sv-SE" },
    // { name: "Spanish (Argentina)", code: "es-AR" },
    { name: "Spanish", code: "es-ES" },
    { name: "Portuguese", code: "pt-br" }
  ];

  const selectedLanguage = useSelector((state) => state.messages.selectedLanguage);

  //Select estilos
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

  // const selectedLanguage = useSelector((state) => state.messages.selectedLanguage);
  // console.log(selectedLanguage);
  const handleLanguageChange = ({ value }) => {
    dispatch(languageSelected(value));
    i18n.changeLanguage(value.code);
  };
  return (
    <Select
      // isClearable={true}
      isSearchable={true}
      styles={colorStyles}
      defaultValue={{ value: languages[2].code, label: languages[2].name }}
      onChange={handleLanguageChange}
      options={languages.map((language) => ({ label: language.name, value: language }))}
      menuPlacement="bottom"
    > </Select>
  );
}

export default LanguageSelector;