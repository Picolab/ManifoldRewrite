import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import {logOut} from '../../utils/AuthService';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" onClick={this.mobileSidebarToggle}>&#9776;</button>
        <a className="navbar-brand" href="/"><span className="hideAria">Manifold information</span></a>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
          </li>
          {/*<li className="nav-item px-3">
            <a className="nav-link" href="/">Dashboard</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/">Users</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/">Settings</a>
          </li>*/}
        </ul>
        <ul className="nav navbar-nav ml-auto">
          {/*
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="/"><i className="icon-list"></i></a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="/"><i className="icon-location-pin"></i></a>
          </li>
          */}
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="/"><i className="icon-bell"></i>{/*<span className="badge badge-pill badge-danger">5</span>*/}</a>
          </li>
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
              <DropdownToggle style={{border:0, paddingLeft:"0px"}}>
              <div className="nav-link dropdown-toggle" data-toggle="dropdown">
                <img src={'img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/> {/*Change based on what service they used to sign in?*/}
                <span className="d-md-down-none">Signed in as: </span>
              </div>
              </DropdownToggle>


              <DropdownMenu>
                <Link to="/profile" style={{ textDecoration: 'none' }}><DropdownItem className="dropdown-item"><i className="fa fa-user"></i> Profile</DropdownItem></Link>
                <DropdownItem className="dropdown-item"><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem className="dropdown-item"
                  onClick = {()=>{logOut()}}>
                  <i className="fa fa-lock"></i> Logout</DropdownItem>

              </DropdownMenu>
            </Dropdown>
        </li>
        {/*
        <li className="nav-item d-md-down-none">
          <button className="nav-link navbar-toggler aside-menu-toggler" type="button" onClick={this.asideToggle}>&#9776;</button>
        </li>
        */}
        </ul>
      </header>
    )
  }
}

export default Header;
