import React from 'react';
import './MainSidebar.css';
import Modal from '../Modals/NewProject/NewProject.js';
import logo from '../../res/Icons/logo.svg';
import dashboardIcon from '../../res/Icons/dashboard-white.svg';
import folderIcon from '../../res/Icons/folder-white.svg';
import bugIcon from '../../res/Icons/bug-white.svg';
import addIcon from '../../res/Icons/add-filled-blue.svg';
import infoIcon from '../../res/Icons/info-white.svg';
import logoutIcon from '../../res/Icons/logout-white.svg';
import searchIcon from '../../res/Icons/search-white.svg';
import teamIcon from '../../res/Icons/team-white.svg';
import gearIcon from '../../res/Icons/gear-white.svg';
import personIcon from '../../res/Icons/person-white.svg';

class MainSidebar extends React.Component {

  constructor(props) {
    super(props);
    let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.state = { 
      sidebarWidth: '200px',
      height: screenHeight,
      expanded: true,
      currentTab: 0,
      isProjectModalOpen: this.props.isProjectModalOpen
    };

    window.addEventListener('resize', this.handleResize);

    this.handleStateChange = this.handleStateChange.bind(this);

    console.log("Constructor: " + this.state.isProjectModalOpen);
    
  }

  handleResize = () => {
      let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      this.setState( { height: screenHeight } );
  }

  expandOrCollapse = () =>{
    if(this.state.expanded)
      this.handleStateChange( { sidebarWidth: '60px', expanded: false } );
    else
      this.handleStateChange( { sidebarWidth: '200px', expanded: true } );
  }

  componentWillMount(){
    this.setState( { currentTab: this.props.currentTab } );
  }

  componentDidMount(){
    let sidebarList = document.getElementById("mainSidebarList");

    sidebarList.getElementsByTagName("li")[this.state.currentTab].className = "currentTab";
  }

  componentWillReceiveProps(nextProps){
    this.setState( { isProjectModalOpen: nextProps.isProjectModalOpen }, () => {
      console.log("SIDEBAR: " + this.state.isProjectModalOpen);
    } );
    console.log(nextProps);

  }

  componentDidUpdate(){
    let logo = document.getElementById("logo");
    let expandOrCollapseButton = document.getElementById("expandOrCollapseButton");
    let expandOrCollapseButtonInnerText = document.getElementById("expandOrCollapseInnerText");
    let createButton = document.getElementById("createButton");
    let sidebarListItems = document.getElementById("mainSidebarList").getElementsByTagName("li");
    let sidebarBottomToolbarListItems = document.getElementById("sidebarBottomToolbar").getElementsByTagName("li");

    if(this.state.expanded)
    {//expand the sidebar
      
      expandOrCollapseButton.style.left = "188px";
      expandOrCollapseButtonInnerText.innerHTML = "<";
      createButton.style.marginLeft = "20px";
      createButton.style.width = "140px";
      createButton.style.padding = "10px";
      createButton.getElementsByTagName("div")[0].style.display = "block";

      for(var item of sidebarBottomToolbarListItems)
      {
        item.style.width = "33.3%";
        item.style.display = "inline-block";
        item.style.padding = "0";
      }

    }
    else
    {//collapse the sidebar

      expandOrCollapseButton.style.left = "48px";
      expandOrCollapseButtonInnerText.innerHTML = ">";
      createButton.style.marginLeft = "0";
      createButton.style.width = "auto";
      createButton.style.padding = "10px 20px";
      createButton.getElementsByTagName("div")[0].style.display = "none";

      for(var item of sidebarBottomToolbarListItems)
      {
        item.style.width = "100%";
        item.style.display = "block";
        item.style.padding = "20px 0";
      }
    }
  }

  handleStateChange(newState){
    //event.preventDefault();
    this.setState( newState, () => { console.log(this.state) }  );
    this.props.parentUpdate( newState );
  }

  render(){
    
    return (
      <div>
        
        <Modal isProjectModalOpen = { this.state.isProjectModalOpen }  parentUpdate = { this.handleStateChange }/>

        <aside id = "mainSidebar" style = {{width: this.state.sidebarWidth, height: this.state.height}}>

            <a id = "logo" href = "/dashboard"> <img src = { logo } /> <div id = "logoInnerText"> consilium </div> </a>

            <div id = "createButton" onClick = { () => {this.handleStateChange( { isProjectModalOpen: true } )} }> <div id = "createButtonInnerText"> New project </div> <img id = "createButtonImg" src = { addIcon } /> </div>
    
            <ul id = "mainSidebarList">

              <li> <a href = "/dashboard"> <img src = { dashboardIcon } /> <div className = "sidebarListInnerText"> Dashboard </div> </a> </li>
              <li> <a href = "/projects"> <img src = { folderIcon } /> <div className = "sidebarListInnerText"> Projects </div> </a> </li>
              <li> <a href = "/"> <img src = { bugIcon } /> <div className = "sidebarListInnerText"> Issues </div> </a> </li>
              <li> <a href = "/"> <img src = { teamIcon } /> <div className = "sidebarListInnerText"> Teams </div> </a> </li>
              <li> <a href = "/login"> <img src = { logoutIcon } /> <div className = "sidebarListInnerText"> Logout </div> </a> </li>

            </ul>

            <ul id = "sidebarBottomToolbar">

              <li> <a href = "/"> <img src = { searchIcon } /> </a> </li>
              <li> <a href = "/"> <img src = { gearIcon } /> </a> </li>
              <li> <a href = "/"> <img src = { personIcon } /> </a> </li>

            </ul>

        </aside>

        <div id = "expandOrCollapseButton" onClick = { this.expandOrCollapse }> <div id = "expandOrCollapseInnerText"> {"<"} </div> </div>

      </div>
    );
  }

}

export default MainSidebar;
