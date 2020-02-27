import React from 'react';
import './MainSidebar.css';
import dashboardIcon from '../res/Icons/dashboard-white.svg';
import folderIcon from '../res/Icons/folder-white.svg';
import bugIcon from '../res/Icons/bug-white.svg';
import addIcon from '../res/Icons/add-white.svg';

class MainSidebar extends React.Component {

  constructor(props) {
    super(props);
    let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.state = { 
      width: '200px',
      height: screenHeight-50,
      expanded: true
    };
  }

  expandOrCollapse = () =>{
    let innerText = document.getElementById("ExpandOrCollapseInnerText");
    let logo = document.getElementById("Logo");
    let sidebarMenu = document.getElementById("SidebarMenu");
    let sidebarMenuItems = document.getElementById("SidebarMenu").getElementsByTagName("li");

    if(this.state.expanded == true)
    { //collapse the sidebar
      this.setState({ width: '50px', expanded: false });
      innerText.innerHTML = ">";

      for(var item of sidebarMenuItems)
      {
        item.style.width = "100%";
        item.style.padding = "4px 0";
        item.getElementsByClassName("SidebarMenuItemInnerText")[0].style.display = "none";
        item.getElementsByClassName("SidebarIcon")[0].style.display = "block";
        item.getElementsByClassName("SidebarIcon")[0].style.margin = "auto";
      }
    }
    else
    { //expand the sidebar
      this.setState({ width: '200px', expanded: true });
      innerText.innerHTML = "<";
      logo.style.display = "block";
      sidebarMenu.style.top = "0";

      for(var item of sidebarMenuItems)
      {
        item.style.width = "70%";
        item.style.padding = "4px 10px";
        item.getElementsByClassName("SidebarMenuItemInnerText")[0].style.display = "inline-block";
        item.getElementsByClassName("SidebarIcon")[0].style.display = "inline-block";
        item.getElementsByClassName("SidebarIcon")[0].style.margin = "0 6px 0 0";
        item.getElementsByClassName("SidebarIcon")[0].style.top = "2px";
      }
    }

  }

  render(){
    
    return (
      <aside id = "MainSidebar" style = {{width: this.state.width, height: this.state.height}}>
  
          <div id = "ExpandOrCollapseButton" onClick = { this.expandOrCollapse }> <div id = "ExpandOrCollapseInnerText"> {"<"} </div> </div>

          <a id = "Logo" href = "/"> consilium </a>

          <ul id = "SidebarMenu">

            <li id = "CurrentTab"> <a href = "/"> <img class = "SidebarIcon" src = { dashboardIcon } /> <div class = "SidebarMenuItemInnerText"> Dashboard </div> </a> </li>
            <li> <a href = "/"> <img class = "SidebarIcon" src = { folderIcon } /> <div class = "SidebarMenuItemInnerText"> Projects </div> </a> </li>
            <li> <a href = "/"> <img class = "SidebarIcon" src = { bugIcon } /> <div class = "SidebarMenuItemInnerText"> Issues </div> </a> </li>
            <li> <a href = "/"> <img class = "SidebarIcon" src = { addIcon } /> <div class = "SidebarMenuItemInnerText"> Create </div> </a> </li>

          </ul>
  
      </aside>
    );
  }

}

export default MainSidebar;
