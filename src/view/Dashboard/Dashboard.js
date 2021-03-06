import React from 'react';
import MainSidebar from '../Sidebar/MainSidebar.js';
import '../Core.css';
import './Dashboard.css';
import folderIcon from '../../res/Icons/folder-white.svg';
import tasksIcon from '../../res/Icons/todo-white.svg';
import activityIcon from '../../res/Icons/time-white.svg';
import imgPlaceholder from '../../res/ImgPlaceholder.png';
import softwareProjectImg from '../../res/Icons/code_custom.svg';
import businessProjectImg from '../../res/Icons/business.svg';


class ProjectsWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = { projects: '', tasks: '' }
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

    componentWillMount() {
        this.getUserProjects();
    }

    loadProjects() {
        let projectsList = document.getElementById("projectsList");
        let projectIcon = '';

        for(var index in this.state.projects)
        {
            if(this.state.projects[index]["Type"] == "software")
                projectIcon = softwareProjectImg;
            else if(this.state.projects[index]["Type"] == "business")
                projectIcon = businessProjectImg;

            projectsList.innerHTML += 
            `<li>  
            
                <img src = "${projectIcon}" />

                <div class = "projectsListItemContent">

                    <a href = "/"> <h3> ${this.state.projects[index]["ProjectName"]} </h3> </a>
                    <h4> Owner: ${this.state.projects[index]["FirstName"]} ${this.state.projects[index]["LastName"]} </h4>

                </div>
            
            </li>`;
        }
    }

    //ONLY FOR TESTING
    // async createUser() {
    //     await fetch("http://localhost:9000/users", {
    //         method: "post",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           },
    //         body: JSON.stringify({
    //             email: "tesssgfeet@testmailer.com",
    //             password: "pass_word321",
    //             firstName: "Miguel",
    //             lastName: "Santos",
    //             birthdate: "1990-04-22"
    //         })
    //     })
    //         .then((response) => {
    //             console.log("Request sent");
    //         });
    // }

    // async createProject() {
    //     await fetch("http://localhost:9000/projects", {
    //         method: "post",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           },
    //         body: JSON.stringify({
    //             projectName: "Awesome Sauce",
    //             createdBy: "10",
    //             createdDate: Date.now(),
    //             teamId: "1"
    //         })
    //     })
    //         .then((response) => {
    //             console.log("Request sent");
    //         });
    // }

    // async createTask() {
    //     console.log("DATE:  " + Date.now());
    //     await fetch("http://localhost:9000/tasks", {
    //         method: "post",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           },
    //         body: JSON.stringify({
    //             taskName: "Test task11",
    //             projectId: "5",
    //             createdBy: "6",
    //             assignedTo: "10",
    //             taskDescription: "This is a test task.",
    //             taskDifficulty: "2",
    //             status: "Not started",
    //             createdDate: Date.now()
    //         })
    //     })
    //         .then((response) => {
    //             console.log("Request sent");
    //         });
    // }

    render() {
        return (
            <div className = "DashboardWidget">

                <header> <img src = { folderIcon } /> Projects </header>

                <ul id = "projectsList">

                    

                </ul>

            </div>
        )
    }
}

class TasksWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    async getUserTasks() {
        await fetch('http://localhost:9000/users/tasks/1/0')
            .then((response) => {
                //console.log("test");
                //console.log(response.json());
                return response.json();
            })
            .then((data) => {
                this.setState({ tasks: data }, () => {
                    this.loadTasks();
                })
                //console.log("test");
                //console.log(response);
                // console.log(this.state.tasks);
                // console.log(this.state);
            });
    }

    componentWillMount() {
        this.getUserTasks();
    }

    loadTasks() {
        let tasksList = document.getElementById("tasksList");
        for(var index in this.state.tasks)
        {
            tasksList.innerHTML += 
            `<li>

                <a href = "/"> <h3> ${this.state.tasks[index]["TaskName"]}  </h3> </a>
                <h4> Project: ${this.state.tasks[index]["ProjectName"]}  </h4>

            </li>`;
        }
    }

    render() {
        return (
            <div className = "DashboardWidget">

                <header> <img src = { tasksIcon } /> My Tasks </header>

                <ul id = "tasksList">

                    

                </ul>

            </div>
        )
    }
}

class ActivityWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        return (
            <div className = "DashboardWidget">

                <header> <img src = { activityIcon } /> Recent Activity </header>

                <ul id = "recentActivityList">

                    <li> asda </li>

                </ul>

            </div>
        )
    }
}


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        let screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.state = { 
            currentTab: 0, 
            width: screenWidth-280, 
            height: screenHeight-40, 
            sidebarWidth: '200px',
            isProjectModalOpen: false 
        };

        window.addEventListener('resize', this.handleResize);

        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleResize = () => {
        let screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.setState( { width: screenWidth-280, height: screenHeight-40 } )
    }

    handleStateChange(newState){
        //event.preventDefault();
        this.setState( newState, () => { console.log("DASHBOARD: " + this.state.isProjectModalOpen) } );
    }

    render() {
		return (
            <div>

                <MainSidebar currentTab = { this.state.currentTab } isProjectModalOpen = { this.state.isProjectModalOpen } parentUpdate = { this.handleStateChange }/>

                <div id = "dashboardContentArea" style = {{ width: this.state.width, height: this.state.height }}>

                    <h2> My Dashboard </h2>

                    <div id = "dashboardColumn1" className = "dashboardColumn"> <ProjectsWidget /> </div>
                    <div id = "dashboardColumn2" className = "dashboardColumn"> <TasksWidget /> <ActivityWidget /> </div>

                </div>

            </div>
        )
	}
}

export default Dashboard;
