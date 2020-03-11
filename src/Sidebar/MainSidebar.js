import React from 'react';
import './MainSidebar.css';
import logo from '../res/Icons/logo.svg';
import dashboardIcon from '../res/Icons/dashboard-white.svg';
import folderIcon from '../res/Icons/folder-white.svg';
import bugIcon from '../res/Icons/bug-white.svg';
import addIcon from '../res/Icons/add-filled-blue.svg';
import infoIcon from '../res/Icons/info-white.svg';
import logoutIcon from '../res/Icons/logout-white.svg';
import searchIcon from '../res/Icons/search-white.svg';
import teamIcon from '../res/Icons/team-white.svg';

class MainSidebar extends React.Component {

  constructor(props) {
    super(props);
    let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.state = { 
      width: '200px',
      height: screenHeight,
      expanded: true
    };

    window.addEventListener('resize', this.handleResize)
  }

  handleResize = () => {
      let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      this.setState( { height: screenHeight } )
  }

  expandOrCollapse = () =>{
    let logo = document.getElementById("logo");
    let expandOrCollapseButtonInnerText = document.getElementById("expandOrCollapseInnerText");
    let createButton = document.getElementById("createButton");
    let sidebarListItems = document.getElementById("mainSidebarList").getElementsByTagName("li");
    let sidebarBottomToolbarListItems = document.getElementById("sidebarBottomToolbar").getElementsByTagName("li");

    if(this.state.expanded == true)
    {//collapse the sidebar
      this.setState({ width: '60px', expanded: false })

      document.getElementById("logoInnerText").style.display = "none";
      logo.getElementsByTagName("img")[0].style.paddingLeft = "15px";
      expandOrCollapseButtonInnerText.innerHTML = ">";
      createButton.style.marginLeft = "0";
      createButton.style.width = "auto";
      createButton.style.padding = "10px 20px";
      createButton.getElementsByTagName("div")[0].style.display = "none";
      
      for(var item of sidebarListItems)
      {
        item.getElementsByClassName("sidebarListInnerText")[0].style.display = "none";
        item.getElementsByTagName("img")[0].style.marginBottom = "20px";
      }

      for(var item of sidebarBottomToolbarListItems)
      {
        item.style.width = "100%";
        item.style.display = "block";
        item.style.padding = "20px 0";
      }

    }
    else
    {//expand the sidebar
      this.setState({ width: '200px', expanded: true })

      document.getElementById("logoInnerText").style.display = "block";
      logo.getElementsByTagName("img")[0].style.paddingLeft = "20px";
      expandOrCollapseButtonInnerText.innerHTML = "<";
      createButton.style.marginLeft = "20px";
      createButton.style.width = "140px";
      createButton.style.padding = "10px";
      createButton.getElementsByTagName("div")[0].style.display = "block";
      
      for(var item of sidebarListItems)
      {
        item.getElementsByClassName("sidebarListInnerText")[0].style.display = "block";
        item.getElementsByTagName("img")[0].style.marginBottom = "0";
      }

      for(var item of sidebarBottomToolbarListItems)
      {
        item.style.width = "33.3%";
        item.style.display = "inline-block";
        item.style.padding = "0";
      }
    }
  }

  render(){
    
    return (
      <aside id = "mainSidebar" style = {{width: this.state.width, height: this.state.height}}>
  
          <div id = "expandOrCollapseButton" onClick = { this.expandOrCollapse }> <div id = "expandOrCollapseInnerText"> {"<"} </div> </div>

          <a id = "logo" href = "/"> <img src = { logo } /> <div id = "logoInnerText"> consilium </div> </a>

          <a id = "createButton" href = "/"> <div id = "createButtonInnerText"> New project </div> <img id = "createButtonImg" src = { addIcon } /> </a>
  
          <ul id = "mainSidebarList">

            <li className = "currentTab"> <a href = "/"> <img src = { dashboardIcon } /> <div className = "sidebarListInnerText"> Dashboard </div> </a> </li>
            <li> <a href = "/"> <img src = { folderIcon } /> <div className = "sidebarListInnerText"> Projects </div> </a> </li>
            <li> <a href = "/"> <img src = { bugIcon } /> <div className = "sidebarListInnerText"> Issues </div> </a> </li>
            <li> <a href = "/"> <img src = { teamIcon } /> <div className = "sidebarListInnerText"> Teams </div> </a> </li>
            <li> <a href = "/"> <img src = { logoutIcon } /> <div className = "sidebarListInnerText"> Logout </div> </a> </li>

          </ul>

          <ul id = "sidebarBottomToolbar">

            <li> <a href = "/"> <img src = { searchIcon } /> </a> </li>
            <li> <a href = "/"> <img src = { infoIcon } /> </a> </li>
            <li> <a href = "/"> <img src = { infoIcon } /> </a> </li>

          </ul>

      </aside>

    );
  }

}

export default MainSidebar;
