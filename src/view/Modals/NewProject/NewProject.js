import React from 'react';
import '../../Core.css';
import '../Modal.css';
import softwareProjectImg from '../../../res/Icons/code_custom.svg';
import businessProjectImg from '../../../res/Icons/business_custom.svg';


class ModalOverlay extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id = "overlay" onClick = { () => { this.props.parentUpdate( { isProjectModalOpen: false } ) } }></div>
        )
    }
}

class ModalHeader extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id = "modalHeader">

                <h2> Create a new project </h2>
                <div id = "modalCloseButton" onClick = { () => {this.props.parentUpdate( { isProjectModalOpen: false } )} }> x </div>

            </div>
        )
    }
}

class ModalContent extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id = "modalContent">

                <form id = "modalForm">

                    <label> Project Name </label>
                    <input type = "text" id = "projectName" />

                    <label> Team </label>
                    <select id = "teamFilter" onChange = { this.props.updateProjectTableState }>

                        <option value = "defaultSelect"> - </option>
                        <option value = "myProjects"> Team1 </option>
                        <option value = "allProjects"> Team2 </option>

                    </select>

                    <label> Project Type </label>

                    <ul class = "radioContainer">

                        <li>

                            <div id = "leftOfRadio">

                                <input type="radio" id="software" name="projectType" value="software" />
                                <img class = "radioImg" src = { softwareProjectImg } />
                                <label for="software">Software</label>

                            </div>

                            <div id = "rightOfRadio">

                                <p class = "radioDescription"> Code-based application </p>

                            </div>

                        </li>
                        
                        <li>

                            <div id = "leftOfRadio">

                                <input type="radio" id="business" name="projectType" value="business" />
                                <img class = "radioImg" src = { businessProjectImg } />
                                <label for="business">Business</label>

                            </div>

                            <div id = "rightOfRadio">

                                <p class = "radioDescription"> For business executives </p>

                            </div>

                        </li>

                    </ul>

                    <input type = "button" value = "Create project" id = "createProjectButton" onClick = { () => {} }/>

                </form>

            </div>
        )
    }
}

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }

        this.handleStateChange = this.handleStateChange.bind(this);        
    }

    hideNewProjectModal = () => {
        let newProjectModal = document.getElementById("modalContainer");
        let newProjectOverlay = document.getElementById("overlay");
    
        newProjectModal.style.top = "-50%";
        newProjectOverlay.style.display = "none";
    }

    showNewProjectModal = () => {
        let newProjectModal = document.getElementById("modalContainer");
        let newProjectOverlay = document.getElementById("overlay");
    
        newProjectModal.style.top = "50%";
        newProjectOverlay.style.display = "block";
    }

    componentWillReceiveProps(nextProps) {
        this.setState( { isProjectModalOpen: nextProps.isProjectModalOpen }, () => {console.log("MODAL: " + this.state.isProjectModalOpen)});
        // console.log("YUP2");
        // console.log(this.state.isProjectModalOpen);
    }
    
    componentDidUpdate(){
        if(this.state.isProjectModalOpen)
            this.showNewProjectModal();
        else
            this.hideNewProjectModal();
    }

    handleStateChange(newState){
        //event.preventDefault();
        this.setState( newState, () => { console.log("MODAL: " + this.state.isProjectModalOpen) } );
        this.props.parentUpdate( newState );
    }

    render() {
		return (
            <div>

                <ModalOverlay parentUpdate = { this.handleStateChange }/>

                <div id = "modalContainer">

                    <ModalHeader parentUpdate = { this.handleStateChange }/>
                    <ModalContent />

                </div>

            </div>
        )
	}
}

export default Modal;