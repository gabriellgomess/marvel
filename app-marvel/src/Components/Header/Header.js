import { React } from "react";
import "./Header.css"
import Logo from "./img/logo-marvel.png"


const Header = () => {
    return(
        <header className="header-top">
           <img className="logo" src={Logo} alt="Logo Marvel"></img>
           <h1>API Marvel</h1>
        </header>
    )
}

export default Header;