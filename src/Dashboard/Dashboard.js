import React from 'react';
import MainSidebar from '../Sidebar/MainSidebar.js';
import '../Core.css';
import './Dashboard.css';
import folderIcon from '../res/Icons/folder-white.svg';
import tasksIcon from '../res/Icons/todo-white.svg';
import activityIcon from '../res/Icons/time-white.svg';

class ProjectsWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        return (
            <div className = "DashboardWidget">

                <header> <img src = { folderIcon } /> Projects </header>

                <ul id = "projectsList">

                    adas

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

    render() {
        return (
            <div className = "DashboardWidget">

                <header> <img src = { tasksIcon } /> My Tasks </header>

                <ul id = "tasksList">

                    adas

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

                    <li> Test </li>

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
        this.state = { width: screenWidth-280, height: screenHeight-40 };
    }

    render() {
		return (
            <div>

                <MainSidebar />

                <div id = "dashboardContentArea" style = {{ width: this.state.width, height: this.state.height }}>

                    <h2> My Dashboards </h2>

                    <div id = "dashboardColumn1" className = "dashboardColumn"> <ProjectsWidget /> </div>
                    <div id = "dashboardColumn2" className = "dashboardColumn"> <TasksWidget /> <ActivityWidget /> </div>

                </div>

            </div>
        )
	}
}

export default Dashboard;
