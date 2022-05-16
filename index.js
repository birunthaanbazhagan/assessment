import React from "react";
import ReactDOM from "react-dom";
import Kanban from "./Kanban";
import male from "./images/male.png";
import searchIcon from "./images/searchIcon.svg";
import search from "./images/search.jpg";
// import user from "./images/user.jpg";
import contact from "./images/contact.jpg";
import details from "./images/details.jpg";
import hear from "./images/hear.jpg";
import support from "./images/support.png";
import setting from "./images/setting.png";
import gift from "./images/gift.jpg";


import "./styles.css";

function App() {

  // const router = useRouter();
  // const changeToEdit =()=>{
  //   router.push(`./search.js`);
  // };

  return (
    <div className="App">
      <div class="sidenav">
        <a href="#about"><img src={male} alt="user" width={25} height='25'/></a>
        <hr class="sidebar-divider"></hr>
        <a href="#services"><img src={contact} alt="contact" width={25} height='25' /></a>
        <a href="#services"><img src={search} alt="search" width={25} height='25' /></a>
        <a href="#clients"><img src={details} alt="details" width={25} height='25' /></a>
        <a href="#contact"><img src={hear} alt="hear" width={25} height='25' /></a> <br/><br/>
        <a href="#contact"><img src={support} alt="support" width={25} height='25' /></a>
        <a href="#contact"><img src={setting} alt="support" width={25} height='25' /></a>
      </div>
      <div className="MainNavWrapper">
        <div className="MainNav">
          <img src={male} alt="logo" width={20} height='20' />
          <span>iamneo.ai Talent Center</span>
        </div>
        <div className="Buttons">
          <button className="Search" 
            // onclick={changeToEdit} 
            type="button" 
            placeholder="search">
              <span className="Span">Search</span>
            <img className="Icon" src={searchIcon} alt="search" width={20} height='20' />
          </button>
          {/* <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        /> */}
          <button type="submit">Add New</button>
          <img className="giftIcon" src={gift} alt="search" width={25} height='25' />
        </div>
      </div>
      <Kanban/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
