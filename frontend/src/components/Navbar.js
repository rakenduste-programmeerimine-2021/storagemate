import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import { Menu } from 'antd';
import { 
  UserOutlined, 
  DropboxOutlined, 
  HomeOutlined, 
  InfoCircleOutlined, 
  LoginOutlined, 
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import {NavLink} from "react-router-dom";
import "./Navbar.css";
import { Context } from "../store";
import {logoutUser} from "../store/actions";


const Navbar = () =>  {
  
  const[state, dispatch] = useContext(Context)
  const history = useHistory();

  const Logout = () => {
    dispatch(logoutUser())
    history.push("/login")
  }    

    return (
    
      <>
        <div className="logo">
          <NavLink to="/">
            <img className="logo" src="Storagemate.png" alt="ReactLogo" />
          </NavLink>
        </div>

        <Menu 
          className="navbar"
          theme="dark" 
          mode="horisontal"

          selectable={true}
        >
          {!state.auth.token ?
            <>
              <Menu.Item key="/" icon={<HomeOutlined />}><NavLink to="/"></NavLink>
                Home
              </Menu.Item>

              <Menu.Item  key="/storages" icon={<DropboxOutlined />}><NavLink to="/storages"></NavLink>
                Storages
              </Menu.Item>
              <Menu.Item  key="/aboutus" icon={<InfoCircleOutlined />}><NavLink to="/aboutus"></NavLink>
                About Us
              </Menu.Item>
              <Menu.Item  style={{marginLeft: 'auto',position: 'absolute', top: 0, right: 114}} key="/Login" icon={<LoginOutlined />}><NavLink to="/Login"></NavLink>
                Login
              </Menu.Item>
              <Menu.Item  style={{marginLeft: 'auto', position: 'absolute', top: 0, right: 0}} key="/Register" icon={<UserOutlined />}><NavLink to="/Register"></NavLink>
                Register
              </Menu.Item>
            </>
            :
            <>
              <Menu.Item key="/" icon={<HomeOutlined />}>
                <NavLink to="/">
                  Home
                </NavLink>
              </Menu.Item>

              <Menu.Item  key="/storages" icon={<DropboxOutlined />}>
                <NavLink to="/storages">
                  Storages
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/aboutus" icon={<InfoCircleOutlined />}>
                <NavLink to="/aboutus">
                  About Us
                </NavLink>
              </Menu.Item>
              <Menu.Item  style={{marginLeft: 'auto',position: 'absolute', top: 0, right: 114}} key="/Login" icon={<SettingOutlined />}>
                <NavLink to="/myprofile">
                  My Profile
                </NavLink>
              </Menu.Item>
              
              <Menu.Item style={{marginLeft: 'auto', position: 'absolute', top: 0, right: 0}} key="x" icon={<LogoutOutlined />}>
                <NavLink to="/" onClick={Logout}>
                  Log out
                </NavLink> 
              </Menu.Item>
              
            </>
            
          }
  
        </Menu>
        
      </>
    );
  
}


export default Navbar;