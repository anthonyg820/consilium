import React from 'react';
import MainNav from '../Nav/MainNav.js';
import MainSidebar from '../Sidebar/MainSidebar.js';
import '../Core.css'
import './Dashboard.css'


class ProjectsBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  };
    }

    render(){
        return(
            <div id = "ProjectsBox" class = "WidgetBox">

                <h3> Projects </h3>

            </div>
        );
    }
}

class TasksBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  };
    }

    render(){
        return(
            <div id = "TasksBox" class = "WidgetBox">

                <h3> My Tasks </h3>

            </div>
        );
    }
}

class TeamBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  };
    }

    render(){
        return(
            <div id = "TeamBox" class = "WidgetBox">

                <h3> My Tasks </h3>

            </div>
        );
    }
}

class ActivitiesBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  };
    }

    render(){
        return(
            <div id = "ActivitiesBox" class = "WidgetBox">

                <h3> Recent Activity </h3>

            </div>
        );
    }
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        let screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        this.state = { width: screenWidth-600 };
    }

    resizeDashboardContentArea = () => {
        let screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        this.setState({ width: screenWidth-250 })
    }

    render() {
		return (
            <div>

                <MainNav />
                <MainSidebar />

                <div id = "DashboardContentArea" style = {{ width: this.state.width }}>

                    <h2> My Dashboard </h2>

                    <ProjectsBox />
                    <TasksBox />
                    <ActivitiesBox />

                </div>

            </div>
        )
	}
}

export default Dashboard;
