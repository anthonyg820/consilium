import React from 'react';
import MainSidebar from '../Sidebar/MainSidebar.js';
import '../Core.css';
import './Projects.css';
import folderIcon from '../res/Icons/folder-white.svg';
import tasksIcon from '../res/Icons/todo-white.svg';
import activityIcon from '../res/Icons/time-white.svg';
import addIcon from '../res/Icons/add-white.svg';
import imgPlaceholder from '../res/ImgPlaceholder.png';
import softwareProjectImg from '../res/Icons/code_custom.svg';
import businessProjectImg from '../res/Icons/business_custom.svg';


class SearchAndFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        return (

            <div id = "searchAndFilterContainer">

                <input id = "projectSearch" type = "text" placeholder = "Search" />

                <select id = "projectFilter" onChange = { this.props.updateProjectTableState }>

                    <option value = "myProjects"> My Projects </option>
                    <option value = "allProjects"> All Projects </option>

                </select>

            </div>

        )
    }
}

class ProjectsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = { projectFilter: this.props.projectFilter }
    }

    async getUserProjects() {
        await fetch('http://localhost:9000/users/projects/1')
            .then((response) => {
                //console.log("test");
                //console.log(response.json());
                return response.json();
            })
            .then((data) => {
                this.setState({ projects: data }, () => {
                    this.loadProjects()
                })
                //console.log("test");
                //console.log(response);
                // console.log(this.state.projects[0]);
                // console.log(this.state);
            });
    }

    async getAllProjects() {
        await fetch('http://localhost:9000/projects')
            .then((response) => {
                //console.log("test");
                //console.log(response.json());
                return response.json();
            })
            .then((data) => {
                this.setState({ projects: data }, () => {
                    this.loadProjects()
                })
                //console.log("test");
                //console.log(response);
                // console.log(this.state.projects[0]);
                // console.log(this.state);
            });
    }

    componentWillMount() {
        if(this.props.projectFilter == 'user')
            this.getUserProjects();
        else
            this.getAllProjects();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.projectFilter == 'user')
            this.getUserProjects();
        else
            this.getAllProjects();
    }

    loadProjects() {
        let projectsTableBody = document.getElementById("projectsTable").getElementsByTagName("tbody")[0];
        let projectIcon = '';

        projectsTableBody.querySelectorAll('*').forEach(n => n.remove());

        for(var index in this.state.projects)
        {
            if(this.state.projects[index]["Type"] == "software")
                projectIcon = softwareProjectImg;
            else if(this.state.projects[index]["Type"] == "business")
                projectIcon = businessProjectImg;

            let newNode = document.createElement("tr");
            newNode.innerHTML += 
            `<td> <img src = "${projectIcon}" /> </td>
            <td> <a href = "/"> ${this.state.projects[index]["ProjectName"]} </a> </td>
            <td> ${this.state.projects[index]["FirstName"]} ${this.state.projects[index]["LastName"]} </td>
            <td> ${this.state.projects[index]["Type"].charAt(0).toUpperCase() + this.state.projects[index]["Type"].slice(1)} </td>
            <td> ${this.state.projects[index]["CreatedDate"].replace(/T/, ' @ ').replace(/\..+/, ' ')} </td>`;

            projectsTableBody.appendChild(newNode);
        }
    }

    render() {
        return (
            <table id = "projectsTable">

                <thead>

                    <tr>

                        <th>  </th>
                        <th> Project </th>
                        <th> Project Owner </th>
                        <th> Type </th>
                        <th> Created Date </th>

                    </tr>

                </thead>

                <tbody>



                </tbody>

            </table>
        )
    }
}

class Projects extends React.Component {

    constructor(props) {
        super(props);
        let screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.state = { 
            currentTab: 1, 
            width: screenWidth-280, 
            height: screenHeight-40, 
            projectFilter: 'user',
            isProjectModalOpen: false 
        };
        window.addEventListener('resize', this.handleResize)

        this.updateProjectTableState = this.updateProjectTableState.bind(this);
        this.updateProjectModalState = this.updateProjectModalState.bind(this);
        this.childUpdate = this.childUpdate.bind(this);
    }

    handleResize = () => {
        let screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.setState( { width: screenWidth-280, height: screenHeight-40 } )
    }

    updateProjectTableState(){
        if(this.state.projectFilter == 'user')
            this.setState( {projectFilter: 'all'} )
        else if(this.state.projectFilter == 'all')
            this.setState( {projectFilter: 'user'} )
        
        console.log(this.state);
    }

    updateProjectModalState() {
        if(!this.state.isProjectModalOpen)
            this.setState( { isProjectModalOpen: true }, () => {console.log("PARENT: " + this.state.isProjectModalOpen)} );
        else
            this.setState( { isProjectModalOpen: false }, () => {console.log("PARENT: " + this.state.isProjectModalOpen)} ) ;
    }

    childUpdate(){
        this.setState( { isProjectModalOpen: false } );
    }

    render() {
		return (
            <div>

                <MainSidebar currentTab = { this.state.currentTab } isProjectModalOpen = { this.state.isProjectModalOpen } parentUpdate = { this.childUpdate }/>

                <div id = "projectsContentArea" style = {{ width: this.state.width, height: this.state.height }}>

                    <h2 onClick = { this.updateProjectModalState }> Projects </h2>

                    <div id = "newProjectButton"> <div id = "createButtonInnerText"> New project </div> <img id = "createButtonImg" src = { addIcon } /> </div>

                    <div> <SearchAndFilter updateProjectTableState = { this.updateProjectTableState } /> </div>
                    <div> <ProjectsTable projectFilter = { this.state.projectFilter } /> </div>

                </div>

            </div>
        )
	}
}

export default Projects;
