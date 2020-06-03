import React from 'react';
import './MainSidebar.css';
import Modal from '../Modals/NewProject/NewProject.js';
import logo from '../res/Icons/logo.svg';
import dashboardIcon from '../res/Icons/dashboard-white.svg';
import folderIcon from '../res/Icons/folder-white.svg';
import bugIcon from '../res/Icons/bug-white.svg';
import addIcon from '../res/Icons/add-filled-blue.svg';
import infoIcon from '../res/Icons/info-white.svg';
import logoutIcon from '../res/Icons/logout-white.svg';
import searchIcon from '../res/Icons/search-white.svg';
import teamIcon from '../res/Icons/team-white.svg';
import gearIcon from '../res/Icons/gear-white.svg';
import personIcon from '../res/Icons/person-white.svg';

class MainSidebar extends React.Component {

  constructor(props) {
    super(props);
    let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.state = { 
      width: '200px',
      height: screenHeight,
      expanded: true,
      currentTab: 0,
      isProjectModalOpen: this.props.isProjectModalOpen
    };

    window.addEventListener('resize', this.handleResize);

    this.childUpdate = this.childUpdate.bind(this);

    console.log("Constructor: " + this.state.isProjectModalOpen);
    
  }

  handleResize = () => {
      let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      this.setState( { height: screenHeight } )
  }

  expandOrCollapse = () =>{
    let logo = document.getElementById("logo");
    let expandOrCollapseButton = document.getElementById("expandOrCollapseButton");
    let expandOrCollapseButtonInnerText = document.getElementById("expandOrCollapseInnerText");
    let createButton = document.getElementById("createButton");
    let sidebarListItems = document.getElementById("mainSidebarList").getElementsByTagName("li");
    let sidebarBottomToolbarListItems = document.getElementById("sidebarBottomToolbar").getElementsByTagName("li");

    if(this.state.expanded == true)
    {//collapse the sidebar
      this.setState({ width: '60px', expanded: false })

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
    else
    {//expand the sidebar
      this.setState({ width: '200px', expanded: true })

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
  }

  updateProjectModalState() {
    if(!this.state.isProjectModalOpen)
        this.setState( { isProjectModalOpen: true }, () => {console.log("SIDEBAR: " + this.state.isProjectModalOpen)} );
    else
        this.setState( { isProjectModalOpen: false }, () => {console.log("SIDEBAR: " + this.state.isProjectModalOpen)} ) ;
  }

  childUpdate(){
    this.setState( { isProjectModalOpen: false } );
    this.props.parentUpdate();
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
    
  }

  render(){
    
    return (
      <div>
        
        <Modal isProjectModalOpen = { this.state.isProjectModalOpen }  parentUpdate = { this.childUpdate }/>

        <aside id = "mainSidebar" style = {{width: this.state.width, height: this.state.height}}>

            <a id = "logo" href = "/dashboard"> <img src = { logo } /> <div id = "logoInnerText"> consilium </div> </a>

            <div id = "createButton" onClick = { this.updateProjectModalState }> <div id = "createButtonInnerText"> New project </div> <img id = "createButtonImg" src = { addIcon } /> </div>
    
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
