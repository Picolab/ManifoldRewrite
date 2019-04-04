import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Media, TabContent, TabPane, Nav, NavItem,
        NavLink, Card, CardTitle, CardText, Row, Col} from 'reactstrap';
import {customEvent} from '../../../../utils/manifoldSDK';
import Chat from './Chat';
import classnames from 'classnames';

class ConnectionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: localStorage.getItem('modalState') === 'true' ? true : false,
      activeTab: localStorage.getItem('currentTab')
    };
    this.modalToggle = this.modalToggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.sendTrustPing = this.sendTrustPing.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
  }

  modalToggle() {
    localStorage.setItem('modalState', !this.state.modal)
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      localStorage.setItem('currentTab', tab);
      this.setState({
        activeTab: tab
      });
    }
  }

  sendTrustPing() {
    const promise = customEvent( this.props.myDID , "sovrin",  "trust_ping_requested", { their_vk: this.props.their_vk }, '5');
  }

  deleteConnection() {
    const promise = customEvent( this.props.myDID , "sovrin", "connection_expired", { their_vk: this.props.their_vk }, '5');
    promise.then((resp) => {
      this.props.getUI();
    })
  }

  // getMyDID() {
  //   return (
  //     <div className="textStickOut"> My DID: JCTBbPwLiGNsFevAcYTUol </div>
  //   )
  // }
  //
  // getTheirDID() {
  //   return (
  //     <div className="textStickOut"> Their DID: {this.props.theirDID} </div>
  //   )
  // }

  render() {
    // console.log('localStorage',localStorage.getItem('modalState'));
    // console.log('this.state.modal',this.state.modal);
    // console.log('tab', this.state.activeTab);
    // console.log('localStorage Tab', localStorage.getItem('currentTab'));
    return (
      <div>
        <Media object src={this.props.image} className='connection' onClick={this.modalToggle}/>
        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
          <ModalHeader toggle={this.modalToggle}>Connection with {this.props.title}</ModalHeader>
          <ModalBody>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Info
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Chat
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <h4>Connection Information</h4>
                        <div className="textStickOut"> My DID: {this.props.myDID} </div>
                        <div className="textStickOut"> Their DID: {this.props.theirDID} </div>
                      <button className="btn-info" onClick={this.sendTrustPing}>Send Trust Ping</button> {' '}
                      <button className="btn-danger" onClick={this.deleteConnection}>delete connection</button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Chat
                    connectionImage = {this.props.image}
                    messages={this.props.messages}
                    their_vk={this.props.their_vk}
                    signalEvent={this.props.signalEvent}
                    getUI={this.props.getUI}
                  />
                </TabPane>
              </TabContent>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
// <Button color="primary" onClick={this.modalToggle}>Do Something</Button>{' '}

}
export default ConnectionModal;