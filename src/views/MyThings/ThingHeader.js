import React, { Component } from 'react';
import { Col, Dropdown, ButtonDropdownMenu, DropdownMenu, ButtonDropdown, DropdownToggle, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


class ThingHeader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdownOpen : false
      }
    }

    toggleSettings() {
      console.log("SUP");
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    openRemoveModal(){
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
      this.props.openRemoveModal()
    }

    openInstallModal(){
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
      this.props.openInstallModal()
    }

    render(){
      return(
        <div className="card-header">
          {this.props.name}

          <Dropdown className="float-right"  isOpen={this.state.dropdownOpen} toggle={this.toggleSettings.bind(this)} style={{paddingLeft:"125px"}}>
            <DropdownToggle
              tag="span"
              onClick={this.toggleSettings.bind(this)}
              data-toggle="dropdown"
              aria-expanded={this.state.dropdownOpen} >

              <i className="fa fa-cogs float-right fa-lg" style={{backgroundColor:"#ddd", padding:"5px", borderStyle:"solid", borderColor:"#aaa"}}/>
            </DropdownToggle>
            <DropdownMenu>

              <DropdownItem onClick={this.openRemoveModal.bind(this)} >
                Delete a Pico
                <i className="fa fa-trash float-right" />
              </DropdownItem>

              <DropdownItem onClick={this.openInstallModal.bind(this)}>
                Install an App
                <i className="fa fa-cloud-download float-right"/>
              </DropdownItem>

            </DropdownMenu>
          </Dropdown>

        </div>
    );
    }
}
export default ThingHeader;