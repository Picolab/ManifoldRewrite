import React, { Component } from 'react';

class ReusableModal extends Component {
  constructor(props) {
    super(props);
    console.log("THE PROPS!!!!",props);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.state = {
      addModal: false,
      removeModal: false,
      name: "",
      nameToDelete: ""
    }
    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleRemoveModal = this.toggleRemoveModal.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.isOpen} className={this.props.className}>
        <ModalHeader toggle={this.props.isOpen}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.isOpen}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.props.isOpen}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default ReusableModal;
