import React from 'react';
import './Nav.css';
import '../Core.js'

class MainNav extends React.Component {

    constructor(props) {
      super(props);
      this.state = { width: 0, height: 0 };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    
    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    updateNavSize() {

    }

    render(){
      return(
        <nav id = "MainNav">

          <ul>

            <li> <a id = "profileButton" href = "/"> <div> AG </div> </a> </li>
            <li> <a id = "settingsButton" href = "/">  </a> </li>
            <li> <a id = "appsButton" href = "/">  </a> </li>
            <li> <a id = "searchButton" href = "/">  </a> </li>

          </ul>

        </nav>
      )
    }

}

export default MainNav;
