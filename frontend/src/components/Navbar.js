import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { UserOutlined, DropboxOutlined, HomeOutlined, InfoOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";


class Navbar extends React.Component {
  state = {
    current: 'user',
  };
    
  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/Greeting"></Link>
          Home
        </Menu.Item>
        <Menu.Item key="user" icon={<UserOutlined />}><Link to="/Login"></Link>
          Login
        </Menu.Item>
        <Menu.Item key="Storages" icon={<DropboxOutlined />}><Link to="/Greeting"></Link>
          Storages
        </Menu.Item>
        <Menu.Item key="AboutUs" icon={<InfoOutlined />}><Link to="/Greeting"></Link>
          About Us
        </Menu.Item>
        <Menu.Item key="register" icon={<UserOutlined />}><Link to="/Register"></Link>
          Register
        </Menu.Item>
      </Menu>
    );
  }
}


export default Navbar;